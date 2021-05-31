import mongoose from "mongoose";

const habitSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      // has tag list like instagram, serve recommend, trending with data analysis for later
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    daysToRemind: {
      type: [
        {
          // weekdays to do it, have option to pick all
          type: String,
        },
      ],
      default: [],
      // require:true,
    },
    target: {
      // number of times to do it, -1 for unknown
      type: Number,
      // required: true,
    },
    // streak: {
    //   type: Number,
    //   default: 0,
    // },
    datesChecked: {
      type: [Date],
      default: [],
    },
    reminder: {
      // time for notifications, handle convert
      // consider list of many
      type: Date,
    },
    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly"],
      // required: true,
    },
    icon: {
      // icon from list of icons
      type: String,
    },
  },
  { timestamps: true }
);

var Habit = mongoose.model("Habit", habitSchema);

export default Habit;
