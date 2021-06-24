import Habit from "../models/habit.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import User from "../models/user.js";
import PersonalHabit from "../models/personalHabit.js";
import HistoryHabit from "../models/historyHabit.js";
import {
  getDateNoTime,
  getDatesBetweenTwoDays,
  getHourAndMinute,
} from "../utils/aboutDateTime.js";

//#region CRUD
// GET event/list/all
export const getAllEvents = async (req, res) => {
  try {
    const { userId } = req;

    //TODO: consider if event finish
    try {
      const events = await Habit.find({
        eventInfo: { $exists: true, $ne: null },
      }).sort({ createdAt: -1 });
      return res.status(httpStatusCodes.ok).json(events);
    } catch (error) {
      return res
        .status(httpStatusCodes.notFound)
        .json({ message: error.message });
    }
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// GET event/my/list
export const getMyEvents = async (req, res) => {
  try {
    const { userId } = req;
    let myEvents = [];
    try {
      const personalHabits = await PersonalHabit.find({ userId });
      for (let item of personalHabits) {
        const habit = await Habit.findOne({ _id: item.habitId });
        if (habit?.eventInfo) {
          myEvents.push(habit);
        }
      }
      myEvents.sort(function (a, b) {
        return b - a;
      });
      // console.log("event", myEvents);
      return res.status(httpStatusCodes.ok).json(myEvents);
    } catch (error) {
      return res
        .status(httpStatusCodes.notFound)
        .json({ message: error.message });
    }
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const joinEvent = (req, res) => {
  //TODO: implement join event
};

//#endregion
