import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills, techIcons } from "../../data/skills";
import { getSkills } from "../../services/api";

const skillIcons = {
  html: "🌐",
  css: "🎨",
  js: "⚡",
  react: "⚛️",
  node: "🟢",
  express: "🚀",
  mongo: "🍃",
  git: "📦",
  vscode: "💻",
  figma: "🎭",
  api: "🔗",
  postman: "📮",
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const categoryColors = ["#00d4ff", "#7c3aed", "#ec4899", "#10b981", "#fbbf24"];

const groupSkills = (items) => {
  const grouped = items.reduce((acc, skill) => {
    const category = skill.category || "Other";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push({
      name: skill.name,
      level: skill.level,
      icon: skill.icon,
    });

    return acc;
  }, {});

  return Object.entries(grouped).map(([category, items], index) => ({
    category,
    color: categoryColors[index % categoryColors.length],
    items,
  }));
};

const SkillBar = ({ name, level, color, inView, index, icon }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="skill-badge p-4 rounded-xl cursor-default"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {techIcons[icon] ? (
            <img
              src={techIcons[icon]}
              alt={name}
              className="w-6 h-6 object-contain"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          ) : (
            <span className="text-lg">{skillIcons[icon] || "⚡"}</span>
          )}
          <span className="text-sm font-semibold" style={{ color: "#f0f4ff" }}>{name}</span>
        </div>
        <span className="text-xs font-mono font-bold" style={{ color }}>
          {level}%
        </span>
      </div>
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.05, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [skillGroups, setSkillGroups] = useState(skills);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadSkills = async () => {
      try {
        const data = await getSkills();

        if (!ignore && data.length > 0) {
          setSkillGroups(groupSkills(data));
        }
      } catch {
        if (!ignore) {
          setSkillGroups(skills);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadSkills();

    return () => {
      ignore = true;
    };
  }, []);

  // All tech stack logos for the marquee
  const techStack = [
    "HTML5", "CSS3", "JavaScript", "React.js", "Node.js",
    "Express.js", "MongoDB", "REST APIs", "Git", "GitHub",
    "VS Code", "Figma", "Postman", "Tailwind CSS", "Redux"
  ];

  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-2 rounded-full"
              style={{ color: "#7c3aed", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)" }}
            >
              My Skills
            </span>
            <h2 className="section-title">
              Technical{" "}
              <span className="gradient-text-2">Expertise</span>
            </h2>
            <p className="section-subtitle">
              A well-rounded skill set covering the full development stack
            </p>
          </motion.div>

          {/* Skills Grid — 3 category columns */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {skillGroups.map((category) => (
              <motion.div
                key={category.category}
                variants={itemVariants}
                className="p-6 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: category.color, boxShadow: `0 0 8px ${category.color}` }}
                  />
                  <h3
                    className="font-bold text-base"
                    style={{ color: "#f0f4ff", fontFamily: "Syne, sans-serif" }}
                  >
                    {category.category}
                  </h3>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  {category.items.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      {...skill}
                      color={category.color}
                      inView={inView}
                      index={i}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {loading && (
            <p className="text-center text-xs mb-8" style={{ color: "#4a5568" }}>
              Loading skills...
            </p>
          )}

          {/* Tech Stack Marquee */}
          <motion.div variants={itemVariants}>
            <p className="text-center text-xs font-bold tracking-widest uppercase mb-6" style={{ color: "#4a5568" }}>
              Technologies I Work With
            </p>
            <div className="overflow-hidden relative">
              <div
                className="flex gap-4"
                style={{
                  animation: "marquee 25s linear infinite",
                  width: "max-content",
                }}
              >
                {[...techStack, ...techStack].map((tech, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#8892b0",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tech}
                  </div>
                ))}
              </div>

              {/* Fade edges */}
              <div
                className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none"
                style={{ background: "linear-gradient(90deg, #050510, transparent)" }}
              />
              <div
                className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none"
                style={{ background: "linear-gradient(-90deg, #050510, transparent)" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Skills;
