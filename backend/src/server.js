import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import { env } from "./config/env.js";
import { uploadsRoot } from "./config/paths.js";
import adminRoutes from "./routes/adminRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";

const app = express();

console.log(`MONGO_URI loaded: ${process.env.MONGO_URI ? "yes" : "no"}`);

await connectDB();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "https://portfolio-eight-liart-66.vercel.app",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsRoot));

app.get("/", (req, res) => {
  res.json({ message: "Aryan Saini portfolio API is running" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.use("/api/admin", adminRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/skills", skillRoutes);

app.use((err, req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Server error",
  });
});

app.listen(env.port);
