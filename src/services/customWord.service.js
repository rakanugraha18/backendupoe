import UserWord from "../models/userWord.model.js";

class CustomWordService {
  static async findByWord(user_id, word) {
    return await UserWord.findOne({ user_id, word });
  }

  static async addCustomWord({
    user_id,
    word,
    translated_word,
    example_sentence,
    translated_sentence,
  }) {
    const customWord = new UserWord({
      user_id,
      word,
      translated_word,
      example_sentence,
      translated_sentence,
    });

    await customWord.save();
    return customWord;
  }
}

export default CustomWordService;
