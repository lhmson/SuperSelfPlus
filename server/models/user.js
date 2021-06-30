import mongoose from "mongoose";

import { personalHabitSchema } from "./personalHabit.js";
import { userSettingAppSchema } from "./userSettingApp.js";
import { historyRunSchema } from "./historyRun.js";
import { historyRunItemSchema } from "./historyRunItem.js";
import { userInfoSchema } from "./userInfo.js";

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
      default:
        "https://firebasestorage.googleapis.com/v0/b/superselftest-d1ccf.appspot.com/o/defaultimg%2Fsuperself-icon.png?alt=media&token=3fceeba3-cdb8-4547-9cd9-d038fde6fdf1",
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
    userInfo: {
      type: userInfoSchema,
      default: {
        description:
          "I decide I was going to actively pursue a better life, and take better care of my mind, body and soul!",
      },
    },
    setting: {
      type: userSettingAppSchema,
    },
    role: {
      type: String,
      enum: ["Admin", "Premium", "Basic"],
      default: "Basic",
    },
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);

export default User;
