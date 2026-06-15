import { useState } from "react";
import toast from "react-hot-toast";
import { FiLock, FiLogIn } from "react-icons/fi";
import { loginAdmin } from "../../services/api";

const AdminLogin = ({ onLogin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await loginAdmin(form);
      localStorage.setItem("adminToken", data.token);
      toast.success("Logged in successfully");
      onLogin();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative z-10 flex items-center justify-center px-6 py-16">
      <form
        onSubmit={handleSubmit}
        className="glass-strong w-full max-w-md rounded-2xl p-8"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))",
            color: "#00d4ff",
            border: "1px solid rgba(0,212,255,0.25)",
          }}
        >
          <FiLock size={22} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
          Admin Login
        </h1>
        <p className="text-sm mb-8" style={{ color: "#8892b0" }}>
          Manage portfolio projects securely.
        </p>

        <label className="block text-sm font-semibold mb-2">Email</label>
        <input
          className="contact-input mb-5"
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />

        <label className="block text-sm font-semibold mb-2">Password</label>
        <input
          className="contact-input mb-7"
          type="password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          required
        />

        <button className="btn-primary w-full flex items-center justify-center gap-2" disabled={loading}>
          <span className="flex items-center justify-center gap-2">
            <FiLogIn size={16} />
            {loading ? "Signing in..." : "Login"}
          </span>
        </button>
      </form>
    </main>
  );
};

export default AdminLogin;
