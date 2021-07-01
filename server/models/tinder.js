import mongoose from "mongoose";

const tinderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      required: true,
      default: "#89E219",
    },
    hashtag: {
      type: String,
      default: "Find friends",
    },
    isDisplay: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

var Tinder = mongoose.model("Tinder", tinderSchema);

export default Tinder;
