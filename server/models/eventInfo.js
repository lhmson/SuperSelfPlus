import mongoose from "mongoose";

export const eventInfoSchema = mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    //   default: "",
    // },
    listJoiners: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    dateStart: {
      type: Date,
    },
    dateEnd: {
      type: Date,
    },
    // kind: {
    //   type: String,
    //   enum: ["Habit", "Run"],
    //   default: "Habit",
    // },
  },
  { timestamps: true }
);
