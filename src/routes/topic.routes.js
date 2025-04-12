import express from "express";
import TopicController from "../controllers/topic.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/topics",
  AuthMiddleware.isAuthenticated,
  TopicController.createTopic
);
router.get("/topics", TopicController.getAllTopics);

export default router;
