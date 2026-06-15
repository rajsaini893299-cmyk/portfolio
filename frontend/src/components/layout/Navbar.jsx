import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ settings }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const siteName = settings?.siteName || "Aryan Saini";
  const siteInitials = siteName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const [firstName, ...restName] = siteName.split(" ").filter(Boolean);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      let current = "home";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(5, 5, 16, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))",
                border: "1.5px solid rgba(0,212,255,0.25)",
                color: "#00d4ff",
                fontFamily: "Syne, sans-serif",
                transition: "all 0.3s",
              }}
            >
              {siteInitials || "AS"}
            </div>
            <span
              className="font-bold text-base hidden sm:block"
              style={{
                fontFamily: "Syne, sans-serif",
                color: "#f0f4ff",
                transition: "color 0.3s",
              }}
            >
              {firstName || "Aryan"} <span className="gradient-text">{restName.join(" ") || "Saini"}</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={`nav-link ${activeSection === link.href.replace("#", "") ? "active" : ""}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick("#contact")}
              className="btn-primary text-sm"
              style={{ padding: "9px 22px" }}
            >
              <span>Hire Me</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "#f0f4ff" }}
          >
            {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 mobile-menu border-b"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-3 px-3 rounded-lg text-sm font-medium transition-all"
                  style={{
                    color: activeSection === link.href.replace("#", "") ? "#00d4ff" : "#8892b0",
                    background: activeSection === link.href.replace("#", "") ? "rgba(0,212,255,0.08)" : "transparent",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                onClick={() => handleNavClick("#contact")}
                className="btn-primary mt-3 text-center"
                style={{ padding: "10px 24px" }}
              >
                <span>Hire Me</span>
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
