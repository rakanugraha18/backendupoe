import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  word: { type: String, required: true },
  translated_word: { type: String, required: true },
  options: [{ type: String, required: true }], // Pilihan ganda
  correct_answer: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" }, // Status quiz
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Quiz", quizSchema);
