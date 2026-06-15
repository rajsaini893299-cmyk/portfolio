import { useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { HiBriefcase, HiDownload, HiArrowDown } from "react-icons/hi";
import { FiGithub, FiLinkedin, FiMail, FiUser } from "react-icons/fi";
import { personalInfo } from "../../data/info";
import { getResumeUrl } from "../../services/api";

const techPills = [
  { label: "React.js", top: "8%", right: "5%", color: "#00d4ff", duration: 3.4, delay: 0.2 },
  { label: "Node.js", top: "20%", left: "0%", color: "#10b981", duration: 4.1, delay: 0.7 },
  { label: "MongoDB", bottom: "20%", left: "2%", color: "#7c3aed", duration: 3.7, delay: 1.1 },
  { label: "Express.js", bottom: "8%", right: "8%", color: "#ec4899", duration: 4.5, delay: 0.4 },
];

const Hero = ({ settings, settingsLoading, settingsError }) => {
  const [hasProfileImage, setHasProfileImage] = useState(true);
  const profileImageSrc = "/images/aryan.jpg";
  const siteName = settings?.siteName || personalInfo.name;
  const heroTitle = settings?.heroTitle || `Hi, I'm ${siteName}`;
  const heroSubtitle = settings?.heroSubtitle || personalInfo.tagline;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-full h-px opacity-5"
          style={{ background: "linear-gradient(90deg, transparent, #00d4ff, transparent)" }} />
        <div className="absolute top-2/3 left-0 w-full h-px opacity-5"
          style={{ background: "linear-gradient(90deg, transparent, #7c3aed, transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text Content */}
          <div>
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: "rgba(0, 212, 255, 0.08)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium" style={{ color: "#00d4ff" }}>
                {personalInfo.availability}
              </span>
            </motion.div>

            {settingsLoading && (
              <p className="text-xs mb-4" style={{ color: "#8892b0" }}>
                Loading website settings...
              </p>
            )}
            {settingsError && (
              <p className="text-xs mb-4" style={{ color: "#ec4899" }}>
                {settingsError}
              </p>
            )}

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1
                className="font-black leading-tight mb-2"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                  color: "#f0f4ff",
                }}
              >
                <span className="gradient-text text-glow">{heroTitle}</span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="text-base font-medium" style={{ color: "#8892b0" }}>
                I&apos;m a
              </span>
              <div
                className="px-4 py-1.5 rounded-lg text-base font-bold"
                style={{
                  background: "rgba(0,212,255,0.08)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  color: "#00d4ff",
                  fontFamily: "Syne, sans-serif",
                  minWidth: "260px",
                }}
              >
                <TypeAnimation
                  sequence={[
                    "Full Stack Developer",
                    2000,
                    "React.js Developer",
                    2000,
                    "Node.js Developer",
                    2000,
                    "MERN Stack Developer",
                    2000,
                    "Problem Solver",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-base leading-relaxed mb-10 max-w-lg"
              style={{ color: "#8892b0" }}
            >
              {heroSubtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button
                onClick={() => scrollTo("contact")}
                className="btn-primary flex items-center gap-2"
              >
                <HiBriefcase size={18} />
                <span>Hire Me</span>
              </button>
              <a
                href={getResumeUrl()}
                download
                className="btn-outline flex items-center gap-2"
              >
                <HiDownload size={18} />
                Download Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-4"
            >
              <span className="text-xs font-medium" style={{ color: "#4a5568" }}>Follow me:</span>
              {[
                { icon: FiGithub, href: personalInfo.github, label: "GitHub" },
                { icon: FiLinkedin, href: settings?.linkedin || personalInfo.linkedin, label: "LinkedIn" },
                { icon: FiMail, href: `mailto:${settings?.email || personalInfo.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#8892b0",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)";
                    e.currentTarget.style.color = "#00d4ff";
                    e.currentTarget.style.background = "rgba(0,212,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "#8892b0";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            className="hidden lg:flex items-center justify-center relative"
          >
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-72 h-72 rounded-full"
              style={{
                border: "1px dashed rgba(0,212,255,0.15)",
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-96 h-96 rounded-full"
              style={{
                border: "1px dashed rgba(124,58,237,0.1)",
              }}
            />

            {/* Center card */}
            <div
              className="relative z-10 w-56 h-56 sm:w-60 sm:h-60 lg:w-64 lg:h-64 rounded-3xl flex flex-col items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Profile image */}
              <div
                className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full flex items-center justify-center mb-4 p-1"
                style={{
                  background: "linear-gradient(135deg, rgba(0,212,255,0.9), rgba(124,58,237,0.85), rgba(236,72,153,0.75))",
                  boxShadow: "0 0 28px rgba(0,212,255,0.3), 0 0 48px rgba(124,58,237,0.22)",
                }}
              >
                <div
                  className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.2))",
                    border: "2px solid rgba(5,8,22,0.85)",
                  }}
                >
                  {hasProfileImage ? (
                    <img
                      src={profileImageSrc}
                      alt={siteName}
                      className="w-full h-full object-cover"
                      onError={() => setHasProfileImage(false)}
                    />
                  ) : (
                    <FiUser size={46} style={{ color: "#00d4ff" }} />
                  )}
                </div>
              </div>
              <h3 className="font-bold text-base" style={{ color: "#f0f4ff", fontFamily: "Syne, sans-serif" }}>
                {siteName}
              </h3>
              <p className="text-xs mt-1" style={{ color: "#8892b0" }}>Full Stack Developer</p>

              {/* Status dot */}
              <div className="flex items-center gap-1.5 mt-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs" style={{ color: "#10b981" }}>Available for work</span>
              </div>
            </div>

            {/* Floating tech pills */}
            {techPills.map((pill) => (
              <motion.div
                key={pill.label}
                className="absolute px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  ...pill,
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${pill.color}33`,
                  color: pill.color,
                  backdropFilter: "blur(10px)",
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: pill.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: pill.delay,
                }}
              >
                {pill.label}
              </motion.div>
            ))}

            {/* Stat pills */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4"
            >
              {[
                { value: "2+", label: "Years" },
                { value: "20+", label: "Projects" },
                { value: "15+", label: "Clients" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center px-4 py-2 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="text-lg font-black gradient-text" style={{ fontFamily: "Syne, sans-serif" }}>
                    {stat.value}
                  </span>
                  <span className="text-xs" style={{ color: "#8892b0" }}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollTo("about")}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: "#4a5568" }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <HiArrowDown size={16} style={{ color: "#00d4ff" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
