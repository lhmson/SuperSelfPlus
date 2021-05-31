import mongoose from "mongoose";
import { runDataDaySchema } from "./runDataDay.js";

const runDataSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastDateUpdate: { type: Date },
    listData30Days: [
      {
        type: runDataDaySchema,
      },
    ],
  },
  { timestamps: true }
);

var RunData = mongoose.model("RunData", runDataSchema);

export default RunData;
