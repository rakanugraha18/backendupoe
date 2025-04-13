import UserWord from "../models/userWord.model.js";

class UserWordService {
  static async saveUserWords(user_id, words) {
    const userWords = words.map((word) => ({
      user_id,
      word: word.word,
      translated_word: word.translated_word,
      example_sentence: word.example_sentence || null,
      system_word_id: word.system_word_id || null,
      status: "learning",
    }));

    return await UserWord.insertMany(userWords);
  }

  static async findByUserAndWord(user_id, word) {
    return await UserWord.findOne({ user_id, word });
  }

  static async createCustomWord({
    user_id,
    word,
    translated_word,
    example_sentence,
    translated_sentence,
  }) {
    const newWord = new UserWord({
      user_id,
      word,
      translated_word,
      example_sentence,
      translated_sentence,
      system_word_id: null,
      status: "learning",
    });

    return await newWord.save();
  }
}

export default UserWordService;
