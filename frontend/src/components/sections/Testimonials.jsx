import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { testimonials } from "../../data/testimonials";

const TestimonialCard = ({ testimonial, isActive }) => (
  <motion.div
    className="testimonial-card p-6 rounded-2xl flex flex-col h-full"
    style={{
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${isActive ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.07)"}`,
      boxShadow: isActive ? "0 20px 60px rgba(0,0,0,0.3)" : "none",
    }}
  >
    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {Array.from({ length: testimonial.rating }).map((_, i) => (
        <FiStar key={i} size={14} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
      ))}
    </div>

    {/* Quote */}
    <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "#8892b0" }}>
      &ldquo;{testimonial.text}&rdquo;
    </p>

    {/* Author */}
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
        style={{
          background: `${testimonial.color}20`,
          border: `1.5px solid ${testimonial.color}40`,
          color: testimonial.color,
        }}
      >
        {testimonial.avatar}
      </div>
      <div>
        <div className="font-semibold text-sm" style={{ color: "#f0f4ff" }}>
          {testimonial.name}
        </div>
        <div className="text-xs" style={{ color: "#8892b0" }}>
          {testimonial.role} · {testimonial.company}
        </div>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveIndex((i) => (i + 1) % testimonials.length);

  return (
    <section id="testimonials" className="section-padding relative">
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
              style={{ color: "#fbbf24", background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.15)" }}
            >
              Testimonials
            </span>
            <h2 className="section-title">
              What Clients{" "}
              <span className="gradient-text">Say</span>
            </h2>
            <p className="section-subtitle">
              Real feedback from people I&apos;ve had the pleasure of working with
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <TestimonialCard testimonial={t} isActive={i === activeIndex} />
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="relative overflow-hidden rounded-2xl mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                >
                  <TestimonialCard testimonial={testimonials[activeIndex]} isActive />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile nav */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#8892b0" }}
              >
                <FiChevronLeft size={16} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="rounded-full transition-all"
                    style={{
                      width: i === activeIndex ? "20px" : "6px",
                      height: "6px",
                      background: i === activeIndex ? "#00d4ff" : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#8892b0" }}
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Summary stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-10 flex items-center justify-center gap-6 flex-wrap"
          >
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <FiStar key={i} size={18} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
              ))}
              <span className="text-lg font-black ml-1" style={{ color: "#fbbf24" }}>5.0</span>
            </div>
            <span className="text-sm" style={{ color: "#8892b0" }}>
              Average rating from {testimonials.length} client reviews
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
