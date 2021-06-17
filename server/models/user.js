import mongoose from "mongoose";

import { personalHabitSchema } from "./personalHabit.js";
import { userSettingAppSchema } from "./userSettingApp.js";
import { historyRunSchema } from "./historyRun.js";
import { historyRunItemSchema } from "./historyRunItem.js";

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
    historyRun: {
      type: historyRunSchema,
    },
    listFriends: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    listSavePosts: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
      default: [],
    },
    listAchievements: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Achievement",
        },
      ],
      default: [],
    },
    setting: {
      type: userSettingAppSchema,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
    },
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);

export default User;
