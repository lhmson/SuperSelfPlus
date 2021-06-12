import mongoose from "mongoose";

const friendRequestSchema = mongoose.Schema(
  {
    userSendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userConfirmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dateRequest: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

var FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

export default FriendRequest;
