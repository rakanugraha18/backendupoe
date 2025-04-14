import CustomWordService from "../services/customWord.service.js";

class CustomWordController {
  static async addCustomWord(req, res) {
    try {
      const { word } = req.body;
      const userId = req.user.id;

      if (!word) {
        return res.status(400).json({ message: "Word is required" });
      }

      const savedWord = await CustomWordService.add(userId, word);

      return res.status(201).json({
        message: "Custom word added successfully",
        data: savedWord,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
}

export default CustomWordController;
