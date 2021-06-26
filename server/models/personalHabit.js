import mongoose from "mongoose";

export const personalHabitSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reminder: {
      // time for notifications, handle convert
      // consider list of many
      type: Date,
    },
    // history: {
    //   type: [habitProgressSchema],
    //   default: [],
    // },
    joinDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    isFinish: {
      type: Boolean,
      default: false,
    },
    score: {
      type: Number,
      default: 0,
    },
    // longestStreak: {
    //   type: Number,
    //   default: 0,
    // },
    habitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },
  },
  { timestamps: true }
);

var PersonalHabit = mongoose.model("PersonalHabit", personalHabitSchema);

export default PersonalHabit;
