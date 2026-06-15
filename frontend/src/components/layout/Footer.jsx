import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";
import { personalInfo } from "../../data/info";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Footer = ({ settings }) => {
  const siteName = settings?.siteName || personalInfo.name;
  const siteInitials = siteName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const [firstName, ...restName] = siteName.split(" ").filter(Boolean);
  const email = settings?.email || personalInfo.email;
  const linkedin = settings?.linkedin || personalInfo.linkedin;
  const phone = settings?.phone || personalInfo.phone;

  const scrollTo = (href) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative pt-14 pb-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(0,212,255,0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))",
                  border: "1.5px solid rgba(0,212,255,0.2)",
                  color: "#00d4ff",
                  fontFamily: "Syne, sans-serif",
                }}
              >
                {siteInitials || "AS"}
              </div>
              <span
                className="font-bold text-base"
                style={{ color: "#f0f4ff", fontFamily: "Syne, sans-serif" }}
              >
                {firstName || "Aryan"} <span className="gradient-text">{restName.join(" ") || "Saini"}</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-5" style={{ color: "#8892b0", maxWidth: "240px" }}>
              Full Stack Developer passionate about building fast, modern web applications
              with great user experiences.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FiGithub, href: personalInfo.github, label: "GitHub" },
                { icon: FiLinkedin, href: linkedin, label: "LinkedIn" },
                { icon: FiMail, href: `mailto:${email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#8892b0",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00d4ff";
                    e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#8892b0";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-4" style={{ color: "#f0f4ff" }}>Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-xs transition-colors hover:text-cyan-400 text-left"
                    style={{ color: "#8892b0" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-sm mb-4" style={{ color: "#f0f4ff" }}>Contact Info</h4>
            <div className="space-y-2">
              <p className="text-xs" style={{ color: "#8892b0" }}>
                Email: {email}
              </p>
              {phone && (
                <p className="text-xs" style={{ color: "#8892b0" }}>
                  Phone: {phone}
                </p>
              )}
              <p className="text-xs" style={{ color: "#8892b0" }}>
                Location: {personalInfo.location}
              </p>
              <p className="text-xs" style={{ color: "#8892b0" }}>
                Availability: {personalInfo.availability}
              </p>
            </div>
          </div>        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs flex items-center gap-1.5" style={{ color: "#4a5568" }}>
            © 2026 {siteName}. Built with
            <FiHeart size={11} style={{ color: "#ec4899" }} />
            using React & Tailwind CSS
          </p>
          <p className="text-xs" style={{ color: "#4a5568" }}>
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


