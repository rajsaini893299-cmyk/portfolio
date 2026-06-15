import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const protectAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const token = authHeader.split(" ")[1];
    req.admin = jwt.verify(token, env.jwtSecret);
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

export default protectAdmin;
