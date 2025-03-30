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
    status: {
      type: String,
      enum: ["learning", "learned"],
      default: "learning",
    },
  },
  { timestamps: true }
);

const UserWord = mongoose.model("UserWord", UserWordSchema);
export default UserWord;
