/**
 * =====================================================
 *  PROJECTS DATA FILE — Aryan Saini Portfolio
 * =====================================================
 *  HOW TO ADD A NEW PROJECT:
 *  1. Copy one of the existing project objects below
 *  2. Fill in your project's details
 *  3. Save the file — the website updates automatically!
 *
 *  CATEGORIES: "Full Stack" | "Frontend" | "Backend"
 *  FEATURED:   Set `featured: true` to highlight a project
 * =====================================================
 */

export const projects = [
  {
    id: 1,
    name: "Hospital Management System",
    description:
      "A comprehensive hospital management platform with patient registration, appointment scheduling, doctor management, billing, and medical records. Features real-time bed availability and admin analytics dashboard.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API", "JWT"],
    category: "Full Stack",
    featured: true,
    liveDemo: "#",
    github: "#",
    // Replace with your actual image paths (e.g., "/images/hospital.png")
    image: null,
    gradient: "from-cyan-500/20 to-blue-600/20",
    accentColor: "#00d4ff",
  },
  {
    id: 2,
    name: "Salon Website with Admin Dashboard",
    description:
      "A modern salon booking platform with service listings, stylist profiles, and a full-featured admin dashboard for managing appointments, staff, revenue analytics, and customer data.",
    techStack: ["React.js", "Node.js", "MongoDB", "Tailwind CSS", "Chart.js"],
    category: "Full Stack",
    featured: true,
    liveDemo: "#",
    github: "#",
    image: null,
    gradient: "from-pink-500/20 to-purple-600/20",
    accentColor: "#ec4899",
  },
  {
    id: 3,
    name: "Appointment Booking System",
    description:
      "A versatile appointment scheduling system with calendar integration, automated email reminders, multi-timezone support, and a clean UI for both clients and service providers.",
    techStack: ["React.js", "Express.js", "MongoDB", "Node.js", "Email.js"],
    category: "Full Stack",
    featured: true,
    liveDemo: "#",
    github: "#",
    image: null,
    gradient: "from-violet-500/20 to-indigo-600/20",
    accentColor: "#7c3aed",
  },
  {
    id: 4,
    name: "E-Commerce Website",
    description:
      "A full-featured e-commerce platform with product catalog, cart management, secure checkout, order tracking, user authentication, and an admin panel for inventory and sales management.",
    techStack: ["React.js", "Node.js", "MongoDB", "Stripe API", "Redux", "JWT"],
    category: "Full Stack",
    featured: false,
    liveDemo: "#",
    github: "#",
    image: null,
    gradient: "from-emerald-500/20 to-teal-600/20",
    accentColor: "#10b981",
  },

  // =============================================
  //  ADD YOUR NEW PROJECTS BELOW THIS LINE
  //  Just copy the template and fill in details:
  // =============================================

  // {
  //   id: 5,
  //   name: "Your Project Name",
  //   description: "A short description of your project — what it does and who it's for.",
  //   techStack: ["React.js", "Node.js", "MongoDB"],
  //   category: "Full Stack",   // "Full Stack" | "Frontend" | "Backend"
  //   featured: false,
  //   liveDemo: "https://your-live-demo.com",
  //   github: "https://github.com/yourusername/repo",
  //   image: "/images/your-project.png",  // or null for placeholder
  //   gradient: "from-orange-500/20 to-red-600/20",
  //   accentColor: "#f97316",
  // },
];

/**
 * Project categories for the filter bar.
 * "All" is added automatically — only list actual categories here.
 */
export const projectCategories = ["All", "Full Stack", "Frontend", "Backend"];

/**
 * Pagination: number of projects to show per page in the "load more" grid.
 * Featured projects are always shown above the grid.
 */
export const PROJECTS_PER_PAGE = 6;
