export const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export const API_ENDPOINTS = {
  adminLogin: "/api/admin/login",
  adminAnalytics: "/api/admin/analytics",
  adminStats: "/api/admin/stats",
  adminMessages: "/api/admin/messages",
  adminMessageById: (id) => `/api/admin/messages/${id}`,
  adminMessageRead: (id) => `/api/admin/messages/${id}/read`,
  adminResume: "/api/admin/resume",
  adminSettings: "/api/admin/settings",
  adminSkills: "/api/admin/skills",
  adminSkillById: (id) => `/api/admin/skills/${id}`,
  contact: "/api/contact",
  analyticsVisit: "/api/analytics/visit",
  analyticsProjectClick: (projectId) => `/api/analytics/project-click/${projectId}`,
  analyticsResumeDownload: "/api/analytics/resume-download",
  projects: "/api/projects",
  resume: "/api/resume",
  settings: "/api/settings",
  skills: "/api/skills",
  addProject: "/api/projects",
  projectById: (id) => `/api/projects/${id}`,
};

export const getApiUrl = (endpoint) => {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_URL is missing. Add it to frontend/.env.");
  }

  return `${API_BASE_URL}${endpoint}`;
};

export const getUploadUrl = (imagePath) => {
  if (!imagePath) {
    return "";
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  return getApiUrl(imagePath.startsWith("/") ? imagePath : `/${imagePath}`);
};
