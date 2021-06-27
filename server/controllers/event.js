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
import { createListHistoryHabits } from "../businessLogic/habit.js";

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
        const habit = await Habit.findById(item.habitId);
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

export const joinEvent = async (req, res) => {
  const { habitId } = req.params;
  const { userId } = req;
  try {
    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res
        .status(httpStatusCodes.notFound)
        .send(`There's no habit with id ${habitId}`);
    }

    const event = habit.eventInfo;
    if (!event) {
      res.status(httpStatusCodes.notFound).send(`This habit has no event`);
    }

    if (event.listJoiners.includes(userId)) {
      res.status(httpStatusCodes.badContent).send(`User has joined this event`);
    }
    habit.eventInfo.listJoiners.push(userId);
    await habit.save();

    //TODO: create new list historyHabit and new personalHabit
    const newPersonalHabit = new PersonalHabit({
      reminder: new Date(),
      habitId: newHabit._id,
      userId: authorId,
    });

    await createListHistoryHabits(21, newPersonalHabit._id, userId);

    const result = newPersonalHabit.toObject();
    await newPersonalHabit.save();
    res.status(httpStatusCodes.created).json(result);

    return res.status(httpStatusCodes.accepted).json(habit);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
