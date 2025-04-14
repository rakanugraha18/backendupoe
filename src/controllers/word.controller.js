import WordService from "../services/word.service.js";

class WordController {
  static async getWordsByUser(req, res) {
    try {
      const { userId } = req.query;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;

      if (!userId) {
        return res
          .status(400)
          .json({ success: false, message: "User ID is required" });
      }

      const words = await WordService.fetchWordsForUser(userId, page, limit);

      res.json({ success: true, words });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching words",
        error: error.message,
      });
    }
  }
}

export default WordController;
