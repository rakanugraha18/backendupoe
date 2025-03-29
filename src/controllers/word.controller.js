import WordService from "../services/word.service.js";

class WordController {
  static async getWordsByUser(req, res) {
    try {
      const { userId } = req.query;
      const words = await WordService.fetchWordsForUser(userId);

      if (!words.length) {
        return res.status(404).json({ message: "No topics selected" });
      }

      res.json({ user_id: userId, words });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default WordController;
