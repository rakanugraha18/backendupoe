import express from "express";
import TopicController from "../controllers/topic.controller.js";

const router = express.Router();

router.post("/", TopicController.createTopic);
router.get("/", TopicController.getAllTopics);
router.get("/:id", TopicController.getTopicById);
router.put("/:id", TopicController.updateTopic);
router.delete("/:id", TopicController.deleteTopic);

export default router;
