import mongoose from "mongoose";

const websiteSettingsSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      default: "website",
      unique: true,
    },
    siteName: {
      type: String,
      trim: true,
      default: "Aryan Saini",
    },
    email: {
      type: String,
      trim: true,
      default: "aryan.saini@email.com",
    },
    linkedin: {
      type: String,
      trim: true,
      default: "https://linkedin.com/in/aryansaini",
    },
    whatsapp: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    heroTitle: {
      type: String,
      trim: true,
      default: "Hi, I'm Aryan Saini",
    },
    heroSubtitle: {
      type: String,
      trim: true,
      default:
        "Building fast, modern & scalable web applications - from pixel-perfect UIs to scalable backend APIs.",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export default mongoose.model("WebsiteSettings", websiteSettingsSchema);
