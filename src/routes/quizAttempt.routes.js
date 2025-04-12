import express from "express";
import QuizAttemptController from "../controllers/quizAttempt.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/submit",
  AuthMiddleware.isAuthenticated,
  QuizAttemptController.submitAnswer
);
router.get(
  "/score/:userId",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isSameUser,
  QuizAttemptController.getUserScore
);
router.get(
  "/:id",
  AuthMiddleware.isAuthenticated,
  QuizAttemptController.getAttemptById
);

export default router;
