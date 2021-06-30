import mongoose from "mongoose";

export const userInfoSchema = mongoose.Schema(
  {
    description: {
      type: String,
      default:
        "I decide I was going to actively pursue a better life, and take better care of my mind, body and soul!",
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }
);
