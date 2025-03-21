import express from "express";
import passport from "passport"; // 🔥 FIX: Import passport
import { register, login, oauthLogin } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔹 Register & Login
router.post("/register", register);
router.post("/login", login);
router.post("/oauth", oauthLogin);

// 🔹 Profile Route (hanya bisa diakses oleh user yang login)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Ini adalah halaman profil", user: req.user });
});

// 🔹 Google OAuth
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // 🔥 FIX: Redirect ke frontend atau kirim token
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);

// 🔹 Facebook OAuth
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    // 🔥 FIX: Redirect ke frontend atau kirim token
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
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
