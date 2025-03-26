import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    oauthProvider: {
      type: String,
      enum: ["google", "facebook", null],
    },
    oauthId: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true },
    username: { type: String, unique: true, sparse: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String },
    avatar: { type: String },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    selected_topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
    daily_words: [{ type: mongoose.Schema.Types.ObjectId, ref: "Word" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
