import QuizAttemptService from "../services/quizAttempt.service.js";

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
      const { userId } = req.query;
      const score = await QuizAttemptService.getUserScore(userId);
      res.json({ success: true, score });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default QuizAttemptController;
