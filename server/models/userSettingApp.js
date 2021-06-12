import mongoose from "mongoose";

export const userSettingAppSchema = mongoose.Schema(
  {
    theme: {
      type: String,
      enum: ["Light", "Dark"],
      default: "Light",
    },
    language: {
      type: String,
      enum: ["VN", "EN"],
      default: "EN",
    },
    isSound: {
      type: Boolean,
      default: true,
    },
    isNotification: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
