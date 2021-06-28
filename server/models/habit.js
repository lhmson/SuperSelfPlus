import mongoose from "mongoose";

import { eventInfoSchema } from "./eventInfo.js";

const habitSchema = mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      // has tag list like instagram, serve recommend, trending with data analysis for later
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#fff",
    },
    kind: {
      type: String,
      enum: ["Do", "Do not", "Run"],
      default: "Do",
    },
    theme: {
      type: String,
    },
    // daysToDo: {
    //   type: [
    //     {
    //       // weekdays to do it
    //       type: Boolean,
    //     },
    //   ],
    //   default: new Array(7).fill(true),
    //   require: true,
    // },
    icon: {
      // icon from list of icons
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/superselftest-d1ccf.appspot.com/o/defaultimg%2Fsuperself-icon.png?alt=media&token=3fceeba3-cdb8-4547-9cd9-d038fde6fdf1",
    },
    target: {
      type: mongoose.Schema.Types.Mixed,
    },
    eventInfo: {
      type: eventInfoSchema,
    },
  },
  { timestamps: true }
);

var Habit = mongoose.model("Habit", habitSchema);

export default Habit;
