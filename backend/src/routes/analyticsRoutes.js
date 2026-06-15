import express from "express";
import {
  trackProjectClick,
  trackResumeDownload,
  trackVisit,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.post("/visit", trackVisit);
router.post("/project-click/:projectId", trackProjectClick);
router.post("/resume-download", trackResumeDownload);

export default router;
