import fs from "fs";
import path from "path";
import Project from "../models/Project.js";
import { backendRoot } from "../config/paths.js";

const parseTechStack = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (!value) {
    return [];
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const getImagePath = (file) => {
  if (!file) {
    return undefined;
  }

  return `/uploads/projects/${file.filename}`;
};

const parseBoolean = (value) => value === true || value === "true" || value === "on" || value === "1";

const removeUploadedImage = (imagePath) => {
  if (!imagePath) {
    return;
  }

  const relativePath = imagePath.replace(/^\/+/, "");
  const absolutePath = path.join(backendRoot, relativePath);

  fs.unlink(absolutePath, (error) => {
    if (error && error.code !== "ENOENT") {
      console.error(`Failed to remove image ${absolutePath}: ${error.message}`);
    }
  });
};

export const addProject = async (req, res, next) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      techStack: parseTechStack(req.body.techStack),
      liveLink: req.body.liveLink,
      githubLink: req.body.githubLink,
      image: getImagePath(req.file) || "",
      featured: parseBoolean(req.body.featured),
    });

    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const nextImage = getImagePath(req.file);
    const oldImage = project.image;

    project.title = req.body.title ?? project.title;
    project.category = req.body.category ?? project.category;
    project.description = req.body.description ?? project.description;
    project.techStack =
      req.body.techStack !== undefined ? parseTechStack(req.body.techStack) : project.techStack;
    project.liveLink = req.body.liveLink ?? project.liveLink;
    project.githubLink = req.body.githubLink ?? project.githubLink;
    project.image = nextImage || project.image;
    project.featured =
      req.body.featured !== undefined ? parseBoolean(req.body.featured) : project.featured;

    const updatedProject = await project.save();

    if (nextImage && oldImage) {
      removeUploadedImage(oldImage);
    }

    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const image = project.image;
    await project.deleteOne();
    removeUploadedImage(image);

    res.json({ message: "Project deleted" });
  } catch (error) {
    next(error);
  }
};
