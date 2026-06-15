import ContactMessage from "../models/ContactMessage.js";
import Project from "../models/Project.js";
import Resume from "../models/Resume.js";
import Skill from "../models/Skill.js";

export const getAdminStats = async (req, res, next) => {
  try {
    const [totalProjects, totalMessages, totalSkills, latestResume] = await Promise.all([
      Project.countDocuments(),
      ContactMessage.countDocuments(),
      Skill.countDocuments(),
      Resume.findOne().sort({ createdAt: -1 }),
    ]);

    res.json({
      totalProjects,
      totalMessages,
      totalSkills,
      resumeUploadedDate: latestResume?.createdAt || null,
    });
  } catch (error) {
    next(error);
  }
};
