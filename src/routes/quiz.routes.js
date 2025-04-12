import express from "express";
import QuizController from "../controllers/quiz.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/generate",
  AuthMiddleware.isAuthenticated,
  QuizController.createQuiz
);
router.get(
  "/next",
  AuthMiddleware.isAuthenticated,
  QuizController.getNextQuestion
);

export default router;
