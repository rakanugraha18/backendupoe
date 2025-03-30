import UserWordService from "../services/userWord.service.js";

class UserWordController {
  static async selectWords(req, res) {
    try {
      const { user_id, words } = req.body;

      if (!user_id || !words.length) {
        return res
          .status(400)
          .json({ success: false, message: "User ID and words are required" });
      }

      const savedWords = await UserWordService.saveUserWords(user_id, words);

      res.json({
        success: true,
        message: "Words saved for learning",
        data: savedWords,
      });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Error saving words",
          error: error.message,
        });
    }
  }
}

export default UserWordController;
