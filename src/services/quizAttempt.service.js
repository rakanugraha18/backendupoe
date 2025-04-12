import QuizAttempt from "../models/quizAttempt.model.js";
import Quiz from "../models/quiz.model.js";

class QuizAttemptService {
  static async submitAnswer(userId, quizId, selectedAnswer) {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      throw new Error("Quiz tidak ditemukan");
    }

    const isCorrect = quiz.correct_answer === selectedAnswer;

    await QuizAttempt.create({
      user_id: userId,
      quiz_id: quizId,
      selected_answer: selectedAnswer,
      is_correct: isCorrect,
    });

    if (isCorrect) {
      // Jika benar, tandai quiz sebagai selesai
      await Quiz.findByIdAndUpdate(quizId, { status: "completed" });
    }

    return { isCorrect, correct_answer: quiz.correct_answer };
  }

  static async getUserScore(userId) {
    const attempts = await QuizAttempt.find({ user_id: userId });
    const correctCount = attempts.filter(
      (attempt) => attempt.is_correct
    ).length;
    return {
      total: attempts.length,
      correct: correctCount,
      score: (correctCount / attempts.length) * 100,
    };
  }
}

export default QuizAttemptService;
