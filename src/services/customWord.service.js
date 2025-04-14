import UserWordService from "./userWord.service.js";
import Word from "../models/word.model.js";
import { generateExampleWithTranslationAI } from "../utils/ai.helper.js";
import { validateWordData } from "../utils/validation.helper.js";

class CustomWordService {
  static async add(userId, word) {
    // Cek apakah user sudah pernah menambahkan kata ini
    const existingUserWord = await UserWordService.findByUserAndWord(
      userId,
      word
    );
    if (existingUserWord) {
      throw new Error("Word already added.");
    }

    // Cek apakah kata sudah ada di database global Word
    let systemWord = await Word.findOne({ word: word.toLowerCase() });

    if (!systemWord) {
      // Kalau belum ada, generate dari AI
      const { translated_word, example_sentence, translated_sentence } =
        await generateExampleWithTranslationAI(word);

      // Simpan juga ke koleksi Word dengan topik default (misalnya "Custom")
      const customTopicId = process.env.CUSTOM_TOPIC_ID; // ← pastikan ID ini ada di .env
      systemWord = await Word.create({
        word: word.toLowerCase(),
        translation: translated_word,
        example_sentence,
        translated_sentence,
        topic: customTopicId,
      });
    }

    // Simpan ke UserWord
    const savedUserWord = await UserWordService.createCustomWord({
      user_id: userId,
      word: systemWord.word,
      translated_word: systemWord.translation,
      example_sentence: systemWord.example_sentence,
      translated_sentence: systemWord.translated_sentence,
    });

    return savedUserWord;
  }
}

export default CustomWordService;
