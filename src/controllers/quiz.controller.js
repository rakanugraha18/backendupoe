import QuizService from "../services/quiz.service.js";

class QuizController {
  static async createQuiz(req, res) {
    try {
      const { userId, limit } = req.body;
      const quizzes = await QuizService.generateQuizForUser(userId, limit);
      res.json({ success: true, quizzes });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async getNextQuestion(req, res) {
    try {
      const { userId } = req.query;
      const quiz = await QuizService.getPendingQuiz(userId);
      if (!quiz.length) {
        return res.json({
          success: false,
          message: "Semua kata telah dijawab",
        });
      }
      res.json({ success: true, quiz: quiz[0] });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default QuizController;
