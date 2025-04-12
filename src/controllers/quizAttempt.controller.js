import QuizAttemptService from "../services/quizAttempt.service.js";
import QuizAttempt from "../models/quizAttempt.model.js";

class QuizAttemptController {
  static async submitAnswer(req, res) {
    try {
      const { userId, quizId, selectedAnswer } = req.body;
      const result = await QuizAttemptService.submitAnswer(
        userId,
        quizId,
        selectedAnswer
      );
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getUserScore(req, res) {
    try {
      const { userId } = req.params;
      const score = await QuizAttemptService.getUserScore(userId);
      res.json(score);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // 🔥 Tambahan baru
  static async getAttemptById(req, res) {
    try {
      const attempt = await QuizAttempt.findById(req.params.id);
      if (!attempt) {
        return res
          .status(404)
          .json({ message: "Quiz Attempt tidak ditemukan" });
      }
      res.json(attempt);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default QuizAttemptController;
