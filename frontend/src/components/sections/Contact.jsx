import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiMail, FiGithub, FiLinkedin, FiSend, FiMapPin, FiClock, FiPhone } from "react-icons/fi";
import { personalInfo } from "../../data/info";
import { submitContactMessage } from "../../services/api";

const buildWhatsAppUrl = (value) => {
  const digits = String(value || "").replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  return `https://wa.me/${digits.startsWith("91") ? digits : `91${digits}`}`;
};

const Contact = ({ settings, settingsLoading, settingsError }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // "sending" | "success" | "error"
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      await submitContactMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setStatus(null), 4000);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  const email = settings?.email || personalInfo.email;
  const linkedin = settings?.linkedin || personalInfo.linkedin;
  const phone = settings?.phone || personalInfo.phone;
  const whatsapp = settings?.whatsapp || phone;
  const whatsappUrl = buildWhatsAppUrl(whatsapp);

  const contactLinks = [
    {
      icon: FiMail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      color: "#00d4ff",
    },
    {
      icon: FiGithub,
      label: "GitHub",
      value: "github.com/aryansaini",
      href: personalInfo.github,
      color: "#7c3aed",
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      value: linkedin.replace(/^https?:\/\//, ""),
      href: linkedin,
      color: "#ec4899",
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: phone || "Not added",
      href: phone ? `tel:${phone}` : null,
      color: "#10b981",
    },
    {
      icon: FiPhone,
      label: "WhatsApp",
      value: whatsapp || "Not added",
      href: whatsappUrl || null,
      color: "#25d366",
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: personalInfo.location,
      href: null,
      color: "#7c3aed",
    },
    {
      icon: FiClock,
      label: "Availability",
      value: "Mon - Sat, 9am - 7pm IST",
      href: null,
      color: "#fbbf24",
    },
  ];

  return (
    <section id="contact" className="section-padding relative">
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-2 rounded-full"
              style={{ color: "#00d4ff", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}
            >
              Contact Me
            </span>
            <h2 className="section-title">
              Let&apos;s Work{" "}
              <span className="gradient-text">Together</span>
            </h2>
            <p className="section-subtitle">
              Have a project idea or opportunity? I&apos;d love to hear from you.
            </p>
          </div>

          {/* Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left — Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "#f0f4ff", fontFamily: "Syne, sans-serif" }}
              >
                Get in touch
              </h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#8892b0" }}>
                I&apos;m open to freelance projects, full-time opportunities, and
                collaborations. Whether you have a detailed brief or just an idea,
                feel free to reach out.
              </p>
              {settingsLoading && (
                <p className="text-xs mb-4" style={{ color: "#8892b0" }}>
                  Loading contact settings...
                </p>
              )}
              {settingsError && (
                <p className="text-xs mb-4" style={{ color: "#ec4899" }}>
                  {settingsError}
                </p>
              )}

              {/* Contact links */}
              <div className="space-y-4">
                {contactLinks.map((link) => {
                  const Icon = link.icon;
                  const content = (
                    <div
                      className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${link.color}15`, border: `1px solid ${link.color}25` }}
                      >
                        <Icon size={15} style={{ color: link.color }} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold mb-0.5" style={{ color: link.color }}>
                          {link.label}
                        </div>
                        <div className="text-sm" style={{ color: "#f0f4ff" }}>
                          {link.value}
                        </div>
                      </div>
                    </div>
                  );

                  return link.href ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="block hover:scale-[1.01] transition-transform"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={link.label}>{content}</div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right — Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div
                className="p-7 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3
                  className="text-base font-bold mb-6"
                  style={{ color: "#f0f4ff", fontFamily: "Syne, sans-serif" }}
                >
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#8892b0" }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="contact-input"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#8892b0" }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="contact-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#8892b0" }}>
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project Inquiry / Job Opportunity"
                      className="contact-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#8892b0" }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="contact-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#8892b0" }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="contact-input resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FiSend size={15} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>

                  {/* Success message */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg text-sm text-center"
                      style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981" }}
                    >
                      Message sent successfully! I&apos;ll get back to you soon.
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg text-sm text-center"
                      style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.2)", color: "#ec4899" }}
                    >
                      {error}
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
