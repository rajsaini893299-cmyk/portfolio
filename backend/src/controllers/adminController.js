import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (!env.jwtSecret) {
    return res.status(500).json({ message: "JWT_SECRET is missing in .env" });
  }

  const validEmail = email === env.adminEmail;
  const validPassword = password === env.adminPassword;

  if (!validEmail || !validPassword) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const token = jwt.sign({ email, role: "admin" }, env.jwtSecret, {
    expiresIn: "1d",
  });

  res.json({
    token,
    admin: { email },
  });
};
