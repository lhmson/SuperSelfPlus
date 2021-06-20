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
    imageUrl: {
      type: String,
      default:
        "https://i.pinimg.com/564x/98/5c/4b/985c4beecb162508e539f514ac0ff0cf.jpg",
    },
    // kind: {
    //   type: String,
    //   enum: ["Habit", "Run"],
    //   default: "Habit",
    // },
  },
  { timestamps: true }
);
