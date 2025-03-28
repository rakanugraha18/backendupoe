import express from "express";
import UserWord from "../models/userWord.model.js";

const router = express.Router();

router.post("/select-words", async (req, res) => {
  const { user_id, words } = req.body;

  const userWords = words.map((word) => ({
    user_id,
    word,
    status: "learning",
  }));

  await UserWord.insertMany(userWords);

  res.json({ message: "Words saved for learning", user_words: userWords });
});

export default router;
