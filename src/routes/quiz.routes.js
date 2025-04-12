import express from "express";
import QuizController from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/generate", QuizController.createQuiz);
router.get("/next", QuizController.getNextQuestion);

export default router;
