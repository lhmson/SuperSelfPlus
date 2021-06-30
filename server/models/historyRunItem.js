import mongoose from "mongoose";

export const historyRunItemSchema = mongoose.Schema(
  {
    dateRun: {
      type: Date,
      default: new Date(),
    },
    totalSteps: {
      type: Number,
      default: 0,
    },
    totalDistance: {
      type: Number,
      default: 0,
    },
    averageSpeed: {
      type: Number,
      default: 0,
    },
    totalScore: {
      type: Number,
      default: 0,
    },
    totalCalo: {
      type: Number,
      default: 0,
    },
    totalTime: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
