import Topic from "../models/topic.model.js";

class TopicService {
  static async createTopic(name, description) {
    const topic = new Topic({ name, description });
    return await topic.save();
  }

  static async getAllTopics() {
    return await Topic.find();
  }
}

export default TopicService;
