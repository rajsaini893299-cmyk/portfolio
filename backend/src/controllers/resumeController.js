import fs from "fs";
import path from "path";
import { resumeUploadsDir } from "../config/paths.js";
import Resume from "../models/Resume.js";
import { trackAnalyticsEvent } from "./analyticsController.js";

const getLatestResume = () => {
  if (!fs.existsSync(resumeUploadsDir)) {
    return null;
  }

  const files = fs
    .readdirSync(resumeUploadsDir)
    .filter((file) => file.toLowerCase().endsWith(".pdf"))
    .map((file) => {
      const absolutePath = path.join(resumeUploadsDir, file);
      return { file, absolutePath, modifiedAt: fs.statSync(absolutePath).mtimeMs };
    })
    .sort((a, b) => b.modifiedAt - a.modifiedAt);

  return files[0] || null;
};

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume PDF is required" });
    }

    const resumePath = `/uploads/resume/${req.file.filename}`;
    const resume = await Resume.create({
      filename: req.file.filename,
      path: resumePath,
      originalName: req.file.originalname,
    });

    res.status(201).json({
      message: "Resume uploaded",
      resume: resume.path,
      uploadedAt: resume.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

export const downloadResume = async (req, res, next) => {
  try {
    const resume = getLatestResume();

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    try {
      await trackAnalyticsEvent(req, "resume_download");
    } catch (analyticsError) {
      console.error(`Failed to track resume_download: ${analyticsError.message}`);
    }

    res.download(resume.absolutePath, "Aryan-Saini-Resume.pdf");
  } catch (error) {
    next(error);
  }
};
