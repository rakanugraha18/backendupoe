import express from "express";
import passport from "passport";
import {
  register,
  login,
  oauthLogin,
  getProfile,
  logout,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();

// 🔹 Register & Login
router.post("/register", register);
router.post("/login", login);
router.post("/oauth", oauthLogin);

// 🔹 Profile Route (hanya bisa diakses oleh user yang login)
router.get("/profile", authMiddleware, getProfile);
router.post("/logout", authMiddleware, logout);

// 🔹 Google OAuth
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Buat JWT token
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 🔥 Kirim JSON langsung (tanpa redirect)
    res.json({ message: "Login berhasil!", token, user: req.user });
  }
);

// 🔹 Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Gagal logout" });
    req.session.destroy();
    res.json({ message: "Logout berhasil" });
  });
});

export default router;
