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
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
