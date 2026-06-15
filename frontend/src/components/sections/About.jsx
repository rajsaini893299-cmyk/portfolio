import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HiCode, HiLightBulb, HiUsers, HiStar } from "react-icons/hi";
import { stats } from "../../data/info";

const highlights = [
  {
    icon: HiCode,
    title: "Clean Code",
    desc: "Writing maintainable, scalable, and well-documented code",
    color: "#00d4ff",
  },
  {
    icon: HiLightBulb,
    title: "Creative Solutions",
    desc: "Finding elegant solutions to complex technical problems",
    color: "#7c3aed",
  },
  {
    icon: HiUsers,
    title: "User-First",
    desc: "Building interfaces that users love to interact with",
    color: "#ec4899",
  },
  {
    icon: HiStar,
    title: "Quality Focus",
    desc: "Delivering polished products that exceed expectations",
    color: "#10b981",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="section-padding relative">
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
              style={{ color: "#00d4ff", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}
            >
              About Me
            </span>
            <h2 className="section-title">
              Passionate About{" "}
              <span className="gradient-text">Building</span>
            </h2>
            <p className="section-subtitle">
              A developer who turns ideas into reality with modern web technologies
            </p>
          </motion.div>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Left — Image / Visual */}
            <motion.div variants={itemVariants} className="relative flex justify-center lg:justify-start">
              <div className="relative">
                {/* Background decoration */}
                <div
                  className="absolute -inset-4 rounded-3xl opacity-30"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))",
                    filter: "blur(20px)",
                  }}
                />

                {/* Main card */}
                <div
                  className="relative w-full max-w-sm rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Code visualization */}
                  <div className="p-6">
                    {/* Terminal header */}
                    <div className="flex items-center gap-2 mb-4">
                      {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                        <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
                      ))}
                      <span className="ml-2 text-xs" style={{ color: "#4a5568" }}>about.js</span>
                    </div>

                    {/* Fake code lines */}
                    <div className="font-mono text-sm space-y-1.5">
                      {[
                        { line: "const developer = {", color: "#f0f4ff" },
                        { line: `  name: "Aryan Saini",`, color: "#10b981" },
                        { line: `  role: "Full Stack Dev",`, color: "#10b981" },
                        { line: `  location: "India",`, color: "#10b981" },
                        { line: `  passion: "Building",`, color: "#10b981" },
                        { line: `  skills: [`, color: "#f0f4ff" },
                        { line: `    "React", "Node.js",`, color: "#7c3aed" },
                        { line: `    "MongoDB", "Express",`, color: "#7c3aed" },
                        { line: `  ],`, color: "#f0f4ff" },
                        { line: `  coffee: Infinity,`, color: "#ec4899" },
                        { line: `  openToWork: true,`, color: "#00d4ff" },
                        { line: `}`, color: "#f0f4ff" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          style={{ color: item.color, opacity: inView ? 1 : 0 }}
                        >
                          {item.line}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -top-4 -right-4 px-3 py-2 rounded-xl text-xs font-bold"
                  style={{
                    background: "rgba(0,212,255,0.15)",
                    border: "1px solid rgba(0,212,255,0.3)",
                    color: "#00d4ff",
                  }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  🚀 Available for hire
                </motion.div>
              </div>
            </motion.div>

            {/* Right — Text */}
            <motion.div variants={itemVariants}>
              <h3
                className="text-2xl font-bold mb-5"
                style={{ fontFamily: "Syne, sans-serif", color: "#f0f4ff" }}
              >
                Full Stack Developer with a{" "}
                <span className="gradient-text">passion for modern web</span>
              </h3>

              <div className="space-y-4 mb-8" style={{ color: "#8892b0", lineHeight: "1.8", fontSize: "15px" }}>
                <p>
                  I&apos;m a passionate Full Stack Developer who loves building modern, responsive,
                  and performance-optimized web applications. My journey started with a curiosity
                  about how websites work and turned into a full-fledged career in software development.
                </p>
                <p>
                  I specialize in the MERN stack — MongoDB, Express.js, React.js, and Node.js —
                  and I&apos;m constantly learning new technologies to stay at the forefront of
                  web development. I believe great software is the intersection of clean code
                  and exceptional user experience.
                </p>
                <p>
                  When I&apos;m not coding, I&apos;m exploring new frameworks, contributing to
                  projects, or sharing knowledge with the developer community.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl text-center"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="text-2xl font-black mb-1 gradient-text"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs" style={{ color: "#8892b0" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="p-5 rounded-xl text-center group cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.3s ease",
                }}
                whileHover={{
                  y: -5,
                  borderColor: `${item.color}33`,
                  background: `${item.color}08`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                >
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <h4 className="font-bold text-sm mb-1.5" style={{ color: "#f0f4ff" }}>
                  {item.title}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: "#8892b0" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
