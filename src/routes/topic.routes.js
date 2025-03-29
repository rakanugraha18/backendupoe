import express from "express";
import TopicController from "../controllers/topic.controller.js";

const router = express.Router();

router.post("/topics", TopicController.createTopic);
router.get("/topics", TopicController.getAllTopics);

export default router;
