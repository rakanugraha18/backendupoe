import mongoose from "mongoose";

const wordSchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    translation: { type: String, required: true },
    example_sentence: { type: String },
    translated_sentence: { type: String },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: false,
    },
  },
  { timestamps: true }
);
// index unique untuk memastikan tidak akan ada dua entri yang memiliki kata & topik yang sama.
wordSchema.index({ word: 1, topic: 1 }, { unique: true });

const Word = mongoose.model("Word", wordSchema);
export default Word;
