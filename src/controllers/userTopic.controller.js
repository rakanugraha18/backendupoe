import express from "express";
import UserTopic from "../models/userTopic.model.js";

const router = express.Router();

router.post("/select-topics", async (req, res) => {
  const { user_id, topics } = req.body;

  const userTopics = topics.map((topic_id) => ({ user_id, topic_id }));

  await UserTopic.insertMany(userTopics);

  res.json({ message: "Topics saved for user", user_topics: userTopics });
});

export default router;
