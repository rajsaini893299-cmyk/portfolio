import fs from "fs";
import multer from "multer";
import path from "path";
import sharp from "sharp";
import { projectUploadsDir, resumeUploadsDir } from "../config/paths.js";

const createStorage = (uploadDir) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
    return;
  }

  cb(new Error("Only image uploads are allowed"), false);
};

const resumeFileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
    return;
  }

  cb(new Error("Only PDF uploads are allowed"), false);
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const optimizeProjectImage = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  try {
    fs.mkdirSync(projectUploadsDir, { recursive: true });

    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const outputPath = path.join(projectUploadsDir, filename);

    await sharp(req.file.buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(outputPath);

    req.file.filename = filename;
    req.file.path = outputPath;
    req.file.destination = projectUploadsDir;
    req.file.mimetype = "image/webp";
  } catch (error) {
    next(new Error(`Image optimization failed: ${error.message}`));
    return;
  }

  next();
};

export const resumeUpload = multer({
  storage: createStorage(resumeUploadsDir),
  fileFilter: resumeFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export default upload;
