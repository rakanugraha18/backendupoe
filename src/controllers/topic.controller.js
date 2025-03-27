import TopicService from "../services/topic.service.js";

class TopicController {
  async createTopic(req, res) {
    try {
      const newTopic = await TopicService.createTopic(req.body);
      res
        .status(201)
        .json({ message: "Topic created successfully", data: newTopic });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllTopics(req, res) {
    try {
      const topics = await TopicService.getAllTopics();
      res.status(200).json({ data: topics });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTopicById(req, res) {
    try {
      const topic = await TopicService.getTopicById(req.params.id);
      res.status(200).json({ data: topic });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateTopic(req, res) {
    try {
      const updatedTopic = await TopicService.updateTopic(
        req.params.id,
        req.body
      );
      res
        .status(200)
        .json({ message: "Topic updated successfully", data: updatedTopic });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteTopic(req, res) {
    try {
      await TopicService.deleteTopic(req.params.id);
      res.status(200).json({ message: "Topic deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new TopicController();
