import mongoose from "mongoose";

import { historyRunItemSchema } from "./historyRunItem.js";

export const historyRunSchema = mongoose.Schema(
  {
    lastDateRun: {
      type: Date,
      default: new Date(),
    },
    firstDateRun: {
      type: Date,
      default: new Date(),
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
