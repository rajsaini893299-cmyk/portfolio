import express from "express";
import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projectController.js";
import protectAdmin from "../middleware/authMiddleware.js";
import upload, { optimizeProjectImage } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProjects);
router.post("/", protectAdmin, upload.single("image"), optimizeProjectImage, addProject);
router.post("/add", protectAdmin, upload.single("image"), optimizeProjectImage, addProject);
router.put("/:id", protectAdmin, upload.single("image"), optimizeProjectImage, updateProject);
router.delete("/:id", protectAdmin, deleteProject);

export default router;
