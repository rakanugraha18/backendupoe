import mongoose from "mongoose";

const userTopicSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
  },
  { timestamps: true }
);

const UserTopic = mongoose.model("UserTopic", userTopicSchema);
export default UserTopic;
