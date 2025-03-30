import UserWord from "../models/userWord.model.js";

class UserWordService {
  static async saveUserWords(user_id, words) {
    const userWords = words.map((word) => ({
      user_id,
      word: word.word,
      translated_word: word.translated_word,
      status: "learning",
    }));

    return await UserWord.insertMany(userWords);
  }
}

export default UserWordService;
