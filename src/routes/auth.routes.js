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

export default router;
