import WebsiteSettings from "../models/WebsiteSettings.js";

const defaultSettings = {
  siteName: "Aryan Saini",
  email: "aryan.saini@email.com",
  linkedin: "https://linkedin.com/in/aryansaini",
  whatsapp: "",
  phone: "",
  heroTitle: "Hi, I'm Aryan Saini",
  heroSubtitle:
    "Building fast, modern & scalable web applications - from pixel-perfect UIs to scalable backend APIs.",
};

const allowedFields = Object.keys(defaultSettings);

const getOrCreateSettings = async () => {
  const settingsDocuments = await WebsiteSettings.find().sort({ createdAt: 1 });
  const settings = settingsDocuments[0];

  if (settings) {
    if (settingsDocuments.length > 1) {
      await WebsiteSettings.deleteMany({
        _id: { $in: settingsDocuments.slice(1).map((document) => document._id) },
      });
    }

    if (!settings.singletonKey) {
      settings.singletonKey = "website";
      await settings.save();
    }

    return settings;
  }

  return WebsiteSettings.create({ ...defaultSettings, singletonKey: "website" });
};

export const getSettings = async (req, res, next) => {
  try {
    const settings = await getOrCreateSettings();
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const settings = await getOrCreateSettings();

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field];
      }
    });

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    next(error);
  }
};
