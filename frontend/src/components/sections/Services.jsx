import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { services } from "../../data/info";
import { HiCheckCircle } from "react-icons/hi";
import { FiCode, FiServer, FiLayers, FiSettings } from "react-icons/fi";

const serviceIcons = {
  frontend: FiCode,
  backend: FiServer,
  fullstack: FiLayers,
  maintenance: FiSettings,
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="section-padding relative">
      {/* Separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20"
        style={{ background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.3), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={cardVariants} className="text-center mb-16">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-2 rounded-full"
              style={{ color: "#ec4899", background: "rgba(236,72,153,0.08)", border: "1px solid rgba(236,72,153,0.15)" }}
            >
              Services
            </span>
            <h2 className="section-title">
              What I{" "}
              <span className="gradient-text-2">Offer</span>
            </h2>
            <p className="section-subtitle">
              End-to-end web development services to bring your ideas to life
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  className="group relative p-6 rounded-2xl cursor-default overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transition: "all 0.4s ease",
                  }}
                  whileHover={{
                    y: -8,
                    borderColor: "rgba(0,212,255,0.2)",
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Background gradient on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, rgba(0,212,255,0.04), transparent)`,
                    }}
                  />

                  {/* Icon */}
                  <div className="relative z-10 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${service.gradient.includes("cyan") ? "rgba(0,212,255,0.15)" : service.gradient.includes("violet") ? "rgba(124,58,237,0.15)" : service.gradient.includes("pink") ? "rgba(236,72,153,0.15)" : "rgba(16,185,129,0.15)"}, transparent)`,
                        border: `1px solid ${service.gradient.includes("cyan") ? "rgba(0,212,255,0.25)" : service.gradient.includes("violet") ? "rgba(124,58,237,0.25)" : service.gradient.includes("pink") ? "rgba(236,72,153,0.25)" : "rgba(16,185,129,0.25)"}`,
                      }}
                    >
                      {Icon && (
                        <Icon
                          size={22}
                          style={{
                            color: service.gradient.includes("cyan") ? "#00d4ff"
                              : service.gradient.includes("violet") ? "#7c3aed"
                              : service.gradient.includes("pink") ? "#ec4899"
                              : "#10b981",
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3
                      className="font-bold text-base mb-3"
                      style={{ color: "#f0f4ff", fontFamily: "Syne, sans-serif" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: "#8892b0" }}>
                      {service.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-1.5">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-xs" style={{ color: "#8892b0" }}>
                          <HiCheckCircle
                            size={13}
                            style={{
                              color: service.gradient.includes("cyan") ? "#00d4ff"
                                : service.gradient.includes("violet") ? "#7c3aed"
                                : service.gradient.includes("pink") ? "#ec4899"
                                : "#10b981",
                              flexShrink: 0,
                            }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            variants={cardVariants}
            className="mt-14 text-center p-8 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.06), rgba(124,58,237,0.06))",
              border: "1px solid rgba(0,212,255,0.12)",
            }}
          >
            <h3
              className="text-xl font-bold mb-3"
              style={{ color: "#f0f4ff", fontFamily: "Syne, sans-serif" }}
            >
              Have a project in mind?
            </h3>
            <p className="text-sm mb-6" style={{ color: "#8892b0" }}>
              Let&apos;s build something amazing together. I&apos;m available for freelance and full-time opportunities.
            </p>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
            >
              <span>Get In Touch</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
