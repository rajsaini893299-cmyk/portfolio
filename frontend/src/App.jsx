import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Sections
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Services from "./components/sections/Services";
import Testimonials from "./components/sections/Testimonials";
import Contact from "./components/sections/Contact";

// UI
import LoadingScreen from "./components/ui/LoadingScreen";
import AnimatedBackground from "./components/ui/AnimatedBackground";
import BackToTop from "./components/ui/BackToTop";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import { defaultWebsiteSettings } from "./data/info";
import { getSettings, trackVisit } from "./services/api";

function App() {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const [loading, setLoading] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    Boolean(localStorage.getItem("adminToken"))
  );
  const [settings, setSettings] = useState(defaultWebsiteSettings);
  const [settingsLoading, setSettingsLoading] = useState(!isAdminRoute);
  const [settingsError, setSettingsError] = useState("");

  useEffect(() => {
    if (isAdminRoute || sessionStorage.getItem("portfolioVisitTracked")) {
      return;
    }

    sessionStorage.setItem("portfolioVisitTracked", "true");
    trackVisit().catch(() => {
      sessionStorage.removeItem("portfolioVisitTracked");
    });
  }, [isAdminRoute]);

  useEffect(() => {
    if (isAdminRoute) {
      return;
    }

    const loadSettings = async () => {
      try {
        const data = await getSettings();
        setSettings({ ...defaultWebsiteSettings, ...data });
        setSettingsError("");
      } catch (err) {
        setSettingsError(err.message);
      } finally {
        setSettingsLoading(false);
      }
    };

    loadSettings();
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return (
      <>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(10, 10, 26, 0.95)",
              color: "#f0f4ff",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              backdropFilter: "blur(20px)",
            },
          }}
        />
        <div className="relative min-h-screen noise">
          <AnimatedBackground />
          {isAdminAuthenticated ? (
            <AdminDashboard onLogout={() => setIsAdminAuthenticated(false)} />
          ) : (
            <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(10, 10, 26, 0.95)",
            color: "#f0f4ff",
            border: "1px solid rgba(0, 212, 255, 0.2)",
            backdropFilter: "blur(20px)",
          },
        }}
      />

      <LoadingScreen onComplete={() => setLoading(false)} />

      {!loading && (
        <div className="relative min-h-screen noise">
          <AnimatedBackground />
          <Navbar settings={settings} />
          <main className="relative z-10">
            <Hero settings={settings} settingsLoading={settingsLoading} settingsError={settingsError} />
            <About />
            <Skills />
            <Projects />
            <Services />
            <Testimonials />
            <Contact settings={settings} settingsLoading={settingsLoading} settingsError={settingsError} />
          </main>
          <footer className="relative z-10">
            <Footer settings={settings} />
          </footer>
          <BackToTop />
        </div>
      )}
    </>
  );
}

export default App;
