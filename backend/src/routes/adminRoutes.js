import express from "express";
import { loginAdmin } from "../controllers/adminController.js";
import { getAdminAnalytics } from "../controllers/analyticsController.js";
import {
  deleteContactMessage,
  getContactMessages,
  updateMessageReadStatus,
} from "../controllers/contactController.js";
import { uploadResume } from "../controllers/resumeController.js";
import { updateSettings } from "../controllers/settingsController.js";
import { addSkill, deleteSkill, updateSkill } from "../controllers/skillController.js";
import { getAdminStats } from "../controllers/statsController.js";
import protectAdmin from "../middleware/authMiddleware.js";
import { resumeUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/analytics", protectAdmin, getAdminAnalytics);
router.get("/stats", protectAdmin, getAdminStats);
router.get("/messages", protectAdmin, getContactMessages);
router.patch("/messages/:id/read", protectAdmin, updateMessageReadStatus);
router.delete("/messages/:id", protectAdmin, deleteContactMessage);
router.post("/resume", protectAdmin, resumeUpload.single("resume"), uploadResume);
router.post("/skills", protectAdmin, addSkill);
router.put("/skills/:id", protectAdmin, updateSkill);
router.delete("/skills/:id", protectAdmin, deleteSkill);
router.put("/settings", protectAdmin, updateSettings);

export default router;
