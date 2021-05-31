import mongoose from "mongoose";

export const runDataDaySchema = mongoose.Schema(
  {
    date: { type: Date, required: true },
    steps: { type: Number, required: true },
  },
  { timestamps: true }
);
