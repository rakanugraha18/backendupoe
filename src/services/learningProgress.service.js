import UserTopic from "../models/userTopic.model.js";
import UserWord from "../models/userWord.model.js";

class LearningProgressService {
  static async getUserLearningProgress(userId) {
    try {
      const userTopics = await UserTopic.find({ user_id: userId }).populate(
        "topic_id"
      );
      const userWords = await UserWord.find({ user_id: userId });

      return {
        selected_topics: userTopics.map((ut) => ut.topic_id),
        selected_words: userWords.map((uw) => ({
          word: uw.word,
          status: uw.status,
        })),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default LearningProgressService;
