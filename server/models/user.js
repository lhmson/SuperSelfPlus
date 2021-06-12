import mongoose from "mongoose";

import { personalHabitSchema } from "./personalHabit.js";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      default: "Anonymous",
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    // newUser: {
    //   // define new user for guide, badge
    //   type: Boolean,
    //   default: true,
    // },
    // listPersonalHabits: {
    //   type: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "PersonalHabit",
    //     },
    //   ],
    //   default: [],
    // },
    listAchievements: {
      // list of
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);

export default User;
