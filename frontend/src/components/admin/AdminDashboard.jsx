import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FiActivity,
  FiCheckCircle,
  FiDownload,
  FiEdit2,
  FiExternalLink,
  FiFileText,
  FiGithub,
  FiInbox,
  FiLayers,
  FiLogOut,
  FiMousePointer,
  FiPlus,
  FiRefreshCw,
  FiSettings,
  FiTrash2,
  FiUpload,
} from "react-icons/fi";
import {
  addProject,
  addSkill,
  deleteMessage,
  deleteProject,
  deleteSkill,
  getAdminAnalytics,
  getAdminStats,
  getMessages,
  getProjects,
  getSettings,
  getSkills,
  getUploadUrl,
  updateMessageRead,
  updateProject,
  updateSettings,
  updateSkill,
  uploadResume,
} from "../../services/api";

const emptyProjectForm = {
  title: "",
  category: "Full Stack",
  description: "",
  techStack: "",
  liveLink: "",
  githubLink: "",
  image: null,
  featured: false,
};

const emptySkillForm = {
  name: "",
  category: "Frontend",
  level: 80,
  icon: "",
  order: 0,
};

const emptySettingsForm = {
  siteName: "",
  email: "",
  linkedin: "",
  whatsapp: "",
  phone: "",
  heroTitle: "",
  heroSubtitle: "",
};

const tabs = [
  { id: "projects", label: "Projects", icon: FiLayers },
  { id: "messages", label: "Messages", icon: FiInbox },
  { id: "resume", label: "Resume", icon: FiFileText },
  { id: "skills", label: "Skills", icon: FiCheckCircle },
  { id: "settings", label: "Settings", icon: FiSettings },
];

const projectCategories = ["Full Stack", "Frontend", "Backend", "Client Project"];

const emptyStats = {
  totalProjects: 0,
  totalMessages: 0,
  totalSkills: 0,
  resumeUploadedDate: null,
};

const emptyAnalytics = {
  totalVisitors: 0,
  projectClicks: 0,
  resumeDownloads: 0,
  contactFormSubmissions: 0,
};

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projectForm, setProjectForm] = useState(emptyProjectForm);
  const [skillForm, setSkillForm] = useState(emptySkillForm);
  const [settingsForm, setSettingsForm] = useState(emptySettingsForm);
  const [editingProjectId, setEditingProjectId] = useState("");
  const [editingSkillId, setEditingSkillId] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [stats, setStats] = useState(emptyStats);
  const [analytics, setAnalytics] = useState(emptyAnalytics);
  const [statsError, setStatsError] = useState("");
  const [analyticsError, setAnalyticsError] = useState("");
  const [loading, setLoading] = useState({
    projects: true,
    messages: true,
    skills: true,
    settings: true,
    stats: true,
    analytics: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditingProject = useMemo(() => Boolean(editingProjectId), [editingProjectId]);
  const isEditingSkill = useMemo(() => Boolean(editingSkillId), [editingSkillId]);

  const loadStats = async () => {
    setLoading((current) => ({ ...current, stats: true }));
    try {
      setStats(await getAdminStats());
      setStatsError("");
    } catch (err) {
      setStatsError(err.message);
    } finally {
      setLoading((current) => ({ ...current, stats: false }));
    }
  };

  const loadAnalytics = async () => {
    setLoading((current) => ({ ...current, analytics: true }));
    try {
      setAnalytics(await getAdminAnalytics());
      setAnalyticsError("");
    } catch (err) {
      setAnalyticsError(err.message);
    } finally {
      setLoading((current) => ({ ...current, analytics: false }));
    }
  };

  const loadProjects = async () => {
    setLoading((current) => ({ ...current, projects: true }));
    try {
      const data = await getProjects();
      setProjects(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading((current) => ({ ...current, projects: false }));
    }
  };

  const loadMessages = async () => {
    setLoading((current) => ({ ...current, messages: true }));
    try {
      setMessages(await getMessages());
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading((current) => ({ ...current, messages: false }));
    }
  };

  const loadSkills = async () => {
    setLoading((current) => ({ ...current, skills: true }));
    try {
      setSkills(await getSkills());
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading((current) => ({ ...current, skills: false }));
    }
  };

  const loadSettings = async () => {
    setLoading((current) => ({ ...current, settings: true }));
    try {
      const data = await getSettings();
      setSettingsForm({
        siteName: data.siteName || "",
        email: data.email || "",
        linkedin: data.linkedin || "",
        whatsapp: data.whatsapp || "",
        phone: data.phone || "",
        heroTitle: data.heroTitle || "",
        heroSubtitle: data.heroSubtitle || "",
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading((current) => ({ ...current, settings: false }));
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      loadStats();
      loadAnalytics();
      loadProjects();
      loadMessages();
      loadSkills();
      loadSettings();
    });
  }, []);

  const handleProjectChange = (event) => {
    const { name, value, files, checked, type } = event.target;
    setProjectForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const buildProjectFormData = () => {
    const formData = new FormData();
    formData.append("title", projectForm.title);
    formData.append("category", projectForm.category);
    formData.append("description", projectForm.description);
    formData.append("techStack", projectForm.techStack);
    formData.append("liveLink", projectForm.liveLink);
    formData.append("githubLink", projectForm.githubLink);
    formData.append("featured", String(projectForm.featured));

    if (projectForm.image) {
      formData.append("image", projectForm.image);
    }

    return formData;
  };

  const resetProjectForm = () => {
    setProjectForm(emptyProjectForm);
    setEditingProjectId("");
  };

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      if (isEditingProject) {
        await updateProject(editingProjectId, buildProjectFormData());
        toast.success("Project updated");
      } else {
        await addProject(buildProjectFormData());
        toast.success("Project added");
      }

      resetProjectForm();
      await loadProjects();
      await loadStats();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProjectId(project._id);
    setProjectForm({
      title: project.title || "",
      category: project.category || "Full Stack",
      description: project.description || "",
      techStack: Array.isArray(project.techStack) ? project.techStack.join(", ") : "",
      liveLink: project.liveLink || "",
      githubLink: project.githubLink || "",
      image: null,
      featured: Boolean(project.featured),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Delete this project?")) {
      return;
    }

    try {
      await deleteProject(projectId);
      toast.success("Project deleted");
      await loadProjects();
      await loadStats();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleToggleRead = async (message) => {
    try {
      await updateMessageRead(message._id, !message.isRead);
      toast.success(message.isRead ? "Marked unread" : "Marked read");
      await loadMessages();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Delete this message?")) {
      return;
    }

    try {
      await deleteMessage(messageId);
      toast.success("Message deleted");
      await loadMessages();
      await loadStats();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleResumeUpload = async (event) => {
    event.preventDefault();

    if (!resumeFile) {
      toast.error("Choose a PDF resume first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    setSaving(true);

    try {
      await uploadResume(formData);
      setResumeFile(null);
      toast.success("Resume uploaded");
      await loadStats();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSkillSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...skillForm,
        level: Number(skillForm.level),
        order: Number(skillForm.order),
      };

      if (isEditingSkill) {
        await updateSkill(editingSkillId, payload);
        toast.success("Skill updated");
      } else {
        await addSkill(payload);
        toast.success("Skill added");
      }

      setSkillForm(emptySkillForm);
      setEditingSkillId("");
      await loadSkills();
      await loadStats();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSettingsChange = (event) => {
    const { name, value } = event.target;
    setSettingsForm((current) => ({ ...current, [name]: value }));
  };

  const handleSettingsSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const updated = await updateSettings(settingsForm);
      setSettingsForm({
        siteName: updated.siteName || "",
        email: updated.email || "",
        linkedin: updated.linkedin || "",
        whatsapp: updated.whatsapp || "",
        phone: updated.phone || "",
        heroTitle: updated.heroTitle || "",
        heroSubtitle: updated.heroSubtitle || "",
      });
      toast.success("Settings saved");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEditSkill = (skill) => {
    setEditingSkillId(skill._id);
    setSkillForm({
      name: skill.name || "",
      category: skill.category || "Frontend",
      level: skill.level ?? 80,
      icon: skill.icon || "",
      order: skill.order ?? 0,
    });
  };

  const handleDeleteSkill = async (skillId) => {
    if (!window.confirm("Delete this skill?")) {
      return;
    }

    try {
      await deleteSkill(skillId);
      toast.success("Skill deleted");
      await loadSkills();
      await loadStats();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    onLogout();
  };

  return (
    <main className="relative z-10 min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#00d4ff" }}>
              Portfolio Admin
            </p>
            <h1 className="text-3xl font-black">Dashboard</h1>
          </div>
          <button onClick={logout} className="btn-outline flex items-center gap-2 justify-center">
            <FiLogOut size={16} />
            Logout
          </button>
        </div>

        <section className="mb-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-xl font-bold">Overview</h2>
            <button className="filter-btn flex items-center gap-2" onClick={loadStats}>
              <FiRefreshCw size={13} />
              Refresh
            </button>
          </div>

          {statsError && (
            <p className="mb-4 text-sm" style={{ color: "#ec4899" }}>
              {statsError}
            </p>
          )}

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: "Total Projects", value: stats.totalProjects, icon: FiLayers, color: "#00d4ff" },
              { label: "Total Messages", value: stats.totalMessages, icon: FiInbox, color: "#ec4899" },
              { label: "Total Skills", value: stats.totalSkills, icon: FiCheckCircle, color: "#10b981" },
              {
                label: "Resume Uploaded Date",
                value: stats.resumeUploadedDate ? new Date(stats.resumeUploadedDate).toLocaleDateString() : "Not uploaded",
                icon: FiFileText,
                color: "#fbbf24",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <article key={label} className="glass-strong rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color }}>
                      {label}
                    </p>
                    <p className="text-2xl font-black" style={{ color: "#f0f4ff" }}>
                      {loading.stats ? "..." : value}
                    </p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ color, background: `${color}14`, border: `1px solid ${color}2e` }}
                  >
                    <Icon size={18} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-xl font-bold">Analytics</h2>
            <button className="filter-btn flex items-center gap-2" onClick={loadAnalytics}>
              <FiRefreshCw size={13} />
              Refresh
            </button>
          </div>

          {analyticsError && (
            <p className="mb-4 text-sm" style={{ color: "#ec4899" }}>
              {analyticsError}
            </p>
          )}

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: "Total Visitors", value: analytics.totalVisitors, icon: FiActivity, color: "#00d4ff" },
              { label: "Project Clicks", value: analytics.projectClicks, icon: FiMousePointer, color: "#7c3aed" },
              { label: "Resume Downloads", value: analytics.resumeDownloads, icon: FiDownload, color: "#fbbf24" },
              { label: "Contact Form Submissions", value: analytics.contactFormSubmissions, icon: FiInbox, color: "#10b981" },
            ].map(({ label, value, icon: Icon, color }) => (
              <article key={label} className="glass-strong rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color }}>
                      {label}
                    </p>
                    <p className="text-2xl font-black" style={{ color: "#f0f4ff" }}>
                      {loading.analytics ? "..." : value}
                    </p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ color, background: `${color}14`, border: `1px solid ${color}2e` }}
                  >
                    <Icon size={18} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`filter-btn flex items-center gap-2 ${activeTab === id ? "active" : ""}`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {activeTab === "projects" && (
          <div className="grid lg:grid-cols-[420px_1fr] gap-6 items-start">
            <form onSubmit={handleProjectSubmit} className="glass-strong rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-5">{isEditingProject ? "Edit Project" : "Add Project"}</h2>

              <label className="block text-sm font-semibold mb-2">Project title</label>
              <input className="contact-input mb-4" name="title" value={projectForm.title} onChange={handleProjectChange} required />

              <label className="block text-sm font-semibold mb-2">Category</label>
              <select className="contact-input mb-4" name="category" value={projectForm.category} onChange={handleProjectChange}>
                {projectCategories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>

              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea className="contact-input mb-4 min-h-28" name="description" value={projectForm.description} onChange={handleProjectChange} required />

              <label className="block text-sm font-semibold mb-2">Tags / tech stack</label>
              <input className="contact-input mb-4" name="techStack" value={projectForm.techStack} onChange={handleProjectChange} placeholder="React, Node.js, MongoDB" />

              <label className="block text-sm font-semibold mb-2">Live website link</label>
              <input className="contact-input mb-4" name="liveLink" value={projectForm.liveLink} onChange={handleProjectChange} placeholder="https://..." />

              <label className="block text-sm font-semibold mb-2">GitHub link</label>
              <input className="contact-input mb-4" name="githubLink" value={projectForm.githubLink} onChange={handleProjectChange} placeholder="https://github.com/..." />

              <label className="flex items-center gap-3 mb-5 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={projectForm.featured}
                  onChange={handleProjectChange}
                  className="w-4 h-4 accent-cyan-400"
                />
                <span className="text-sm font-semibold">Featured Project</span>
              </label>

              <label className="block text-sm font-semibold mb-2">Upload image</label>
              <label className="contact-input mb-6 flex items-center gap-3 cursor-pointer">
                <FiUpload size={16} style={{ color: "#00d4ff" }} />
                <span className="truncate">{projectForm.image ? projectForm.image.name : "Choose project image"}</span>
                <input className="hidden" type="file" name="image" accept="image/*" onChange={handleProjectChange} />
              </label>

              <div className="flex gap-3">
                <button className="btn-primary flex-1 flex items-center justify-center gap-2" disabled={saving}>
                  <FiPlus size={16} />
                  {saving ? "Saving..." : isEditingProject ? "Update Project" : "Add Project"}
                </button>
                {isEditingProject && (
                  <button type="button" className="btn-outline" onClick={resetProjectForm}>
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <section className="glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">Projects</h2>
                <span className="text-sm" style={{ color: "#8892b0" }}>{projects.length} total</span>
              </div>

              {loading.projects && <p style={{ color: "#8892b0" }}>Loading projects...</p>}
              {error && <p style={{ color: "#ec4899" }}>{error}</p>}
              {!loading.projects && !error && projects.length === 0 && (
                <p style={{ color: "#8892b0" }}>No projects yet. Add your first project from the form.</p>
              )}

              <div className="grid gap-4">
                {projects.map((project) => (
                  <article key={project._id} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "rgba(0,212,255,0.08)" }}>
                        {project.image && <img src={getUploadUrl(project.image)} alt={project.title} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <p className="text-xs font-bold" style={{ color: "#00d4ff" }}>{project.category}</p>
                              <span
                                className="px-2 py-0.5 rounded-full text-xs font-bold"
                                style={{
                                  background: project.featured ? "rgba(251,191,36,0.14)" : "rgba(255,255,255,0.05)",
                                  color: project.featured ? "#fbbf24" : "#8892b0",
                                  border: project.featured ? "1px solid rgba(251,191,36,0.25)" : "1px solid rgba(255,255,255,0.08)",
                                }}
                              >
                                {project.featured ? "Featured" : "Normal"}
                              </span>
                            </div>
                            <h3 className="font-bold text-lg">{project.title}</h3>
                          </div>
                          <div className="flex gap-2">
                            <button className="filter-btn flex items-center gap-1" onClick={() => handleEditProject(project)}>
                              <FiEdit2 size={13} />
                              Edit
                            </button>
                            <button className="filter-btn flex items-center gap-1" onClick={() => handleDeleteProject(project._id)} style={{ color: "#ec4899" }}>
                              <FiTrash2 size={13} />
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-sm my-3 line-clamp-2" style={{ color: "#8892b0" }}>{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(project.techStack || []).map((tech) => (
                            <span key={tech} className="px-2 py-1 rounded-md text-xs" style={{ background: "rgba(255,255,255,0.06)", color: "#8892b0" }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3 text-sm">
                          {project.liveLink && <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-1" style={{ color: "#00d4ff" }}><FiExternalLink /> Live</a>}
                          {project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-1" style={{ color: "#8892b0" }}><FiGithub /> GitHub</a>}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "messages" && (
          <section className="glass-strong rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3 mb-5">
              <h2 className="text-xl font-bold">Messages</h2>
              <button className="filter-btn flex items-center gap-2" onClick={loadMessages}>
                <FiRefreshCw size={13} />
                Refresh
              </button>
            </div>
            {loading.messages && <p style={{ color: "#8892b0" }}>Loading messages...</p>}
            {!loading.messages && messages.length === 0 && <p style={{ color: "#8892b0" }}>No messages yet.</p>}
            <div className="grid gap-4">
              {messages.map((message) => (
                <article key={message._id} className="rounded-xl p-4" style={{ background: message.isRead ? "rgba(255,255,255,0.03)" : "rgba(0,212,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold">{message.subject}</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs" style={{ color: message.isRead ? "#8892b0" : "#00d4ff", background: "rgba(255,255,255,0.05)" }}>
                          {message.isRead ? "Read" : "Unread"}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: "#f0f4ff" }}>{message.name} - {message.email}</p>
                      {message.phone && <p className="text-sm" style={{ color: "#8892b0" }}>{message.phone}</p>}
                      <p className="text-sm mt-3 whitespace-pre-wrap" style={{ color: "#8892b0" }}>{message.message}</p>
                      <p className="text-xs mt-3" style={{ color: "#4a5568" }}>{new Date(message.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="filter-btn" onClick={() => handleToggleRead(message)}>
                        {message.isRead ? "Mark unread" : "Mark read"}
                      </button>
                      <button className="filter-btn flex items-center gap-1" onClick={() => handleDeleteMessage(message._id)} style={{ color: "#ec4899" }}>
                        <FiTrash2 size={13} />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "resume" && (
          <section className="glass-strong rounded-2xl p-6 max-w-xl">
            <h2 className="text-xl font-bold mb-5">Resume Upload</h2>
            <form onSubmit={handleResumeUpload}>
              <label className="block text-sm font-semibold mb-2">Resume PDF</label>
              <label className="contact-input mb-5 flex items-center gap-3 cursor-pointer">
                <FiUpload size={16} style={{ color: "#00d4ff" }} />
                <span className="truncate">{resumeFile ? resumeFile.name : "Choose PDF resume"}</span>
                <input className="hidden" type="file" accept="application/pdf" onChange={(event) => setResumeFile(event.target.files?.[0] || null)} />
              </label>
              <button className="btn-primary flex items-center gap-2" disabled={saving}>
                <FiUpload size={16} />
                {saving ? "Uploading..." : "Upload Resume"}
              </button>
            </form>
          </section>
        )}

        {activeTab === "skills" && (
          <div className="grid lg:grid-cols-[360px_1fr] gap-6 items-start">
            <form onSubmit={handleSkillSubmit} className="glass-strong rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-5">{isEditingSkill ? "Edit Skill" : "Add Skill"}</h2>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input className="contact-input mb-4" value={skillForm.name} onChange={(event) => setSkillForm({ ...skillForm, name: event.target.value })} required />
              <label className="block text-sm font-semibold mb-2">Category</label>
              <input className="contact-input mb-4" value={skillForm.category} onChange={(event) => setSkillForm({ ...skillForm, category: event.target.value })} required />
              <label className="block text-sm font-semibold mb-2">Level</label>
              <input className="contact-input mb-4" type="number" min="0" max="100" value={skillForm.level} onChange={(event) => setSkillForm({ ...skillForm, level: event.target.value })} required />
              <label className="block text-sm font-semibold mb-2">Icon key</label>
              <input className="contact-input mb-4" value={skillForm.icon} onChange={(event) => setSkillForm({ ...skillForm, icon: event.target.value })} placeholder="react, node, mongo" />
              <label className="block text-sm font-semibold mb-2">Order</label>
              <input className="contact-input mb-5" type="number" value={skillForm.order} onChange={(event) => setSkillForm({ ...skillForm, order: event.target.value })} />
              <div className="flex gap-3">
                <button className="btn-primary flex-1 flex items-center justify-center gap-2" disabled={saving}>
                  <FiPlus size={16} />
                  {saving ? "Saving..." : isEditingSkill ? "Update Skill" : "Add Skill"}
                </button>
                {isEditingSkill && (
                  <button type="button" className="btn-outline" onClick={() => { setSkillForm(emptySkillForm); setEditingSkillId(""); }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <section className="glass-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">Skills</h2>
                <span className="text-sm" style={{ color: "#8892b0" }}>{skills.length} total</span>
              </div>
              {loading.skills && <p style={{ color: "#8892b0" }}>Loading skills...</p>}
              {!loading.skills && skills.length === 0 && <p style={{ color: "#8892b0" }}>No skills yet.</p>}
              <div className="grid md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <article key={skill._id} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold mb-1" style={{ color: "#00d4ff" }}>{skill.category}</p>
                        <h3 className="font-bold">{skill.name}</h3>
                        <p className="text-sm" style={{ color: "#8892b0" }}>Level {skill.level}% - Order {skill.order}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="filter-btn" onClick={() => handleEditSkill(skill)}><FiEdit2 size={13} /></button>
                        <button className="filter-btn" onClick={() => handleDeleteSkill(skill._id)} style={{ color: "#ec4899" }}><FiTrash2 size={13} /></button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "settings" && (
          <section className="glass-strong rounded-2xl p-6 max-w-3xl">
            <div className="flex items-center justify-between gap-3 mb-5">
              <h2 className="text-xl font-bold">Website Settings</h2>
              <button type="button" className="filter-btn flex items-center gap-2" onClick={loadSettings}>
                <FiRefreshCw size={13} />
                Refresh
              </button>
            </div>

            {loading.settings ? (
              <p style={{ color: "#8892b0" }}>Loading settings...</p>
            ) : (
              <form onSubmit={handleSettingsSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Site Name</label>
                    <input className="contact-input" name="siteName" value={settingsForm.siteName} onChange={handleSettingsChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input className="contact-input" type="email" name="email" value={settingsForm.email} onChange={handleSettingsChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">LinkedIn URL</label>
                    <input className="contact-input" type="url" name="linkedin" value={settingsForm.linkedin} onChange={handleSettingsChange} placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">WhatsApp Number</label>
                    <input className="contact-input" name="whatsapp" value={settingsForm.whatsapp} onChange={handleSettingsChange} placeholder="9876543210" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number</label>
                    <input className="contact-input" name="phone" value={settingsForm.phone} onChange={handleSettingsChange} placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Hero Title</label>
                    <input className="contact-input" name="heroTitle" value={settingsForm.heroTitle} onChange={handleSettingsChange} required />
                  </div>
                </div>

                <label className="block text-sm font-semibold mb-2 mt-4">Hero Subtitle</label>
                <textarea className="contact-input min-h-28 mb-5" name="heroSubtitle" value={settingsForm.heroSubtitle} onChange={handleSettingsChange} required />

                <button className="btn-primary flex items-center gap-2" disabled={saving}>
                  <FiSettings size={16} />
                  {saving ? "Saving..." : "Save Settings"}
                </button>
              </form>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
