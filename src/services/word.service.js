import axios from "axios";
import UserTopic from "../models/userTopic.model.js";
import UserWord from "../models/userWord.model.js";
import Word from "../models/word.model.js";

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

    let allWords = [];

    // Ambil semua kata yang sudah dipilih user dari database
    const existingWords = await UserWord.find({ user_id: userId }).select(
      "word"
    );
    const existingWordList = existingWords.map((w) => w.word);

    for (const userTopic of userTopics) {
      const topic = userTopic.topic_id;

      const response = await axios.get(
        `https://api.datamuse.com/words?ml=${topic.name}&topics=${topic.name}&max=100`
      );

      const words = response.data.map((w) => w.word);

      // **Filter kata yang belum ada di database**
      const newWords = words.filter((word) => !existingWordList.includes(word));

      allWords.push(...newWords);
    }

    // **Pagination Manual**
    const startIndex = (page - 1) * limit;
    const paginatedWords = allWords.slice(startIndex, startIndex + limit);

    const translationPromises = paginatedWords.map(async (word) => {
      try {
        const encodedWord = encodeURIComponent(word);
        const response = await axios.get(
          `https://api.mymemory.translated.net/get?q=${encodedWord}&langpair=en|id`
        );

        return {
          word,
          translated_word:
            response.data.responseData.translatedText ||
            "Terjemahan tidak tersedia",
        };
      } catch (error) {
        console.error(`Error translating ${word}:`, error.message);
        return {
          word,
          translated_word: "Terjemahan tidak tersedia",
        };
      }
    });

    const formattedWords = await Promise.all(translationPromises);

    return formattedWords;
  }
}

export default WordService;
