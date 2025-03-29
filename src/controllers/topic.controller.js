import TopicService from "../services/topic.service.js";

class TopicController {
  static async createTopic(req, res) {
    try {
      const { name, description } = req.body;
      const topic = await TopicService.createTopic(name, description);
      res.status(201).json(topic);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllTopics(req, res) {
    try {
      const topics = await TopicService.getAllTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default TopicController;
