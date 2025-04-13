import express from "express";
import AuthMiddleware from "../middleware/auth.middleware.js";
import UserController from "../controllers/user.controller.js";
import UserTopicController from "../controllers/userTopic.controller.js";
import UserWordController from "../controllers/userWord.controller.js";
import LearningProgressController from "../controllers/learningProgress.controller.js";
import CustomWordController from "../controllers/customWord.controller.js";

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
router.post(
  "/select-topics",
  AuthMiddleware.isAuthenticated,
  UserTopicController.selectTopics
);
router.post(
  "/select-words",
  AuthMiddleware.isAuthenticated,
  UserWordController.selectWords
);
router.get(
  "/:id/learning-progress",
  AuthMiddleware.isAuthenticated,
  LearningProgressController.getUserLearningProgress
);
router.post(
  "/custom-word",
  AuthMiddleware.isAuthenticated,
  CustomWordController.addCustomWord
);

export default router;
