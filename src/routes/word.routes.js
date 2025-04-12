import express from "express";
import WordController from "../controllers/word.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/words",
  AuthMiddleware.isAuthenticated,
  WordController.getWordsByUser
);

export default router;
