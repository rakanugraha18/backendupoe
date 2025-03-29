import UserTopicService from "../services/userTopic.service.js";

class UserTopicController {
  static async selectTopics(req, res) {
    try {
      const { user_id, topics } = req.body;
      const userTopics = await UserTopicService.saveUserTopics(user_id, topics);
      res.json({ message: "Topics saved for user", user_topics: userTopics });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default UserTopicController;
