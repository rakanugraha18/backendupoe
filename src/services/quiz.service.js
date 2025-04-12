import Quiz from "../models/quiz.model.js";
import UserWord from "../models/userWord.model.js";
import axios from "axios";

class QuizService {
  // Fungsi untuk menerjemahkan kata ke Bahasa Indonesia
  static async translateToIndo(word) {
    try {
      const response = await axios.get(
        `https://api.mymemory.translated.net/get?q=${word}&langpair=en|id`
      );
      return response.data.responseData.translatedText?.toLowerCase().trim();
    } catch (error) {
      console.error("Gagal translate:", word, error.message);
      return null;
    }
  }

  // Fungsi untuk mendapatkan 3 pilihan kata palsu berdasarkan topik
  static async getFakeOptionsFromTopicWithTranslation(
    userId,
    correctTranslation,
    topic,
    currentWord
  ) {
    const allWords = await UserWord.find({
      user_id: userId,
      topic,
      word: { $ne: currentWord }, // Jangan ambil kata yang sedang diquiz-kan
    });

    const candidates = allWords.map((item) => item.word);
    const used = new Set();
    const fakeOptions = [];

    while (fakeOptions.length < 3 && candidates.length > 0) {
      const idx = Math.floor(Math.random() * candidates.length);
      const randomWord = candidates.splice(idx, 1)[0];
      if (used.has(randomWord)) continue;

      used.add(randomWord);
      const translated = await this.translateToIndo(randomWord);

      if (
        translated &&
        translated !== correctTranslation.toLowerCase() &&
        !fakeOptions.includes(translated)
      ) {
        fakeOptions.push(translated);
      }
    }

    return fakeOptions;
  }

  // Fungsi untuk menghasilkan quiz untuk pengguna
  static async generateQuizForUser(userId, limit = 5) {
    // Ambil kata-kata yang belum pernah jadi quiz
    const existingQuizWords = await Quiz.find({ user_id: userId }).distinct(
      "word"
    );
    const userWords = await UserWord.find({
      user_id: userId,
      word: { $nin: existingQuizWords },
    }).limit(limit);

    if (userWords.length === 0) {
      throw new Error("Tidak ada kata baru untuk dijadikan quiz");
    }

    // Membuat quiz
    const quizzes = await Promise.all(
      userWords.map(async (userWord) => {
        const translated = userWord.translated_word;
        if (!translated || translated === "Terjemahan tidak tersedia") {
          throw new Error(
            `Kata "${userWord.word}" tidak memiliki terjemahan valid`
          );
        }

        const fakeTranslations =
          await this.getFakeOptionsFromTopicWithTranslation(
            userId,
            translated,
            userWord.topic,
            userWord.word
          );

        if (fakeTranslations.length < 3) {
          console.warn(
            `Fake options untuk kata "${userWord.word}" kurang dari 3. Diskip.`
          );
          return null;
        }

        const options = [translated, ...fakeTranslations].sort(
          () => Math.random() - 0.5
        );

        return {
          user_id: userId,
          word: userWord.word,
          translated_word: translated,
          options,
          correct_answer: translated,
        };
      })
    );

    // Filter quiz yang valid
    const filteredQuizzes = quizzes.filter(Boolean);
    return await Quiz.insertMany(filteredQuizzes);
  }

  // Fungsi untuk mendapatkan quiz yang tertunda
  static async getPendingQuiz(userId) {
    return await Quiz.find({ user_id: userId, status: "pending" }).limit(1); // Ambil satu soal kuis
  }
}

export default QuizService;
