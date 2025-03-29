import UserWordService from "../services/userWord.service.js";

class UserWordController {
  static async selectWords(req, res) {
    try {
      const { user_id, words } = req.body;
      const userWords = await UserWordService.saveUserWords(user_id, words);

      res.json({ message: "Words saved for learning", user_words: userWords });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default UserWordController;
