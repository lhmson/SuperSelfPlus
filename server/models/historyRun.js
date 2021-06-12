import mongoose from "mongoose";

import { historyRunItemSchema } from "./historyRunItem";

const historyRunSchema = mongoose.Schema(
  {
    lastDateRun: {
      type: Date,
      default: Date.now(),
    },
    firstDateRun: {
      type: Date,
      default: Date.now(),
    },
    listDataRun: {
      type: [
        {
          type: historyRunItemSchema,
        },
      ],
      default: [],
    },
    scoreRunWeek: {
      type: Number,
      default: 0,
    },
    scoreRunMonth: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

var HistoryRun = mongoose.model("HistoryRun", historyRunSchema);

export default HistoryRun;
