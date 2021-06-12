import Habit from "../models/habit.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import User from "../models/user.js";
import PersonalHabit from "../models/personalHabit.js";
import HistoryHabit from "../models/historyHabit.js";
import {
  getDateNoTime,
  getDatesBetweenTwoDays,
} from "../utils/aboutDateTime.js";

//#region CRUD
// GET habit/my/list
export const getMyHabits = async (req, res) => {
  try {
    const { userId } = req;

    try {
      // const user = await User.findById(userId).populate({
      //   path: "listPersonalHabits",
      //   model: "PersonalHabit",
      //   select: "reminder history joinDate isFinish score",
      //   populate: {
      // path: "habitId",
      // model: "Habit",
      // select:
      //   "title description color kind daysToDo icon target eventInfo",
      //   },
      // });
      // const habits = user.listPersonalHabits;
      const habits = await PersonalHabit.find({ userId }).populate({
        path: "habitId",
        model: "Habit",
        select: "title description color kind icon target eventInfo",
      });
      return res.status(httpStatusCodes.ok).json(habits);
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

// GET habit/:userId/list
export const getUserHabits = async (req, res) => {
  try {
    const { userId } = req.params;
    try {
      // const user = await User.findById(userId).populate({
      //   path: "listPersonalHabits",
      //   model: "PersonalHabit",
      //   select: "reminder history joinDate isFinish score",
      //   populate: {
      //     path: "habitId",
      //     model: "Habit",
      //     select:
      //       "title description color kind daysToDo icon target eventInfo",
      //   },
      // });
      // const habits = user.listPersonalHabits;
      const habits = await PersonalHabit.find({ userId }).populate({
        path: "habitId",
        model: "Habit",
        select: "title description color kind icon target eventInfo",
      });
      return res.status(httpStatusCodes.ok).json(habits);
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

// GET habit/my/:personalHabitId
export const getAHabitOfMe = async (req, res) => {
  const { personalHabitId } = req.params;

  try {
    const personalHabit = await PersonalHabit.findById(
      personalHabitId
    ).populate({
      path: "habitId",
      select: "title description color kind icon target eventInfo",
      model: "Habit",
    });

    if (!personalHabit) {
      return res
        .status(httpStatusCodes.notFound)
        .send(`There's no personal habit with id ${personalHabitId}`);
    }

    // const personalHabitObj = personalHabit.toObject();
    // console.log("personal obj", personalHabitObj);
    return res.status(httpStatusCodes.ok).json(personalHabit);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// GET habit/my/list/:date
export const getMyHabitsOfDate = async (req, res) => {
  const { userId } = req;
  const { dateStr } = req.params;
  const dateEle = dateStr.split("-");
  const date = new Date(
    parseInt(dateEle[0]),
    parseInt(dateEle[1]) - 1,
    parseInt(dateEle[2])
  );

  const rawDate = getDateNoTime(date);
  console.log(rawDate);

  // const items = await HistoryHabit.find({
  //   date: {
  //     $gte: new Date(date),
  //     $lt: new Date(date),
  //   },
  // });

  try {
    const items = await HistoryHabit.find({ date: rawDate, userId }).populate({
      path: "personalHabitId",
      model: "PersonalHabit",
      select: "reminder joinDate isFinish score",
      populate: {
        path: "habitId",
        model: "Habit",
        select: "title description color kind icon target eventInfo",
      },
    });
    res.status(httpStatusCodes.ok).json(items);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// POST habit
export const addHabit = async (req, res) => {
  const authorId = req.userId;
  const {
    title,
    description,
    color,
    kind,
    // daysToDo,
    icon,
    target,
    eventInfo,
    reminder,
  } = req.body;

  // new habit shouldn't have an _id in it
  if (req.body._id) {
    return res
      .status(httpStatusCodes.badContent)
      .json({ message: "New habit mustn't have _id field" });
  }

  const newHabit = new Habit({
    authorId,
    title,
    description,
    color,
    kind,
    // daysToDo,
    icon,
    target,
    eventInfo,
  });

  const newPersonalHabit = new PersonalHabit({
    reminder,
    habitId: newHabit._id,
    userId: authorId,
  });

  const dates = getDatesBetweenTwoDays(new Date(), new Date().addDays(21));
  // console.log(dates);

  for (let i = 0; i < 21; i++) {
    console.log(dates[i]);
    await HistoryHabit.create({
      personalHabitId: newPersonalHabit._id,
      userId: authorId,
      date: getDateNoTime(dates[i]),
    });
  }

  const result = newPersonalHabit.toObject();

  try {
    // const user = await User.findById(authorId);
    // user.listPersonalHabits.push(newPersonalHabit._id);
    // await user.save();
    await newHabit.save();
    await newPersonalHabit.save();
    res.status(httpStatusCodes.created).json(result);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// PUT habit/edit/:habitId
export const updateHabit = async (req, res) => {
  const { habitId } = req.params;
  const habit = req.body;
  try {
    if (!habit)
      return res
        .status(httpStatusCodes.badContent)
        .send(`Update habit information is required`);

    const foundHabit = await Habit.findById(habitId);

    if (!foundHabit)
      return res
        .status(httpStatusCodes.notFound)
        .send(`Cannot find a habit with id: ${habitId}`);

    if (!foundHabit.authorId.equals(req.userId)) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: "You are not the owner of this habit" });
    }

    const updatedHabit = {
      ...habit,
      _id: habitId,
    };

    console.log("update habit", updatedHabit);

    await Habit.findByIdAndUpdate(habitId, updatedHabit, { new: true });
    return res.status(httpStatusCodes.ok).json(updatedHabit);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// PUT habit/my/edit/:personalHabitId
export const updatePersonalHabit = async (req, res) => {
  const { personalHabitId } = req.params;
  const personalHabit = req.body;
  try {
    if (!personalHabit)
      return res
        .status(httpStatusCodes.badContent)
        .send(`Update habit information is required`);

    const foundPersonalHabit = await PersonalHabit.findById(personalHabitId);

    if (!foundPersonalHabit)
      return res
        .status(httpStatusCodes.notFound)
        .send(`Cannot find personal habit with id: ${personalHabitId}`);

    console.log(req.userId);

    if (!foundPersonalHabit.userId.equals(req.userId)) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: "You are not the user of this personal habit" });
    }

    const updatedHabit = {
      ...personalHabit,
      _id: personalHabitId,
    };

    console.log("update personal", updatedHabit);

    await PersonalHabit.findByIdAndUpdate(personalHabitId, updatedHabit, {
      new: true,
    });
    return res.status(httpStatusCodes.ok).json(updatedHabit);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// DELETE habit/:habitId
export const deleteHabit = async (req, res) => {
  const { habitId } = req.params;
  const { userId } = req;

  try {
    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res
        .status(httpStatusCodes.notFound)
        .send(`No habit with id: ${habitId}`);
    }

    if (habit.eventInfo) {
      return res
        .status(httpStatusCodes.forbidden)
        .json({ message: "Cannot delete habit with event" });
    }

    if (!userId || !habit.authorId.equals(userId)) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: `You don't have permission to delete this habit` });
    }

    await Habit.findByIdAndRemove(habitId);
    await PersonalHabit.findOneAndRemove({ habitId });
    res
      .status(httpStatusCodes.ok)
      .json({ message: "Habit delete successfully." });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

//#endregion
