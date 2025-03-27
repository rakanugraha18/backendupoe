import WordService from "../services/word.service.js";

class WordController {
  async createWord(req, res) {
    try {
      const newWord = await WordService.createWord(req.body);
      res
        .status(201)
        .json({ message: "Word created successfully", data: newWord });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllWords(req, res) {
    try {
      const words = await WordService.getAllWords();
      res.status(200).json({ data: words });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getWordById(req, res) {
    try {
      const word = await WordService.getWordById(req.params.id);
      res.status(200).json({ data: word });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateWord(req, res) {
    try {
      const updatedWord = await WordService.updateWord(req.params.id, req.body);
      res
        .status(200)
        .json({ message: "Word updated successfully", data: updatedWord });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteWord(req, res) {
    try {
      await WordService.deleteWord(req.params.id);
      res.status(200).json({ message: "Word deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new WordController();
