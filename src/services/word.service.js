import axios from "axios";
import UserTopic from "../models/userTopic.model.js";

class WordService {
  static async fetchWordsForUser(userId) {
    const userTopics = await UserTopic.find({ user_id: userId }).populate(
      "topic_id"
    );

    if (!userTopics.length) return [];

    let allWords = [];

    for (const userTopic of userTopics) {
      const topic = userTopic.topic_id;
      const response = await axios.get(
        `https://api.datamuse.com/words?ml=${topic.name}&topics=${topic.name}`
      );

      const words = response.data.map((w) => ({
        word: w.word,
        meaning: "Meaning not available",
      }));

      allWords.push(...words);
    }

    return allWords;
  }
}

export default WordService;
