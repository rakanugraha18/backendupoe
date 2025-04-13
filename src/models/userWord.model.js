import mongoose from "mongoose";

const UserWordSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    word: { type: String, required: true },
    translated_word: { type: String, required: true },
    example_sentence: { type: String },
    translated_sentence: { type: String }, // ✅ tambahkan ini
    status: {
      type: String,
      enum: ["learning", "learned"],
      default: "learning",
    },
    system_word_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Word",
      default: null,
    },
  },
  { timestamps: true }
);

const UserWord = mongoose.model("UserWord", UserWordSchema);
export default UserWord;
