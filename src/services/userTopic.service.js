import UserTopic from "../models/userTopic.model.js";

class UserTopicService {
  static async saveUserTopics(user_id, topics) {
    const userTopics = topics.map((topic_id) => ({ user_id, topic_id }));
    return await UserTopic.insertMany(userTopics);
  }
}

export default UserTopicService;
