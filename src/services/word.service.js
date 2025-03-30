import axios from "axios";
import UserTopic from "../models/userTopic.model.js";
import UserWord from "../models/userWord.model.js";

class WordService {
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

    let formattedWords = [];

    for (const word of paginatedWords) {
      try {
        // Encode kata sebelum dikirim ke API
        const encodedWord = encodeURIComponent(word);
        const translationResponse = await axios.get(
          `https://api.mymemory.translated.net/get?q=${encodedWord}&langpair=en|id`
        );

        const translatedWord =
          translationResponse.data.responseData.translatedText;

        formattedWords.push({
          word,
          translated_word: translatedWord || "Terjemahan tidak tersedia",
        });
      } catch (error) {
        console.error(`Error translating ${word}:`, error.message);
        formattedWords.push({
          word,
          translated_word: "Terjemahan tidak tersedia",
        });
      }
    }

    return formattedWords;
  }
}

export default WordService;
