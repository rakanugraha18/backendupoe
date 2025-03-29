import userWord from "../models/userWord.model.js";

class UserWordService {
  static async saveUserWords(user_id, words) {
    const userWords = words.map((word) => ({
      user_id,
      word,
      status: "learning",
    }));

    return await userWord.insertMany(userWords);
  }
}

export default UserWordService;
