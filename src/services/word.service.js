// import axios from "axios";
import UserTopic from "../models/userTopic.model.js";
import UserWord from "../models/userWord.model.js";
import Word from "../models/word.model.js";
import {
  generateWordsByTopicAI,
  generateExampleWithTranslationAI,
} from "../utils/ai.helper.js";
import { validateWordData } from "../utils/validation.helper.js";

class WordService {
  static async findByWord(word) {
    try {
      return await Word.findOne({ word }); // Mencari kata berdasarkan nama
    } catch (error) {
      console.error("Error in findByWord:", error);
      throw new Error("Error while finding word");
    }
  }

  // Metode lain di WordService
  static async createWord(wordData) {
    const newWord = new Word(wordData);
    return await newWord.save();
  }

  static async fetchWordsForUser(userId, page = 1, limit = 5) {
    const userTopics = await UserTopic.find({ user_id: userId }).populate(
      "topic_id"
    );
    if (!userTopics.length) return [];

    // Ambil semua kata yang sudah dimiliki user
    const existingWords = await UserWord.find({ user_id: userId }).select(
      "word"
    );
    const existingWordList = existingWords.map((w) => w.word.toLowerCase());

    let allNewWords = [];

    for (const userTopic of userTopics) {
      const topic = userTopic.topic_id;
      const topicId = topic._id;

      // Cek apakah sudah ada kata untuk topik ini di DB Word
      let cachedWords = await Word.find({ topic: topicId });

      // Kalau belum ada, generate pakai AI dan simpan ke DB
      if (!cachedWords.length) {
        const aiWords = await generateWordsByTopicAI(topic.name, 15);

        for (const item of aiWords) {
          // Cek dan lengkapi jika data belum ada
          let example_sentence = item.example_sentence;
          let translated_sentence = item.translated_sentence;
          let translated_word = item.translated_word;

          if (!example_sentence || !translated_sentence) {
            const example = await generateExampleWithTranslationAI(item.word);
            example_sentence = example.example_sentence;
            translated_sentence = example.translated_sentence;
            translated_word = example.translated_word;
          }

          const newWord = new Word({
            word: item.word,
            translation: translated_word,
            example_sentence,
            translated_sentence,
            topic: topicId,
          });

          // Validasi kata
          validateWordData(newWord);

          await newWord.save();
          cachedWords.push(newWord);
        }
      }

      // Filter kata yang belum dimiliki user
      const filtered = cachedWords.filter(
        (item) => !existingWordList.includes(item.word.toLowerCase())
      );

      allNewWords.push(...filtered);
    }

    // Pagination manual
    const startIndex = (page - 1) * limit;
    const paginatedWords = allNewWords.slice(startIndex, startIndex + limit);

    return paginatedWords.map((item) => ({
      word: item.word,
      translated_word: item.translation,
      example_sentence: item.example_sentence,
      translated_sentence: item.translated_sentence,
    }));
  }

  // static async fetchWordsForUser(userId, page = 1, limit = 5) {
  //   const userTopics = await UserTopic.find({ user_id: userId }).populate(
  //     "topic_id"
  //   );

  //   if (!userTopics.length) return [];

  //   let allWords = [];

  //   // Ambil semua kata yang sudah dipilih user dari database
  //   const existingWords = await UserWord.find({ user_id: userId }).select(
  //     "word"
  //   );
  //   const existingWordList = existingWords.map((w) => w.word);

  //   for (const userTopic of userTopics) {
  //     const topic = userTopic.topic_id;

  //     const response = await axios.get(
  //       `https://api.datamuse.com/words?ml=${topic.name}&topics=${topic.name}&max=100`
  //     );

  //     const words = response.data.map((w) => w.word);

  //     // **Filter kata yang belum ada di database**
  //     const newWords = words.filter((word) => !existingWordList.includes(word));

  //     allWords.push(...newWords);
  //   }

  //   // **Pagination Manual**
  //   const startIndex = (page - 1) * limit;
  //   const paginatedWords = allWords.slice(startIndex, startIndex + limit);

  //   const translationPromises = paginatedWords.map(async (word) => {
  //     try {
  //       const encodedWord = encodeURIComponent(word);
  //       const response = await axios.get(
  //         `https://api.mymemory.translated.net/get?q=${encodedWord}&langpair=en|id`
  //       );

  //       return {
  //         word,
  //         translated_word:
  //           response.data.responseData.translatedText ||
  //           "Terjemahan tidak tersedia",
  //       };
  //     } catch (error) {
  //       console.error(`Error translating ${word}:`, error.message);
  //       return {
  //         word,
  //         translated_word: "Terjemahan tidak tersedia",
  //       };
  //     }
  //   });

  //   const formattedWords = await Promise.all(translationPromises);

  //   return formattedWords;
  // }
}

export default WordService;
