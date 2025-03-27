import Word from "../models/word.model.js";

class WordService {
  async createWord(wordData) {
    try {
      const word = new Word(wordData);
      return await word.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllWords() {
    try {
      return await Word.find().populate("topic");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getWordById(wordId) {
    try {
      const word = await Word.findById(wordId).populate("topic");
      if (!word) throw new Error("Word not found");
      return word;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateWord(wordId, updateData) {
    try {
      const updatedWord = await Word.findByIdAndUpdate(wordId, updateData, {
        new: true,
        runValidators: true,
      }).populate("topic");
      if (!updatedWord) throw new Error("Word not found");
      return updatedWord;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteWord(wordId) {
    try {
      const deletedWord = await Word.findByIdAndDelete(wordId);
      if (!deletedWord) throw new Error("Word not found");
      return deletedWord;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new WordService();
