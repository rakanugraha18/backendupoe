import mongoose from "mongoose";

const wordSchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    translation: { type: String, required: true },
    example_sentence: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
  },
  { timestamps: true }
);

const Word = mongoose.model("Word", wordSchema);
export default Word;
