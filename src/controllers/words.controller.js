import express from "express";
import axios from "axios";
import UserTopic from "../models/userTopic.model.js";
import Topic from "../models/topic.model.js";

const router = express.Router();

router.get("/words", async (req, res) => {
  const { userId } = req.query;

  const userTopics = await UserTopic.find({ user_id: userId }).populate(
    "topic_id"
  );

  if (!userTopics.length)
    return res.status(404).json({ message: "No topics selected" });

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

  res.json({ user_id: userId, words: allWords });
});

export default router;
