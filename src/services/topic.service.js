import Topic from "../models/topic.model.js";

class TopicService {
  async createTopic(topicData) {
    try {
      const topic = new Topic(topicData);
      return await topic.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllTopics() {
    try {
      return await Topic.find();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTopicById(topicId) {
    try {
      const topic = await Topic.findById(topicId);
      if (!topic) throw new Error("Topic not found");
      return topic;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateTopic(topicId, updateData) {
    try {
      const updatedTopic = await Topic.findByIdAndUpdate(topicId, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedTopic) throw new Error("Topic not found");
      return updatedTopic;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteTopic(topicId) {
    try {
      const deletedTopic = await Topic.findByIdAndDelete(topicId);
      if (!deletedTopic) throw new Error("Topic not found");
      return deletedTopic;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new TopicService();
