import UserWordService from "../services/userWord.service.js";
import { generateExampleWithTranslationAI } from "../utils/ai.helper.js";
import WordService from "../services/word.service.js"; // Untuk cek apakah kata sudah ada di database

class CustomWordController {
  static async addCustomWord(req, res) {
    try {
      const { word } = req.body;
      const userId = req.user.id; // Asumsikan kamu sudah set user di req (auth)

      // Cek apakah kata sudah ada di database UserWord
      const existingUserWord = await UserWordService.findByUserAndWord(
        userId,
        word
      );
      if (existingUserWord) {
        return res.status(400).json({ message: "Word already added." });
      }

      // Cek apakah kata sudah ada di database sistem (Word collection)
      const existingSystemWord = await WordService.findByWord(word);
      let translatedWord, exampleSentence, translatedSentence;

      if (existingSystemWord) {
        // Jika ada di database sistem, ambil terjemahan dan contoh kalimat dari sistem
        translatedWord = existingSystemWord.translation;
        exampleSentence = existingSystemWord.example_sentence;
        translatedSentence = existingSystemWord.translated_sentence || ""; // kasih default
      } else {
        // Jika kata belum ada, minta AI untuk translate dan buat contoh kalimat
        const {
          translated_word: aiTranslatedWord,
          example_sentence: aiExampleSentence,
          translated_sentence: aiTranslatedSentence,
        } = await generateExampleWithTranslationAI(word);

        translatedWord = aiTranslatedWord;
        exampleSentence = aiExampleSentence;
        translatedSentence = aiTranslatedSentence;
      }

      // Simpan ke database UserWord
      await UserWordService.createCustomWord({
        user_id: userId,
        word,
        translated_word: translatedWord,
        example_sentence: exampleSentence,
        translated_sentence: translatedSentence,
      });

      return res.status(201).json({
        message: "Custom word added successfully",
        data: {
          word,
          translated_word: translatedWord,
          example_sentence: exampleSentence,
          translated_sentence: translatedSentence,
        },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
}

export default CustomWordController;
