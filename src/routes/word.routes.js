import express from "express";
import WordController from "../controllers/word.controller.js";

const router = express.Router();

router.get("/words", WordController.getWordsByUser);

export default router;
