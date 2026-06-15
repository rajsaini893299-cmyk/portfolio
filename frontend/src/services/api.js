import { API_ENDPOINTS, getApiUrl, getUploadUrl } from "../config/apiConfig";

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const loginAdmin = async (credentials) => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.adminLogin), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return handleResponse(response);
};

export const getAdminStats = async () => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.adminStats), {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const getAdminAnalytics = async () => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.adminAnalytics), {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

const trackPublicEvent = async (endpoint) => {
  const response = await fetch(getApiUrl(endpoint), {
    method: "POST",
  });
  return handleResponse(response);
};

export const trackVisit = () => trackPublicEvent(API_ENDPOINTS.analyticsVisit);

export const trackProjectClick = (projectId) =>
  trackPublicEvent(API_ENDPOINTS.analyticsProjectClick(projectId));

export const trackResumeDownload = () =>
  trackPublicEvent(API_ENDPOINTS.analyticsResumeDownload);

export const getProjects = async () => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.projects));
  return handleResponse(response);
};

export const addProject = async (formData) => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.addProject), {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  return handleResponse(response);
};

export const updateProject = async (id, formData) => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.projectById(id)), {
    method: "PUT",
    headers: getAuthHeaders(),
    body: formData,
  });

  return handleResponse(response);
};

export const deleteProject = async (id) => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.projectById(id)), {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
};

export const submitContactMessage = async (payload) => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.contact), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const getMessages = async () => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.adminMessages), {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const updateMessageRead = async (id, isRead) => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.adminMessageRead(id)), {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify({ isRead }),
  });
  return handleResponse(response);
};

export const deleteMessage = async (id) => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.adminMessageById(id)), {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const uploadResume = async (formData) => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.adminResume), {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });
  return handleResponse(response);
};

export const getResumeUrl = () => getApiUrl(API_ENDPOINTS.resume);

export const getSettings = async () => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.settings));
  return handleResponse(response);
};

export const updateSettings = async (payload) => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.adminSettings), {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

export const getSkills = async () => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.skills));
  return handleResponse(response);
};

export const addSkill = async (payload) => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.adminSkills), {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

export const updateSkill = async (id, payload) => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.adminSkillById(id)), {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

export const deleteSkill = async (id) => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.adminSkillById(id)), {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export { getUploadUrl };
