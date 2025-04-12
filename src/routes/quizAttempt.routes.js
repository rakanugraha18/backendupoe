import express from "express";
import QuizAttemptController from "../controllers/quizAttempt.controller.js";

const router = express.Router();

router.post("/submit", QuizAttemptController.submitAnswer);
router.get("/score", QuizAttemptController.getUserScore);

export default router;
