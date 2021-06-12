import mongoose from "mongoose";

export const historyHabitSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      default: new Date(),
    },
    personalHabitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonalHabit",
    },
    progress: {
      // percent of completion
      type: Number,
      required: true,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

var HistoryHabit = mongoose.model("HistoryHabit", historyHabitSchema);

export default HistoryHabit;
