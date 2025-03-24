import express from "express";
import passport from "passport";

const router = express.Router();

// Google OAuth Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard"); // Redirect setelah login sukses
  }
);

// Cek Status Login (Tambahan untuk `/auth/status`)
router.get("/status", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
    });
  } else {
    return res.status(401).json({ message: "User belum login" });
  }
});

// Logout API tanpa redirect
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout gagal" });

    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // Hapus session cookie
      return res.status(200).json({ message: "Logout berhasil" });
    });
  });
});

export default router;
