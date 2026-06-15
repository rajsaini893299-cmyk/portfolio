import Analytics from "../models/Analytics.js";

const getRequestMeta = (req) => ({
  ip: req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip || "",
  userAgent: req.get("user-agent") || "",
});

export const trackAnalyticsEvent = async (req, type, projectId = null) =>
  Analytics.create({
    type,
    projectId,
    ...getRequestMeta(req),
  });

export const trackVisit = async (req, res, next) => {
  try {
    await trackAnalyticsEvent(req, "visitor");
    res.status(201).json({ message: "Visit tracked" });
  } catch (error) {
    next(error);
  }
};

export const trackProjectClick = async (req, res, next) => {
  try {
    await trackAnalyticsEvent(req, "project_click", req.params.projectId);
    res.status(201).json({ message: "Project click tracked" });
  } catch (error) {
    next(error);
  }
};

export const trackResumeDownload = async (req, res, next) => {
  try {
    await trackAnalyticsEvent(req, "resume_download");
    res.status(201).json({ message: "Resume download tracked" });
  } catch (error) {
    next(error);
  }
};

export const trackContactSubmit = async (req) => trackAnalyticsEvent(req, "contact_submit");

export const getAdminAnalytics = async (req, res, next) => {
  try {
    const [totalVisitors, projectClicks, resumeDownloads, contactFormSubmissions] =
      await Promise.all([
        Analytics.countDocuments({ type: "visitor" }),
        Analytics.countDocuments({ type: "project_click" }),
        Analytics.countDocuments({ type: "resume_download" }),
        Analytics.countDocuments({ type: "contact_submit" }),
      ]);

    res.json({
      totalVisitors,
      projectClicks,
      resumeDownloads,
      contactFormSubmissions,
    });
  } catch (error) {
    next(error);
  }
};
