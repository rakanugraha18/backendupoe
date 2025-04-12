import express from "express";
import QuizAttemptController from "../controllers/quizAttempt.controller.js";

const router = express.Router();

router.post("/submit", QuizAttemptController.submitAnswer);
router.get("/score/:userId", QuizAttemptController.getUserScore);
router.get("/:id", QuizAttemptController.getAttemptById);

export default router;
