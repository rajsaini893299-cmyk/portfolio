import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? "0, 212, 255" : "124, 58, 237";
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
      }
    }

    // Create particles
    const particles = Array.from({ length: 80 }, () => new Particle());

    // Connect close particles
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => { p.update(); p.draw(); });
      connectParticles();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Canvas for particle network */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-left orb */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #00d4ff, transparent 70%)",
            filter: "blur(60px)",
            animation: "float-orb 15s ease-in-out infinite alternate",
          }}
        />
        {/* Bottom-right orb */}
        <div
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, #7c3aed, transparent 70%)",
            filter: "blur(80px)",
            animation: "float-orb 18s ease-in-out infinite alternate-reverse",
          }}
        />
        {/* Center orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.03]"
          style={{
            background: "radial-gradient(ellipse, #ec4899, transparent 60%)",
            filter: "blur(80px)",
            animation: "float-orb 20s ease-in-out infinite",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid opacity-40" />

      <style>{`
        @keyframes float-orb {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
          100% { transform: translate(-20px, 30px) scale(0.95); }
        }
      `}</style>
    </>
  );
};

export default AnimatedBackground;
