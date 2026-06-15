import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        // Accelerate toward end
        const increment = prev < 70 ? Math.random() * 12 + 5 : Math.random() * 5 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#050510" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Radial glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[600px] h-[600px] rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, #00d4ff 0%, #7c3aed 40%, transparent 70%)",
                filter: "blur(80px)",
              }}
            />
          </div>

          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative z-10 text-center mb-12"
          >
            {/* Monogram */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 mx-auto"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))",
                border: "1.5px solid rgba(0,212,255,0.3)",
              }}
            >
              <span className="text-3xl font-black gradient-text" style={{ fontFamily: "Syne, sans-serif" }}>
                AS
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide" style={{ fontFamily: "Syne, sans-serif" }}>
              Aryan Saini
            </h1>
            <p className="text-sm mt-1" style={{ color: "#8892b0" }}>Full Stack Developer</p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 w-64"
          >
            <div className="flex justify-between mb-2">
              <span className="text-xs" style={{ color: "#8892b0" }}>Loading portfolio...</span>
              <span className="text-xs font-mono" style={{ color: "#00d4ff" }}>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #00d4ff, #7c3aed, #ec4899)",
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>

          {/* Dots animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 flex gap-2 mt-8"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#00d4ff" }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
