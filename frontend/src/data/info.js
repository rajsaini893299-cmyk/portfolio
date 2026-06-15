/**
 * =====================================================
 *  PERSONAL INFO & SERVICES — Aryan Saini Portfolio
 * =====================================================
 */

export const personalInfo = {
  name: "Aryan Saini",
  title: "Full Stack Developer",
  tagline: "Building fast, modern & scalable web applications",
  email: "aryan.saini@email.com",
  phone: "",
  whatsapp: "",
  github: "https://github.com/aryansaini",
  linkedin: "https://linkedin.com/in/aryansaini",
  resumeLink: "#",
  location: "India",
  availability: "Open to Work",
  yearsOfExperience: "2+",
  projectsCompleted: "20+",
  happyClients: "15+",
};

export const defaultWebsiteSettings = {
  siteName: personalInfo.name,
  email: personalInfo.email,
  linkedin: personalInfo.linkedin,
  whatsapp: personalInfo.whatsapp,
  phone: personalInfo.phone,
  heroTitle: `Hi, I'm ${personalInfo.name}`,
  heroSubtitle:
    "Building fast, modern & scalable web applications - from pixel-perfect UIs to scalable backend APIs.",
};

export const services = [
  {
    id: 1,
    title: "Frontend Development",
    description:
      "Crafting pixel-perfect, responsive UIs with React.js, modern CSS, and smooth animations that delight users across all devices.",
    icon: "frontend",
    features: ["React.js / HTML / CSS", "Responsive Design", "Performance Optimization", "Cross-browser Compatibility"],
    gradient: "from-cyan-400 to-blue-500",
    delay: 0,
  },
  {
    id: 2,
    title: "Backend Development",
    description:
      "Building robust, scalable server-side applications with Node.js and Express.js, coupled with efficient MongoDB database design.",
    icon: "backend",
    features: ["Node.js & Express.js", "MongoDB Database", "REST API Design", "Authentication & Security"],
    gradient: "from-violet-400 to-purple-600",
    delay: 0.1,
  },
  {
    id: 3,
    title: "Full Stack Development",
    description:
      "End-to-end web application development — from a beautiful frontend to a powerful backend — delivered as a complete, production-ready product.",
    icon: "fullstack",
    features: ["Complete Web Apps", "MERN Stack", "Database Design", "Deployment & DevOps"],
    gradient: "from-pink-400 to-rose-600",
    delay: 0.2,
  },
  {
    id: 4,
    title: "Website Maintenance",
    description:
      "Keeping your web applications running smoothly with regular updates, bug fixes, performance monitoring, and feature enhancements.",
    icon: "maintenance",
    features: ["Bug Fixes & Updates", "Performance Audits", "Security Patches", "Feature Additions"],
    gradient: "from-emerald-400 to-teal-600",
    delay: 0.3,
  },
];

export const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "20+", label: "Projects Built" },
  { value: "15+", label: "Happy Clients" },
  { value: "100%", label: "Client Satisfaction" },
];
