import express from "express";
import WordController from "../controllers/word.controller.js";

const router = express.Router();

router.post("/", WordController.createWord);
router.get("/", WordController.getAllWords);
router.get("/:id", WordController.getWordById);
router.put("/:id", WordController.updateWord);
router.delete("/:id", WordController.deleteWord);

export default router;
