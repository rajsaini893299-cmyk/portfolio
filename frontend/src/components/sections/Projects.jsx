import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiGithub, FiExternalLink, FiSearch, FiX, FiStar } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";
import { PROJECTS_PER_PAGE } from "../../data/projects";
import { getProjects, getUploadUrl, trackProjectClick } from "../../services/api";

/* =============================================
   PROJECT CARD
   ============================================= */
const ProjectCard = ({ project, index }) => {
  const gradientFallbacks = [
    "from-cyan-500/20 to-blue-600/20",
    "from-pink-500/20 to-purple-600/20",
    "from-violet-500/20 to-indigo-600/20",
    "from-emerald-500/20 to-teal-600/20",
    "from-orange-500/20 to-red-600/20",
    "from-yellow-500/20 to-orange-600/20",
  ];

  const gradient = project.gradient || gradientFallbacks[index % gradientFallbacks.length];
  const accent = project.accentColor || "#00d4ff";
  const imageSrc = getUploadUrl(project.image);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="project-card rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden flex-shrink-0`}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="text-center p-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-2 text-xl font-black"
              style={{ background: `${accent}20`, border: `1.5px solid ${accent}30`, color: accent }}
            >
              AS
            </div>
            <p className="text-xs font-semibold" style={{ color: accent }}>
              {project.title}
            </p>
          </div>
        )}

        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}33` }}
        >
          {project.category}
        </div>

        {project.featured && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.25)" }}
          >
            <FiStar size={10} />
            Featured
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-bold text-base mb-2"
          style={{ color: "#f0f4ff", fontFamily: "Syne, sans-serif" }}
        >
          {project.title}
        </h3>
        <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: "#8892b0" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(project.techStack || []).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-xs font-medium"
              style={{ background: "rgba(255,255,255,0.05)", color: "#8892b0", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <a
            href={project.liveLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (project.liveLink) {
                trackProjectClick(project._id).catch(() => {});
              }
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${accent}22, ${accent}11)`,
              border: `1px solid ${accent}33`,
              color: accent,
            }}
          >
            <FiExternalLink size={12} />
            Live Demo
          </a>
          <a
            href={project.githubLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (project.githubLink) {
                trackProjectClick(project._id).catch(() => {});
              }
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#8892b0",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "#f0f4ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "#8892b0";
            }}
          >
            <FiGithub size={12} />
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* =============================================
   PROJECTS SECTION
   ============================================= */
const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setError("");
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const projectCategories = ["All", "Frontend", "Full Stack", "Backend", "Client Project"];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const normalizedSearch = searchQuery.toLowerCase();
      const matchCategory = activeCategory === "All" || project.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        project.title?.toLowerCase().includes(normalizedSearch) ||
        project.description?.toLowerCase().includes(normalizedSearch) ||
        (project.techStack || []).some((tech) => tech.toLowerCase().includes(normalizedSearch));

      return matchCategory && matchSearch;
    });
  }, [activeCategory, projects, searchQuery]);

  const featuredProjects = useMemo(
    () => filteredProjects.filter((project) => project.featured),
    [filteredProjects]
  );
  const recentProjects = useMemo(() => {
    const featuredIds = new Set(featuredProjects.map((project) => project._id));
    return filteredProjects.filter((project) => !featuredIds.has(project._id));
  }, [featuredProjects, filteredProjects]);
  const visibleRecentProjects = recentProjects.slice(0, visibleCount);
  const visibleProjectCount = featuredProjects.length + visibleRecentProjects.length;
  const hasMore = visibleCount < recentProjects.length;

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(PROJECTS_PER_PAGE);
  };

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-2 rounded-full"
              style={{ color: "#00d4ff", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}
            >
              My Work
            </span>
            <h2 className="section-title">
              Featured{" "}
              <span className="gradient-text">Projects</span>
            </h2>
            <p className="section-subtitle">
              Real-world applications built with modern technologies
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
            <div className="relative flex-1 max-w-sm">
              <FiSearch
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#4a5568" }}
              />
              <input
                type="text"
                placeholder="Search projects, tech..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(PROJECTS_PER_PAGE); }}
                className="contact-input pl-9 pr-9 h-10"
                style={{ fontSize: "13px", height: "40px" }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#4a5568" }}
                >
                  <FiX size={14} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-xs" style={{ color: "#4a5568" }}>
              Showing <span style={{ color: "#00d4ff" }}>{visibleProjectCount}</span> of{" "}
              <span style={{ color: "#00d4ff" }}>{filteredProjects.length}</span> projects
            </p>
            {(searchQuery || activeCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  setVisibleCount(PROJECTS_PER_PAGE);
                }}
                className="text-xs hover:opacity-80"
                style={{ color: "#ec4899" }}
              >
                Clear filters
              </button>
            )}
          </div>

          {loading && (
            <div className="text-center py-20">
              <p className="font-semibold" style={{ color: "#00d4ff" }}>Loading projects...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="font-semibold mb-2" style={{ color: "#ec4899" }}>Unable to load projects</p>
              <p className="text-sm" style={{ color: "#8892b0" }}>{error}</p>
            </div>
          )}

          {!loading && !error && featuredProjects.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <FiStar size={16} style={{ color: "#fbbf24" }} />
                <h3 className="text-xl font-bold" style={{ color: "#f0f4ff", fontFamily: "Syne, sans-serif" }}>
                  Featured Projects
                </h3>
              </div>
              <AnimatePresence mode="popLayout">
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProjects.map((project, i) => (
                    <ProjectCard key={project._id} project={project} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {!loading && !error && visibleRecentProjects.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-6" style={{ color: "#f0f4ff", fontFamily: "Syne, sans-serif" }}>
                Recent Projects
              </h3>
              <AnimatePresence mode="popLayout">
                <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleRecentProjects.map((project, i) => (
                    <ProjectCard key={project._id} project={project} index={i + featuredProjects.length} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {!loading && !error && visibleProjectCount === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">AS</div>
              <p className="font-semibold mb-2" style={{ color: "#f0f4ff" }}>No projects found</p>
              <p className="text-sm" style={{ color: "#8892b0" }}>
                Add projects from the admin dashboard or try a different filter.
              </p>
            </motion.div>
          )}

          {hasMore && (
            <div className="text-center">
              <motion.button
                onClick={() => setVisibleCount((c) => c + PROJECTS_PER_PAGE)}
                className="btn-outline flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <HiChevronDown size={18} />
                Load More Projects ({recentProjects.length - visibleCount} remaining)
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
