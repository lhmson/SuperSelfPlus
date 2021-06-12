import mongoose from "mongoose";

const achievementSchema = mongoose.Schema(
  {
    nameAchievement: {
      type: String,
      default: "",
    },

    urlIcon: {
      type: String,
      default: "",
    },
    kind: {
      type: String,
      enum: ["Run", "Habit"],
      default: "Habit",
    },
  },
  {
    timestamps: true,
  }
);

var Achievement = mongoose.model("Achievement", achievementSchema);

export default Achievement;
