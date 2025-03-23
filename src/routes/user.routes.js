import express from "express";
import AuthMiddleware from "../middleware/auth.middleware.js";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

// 🔹 Hanya user yang sudah login bisa mengakses profile
router.get(
  "/profile",
  AuthMiddleware.isAuthenticated,
  UserController.getProfile
);

// 🔹 Hanya user yang belum login bisa akses register/login
router.post("/register", AuthMiddleware.isGuest, UserController.register);
router.post("/login", AuthMiddleware.isGuest, UserController.login);
router.post("/logout", AuthMiddleware.isAuthenticated, UserController.logout); // ✅ Pastikan metode dan path benar

export default router;
