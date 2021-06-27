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
import {
  countStreak,
  countDaysOfHabit,
  createListHistoryHabits,
} from "../businessLogic/habit.js";

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
        select: "title description color kind icon target eventInfo authorId",
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
        select: "title description color kind icon target eventInfo authorId",
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

// GET habit/my/:habitId
export const getAHabitOfMe = async (req, res) => {
  const { habitId } = req.params;

  try {
    const personalHabit = await PersonalHabit.findOne({ habitId }).populate({
      path: "habitId",
      select: "title description color kind icon target eventInfo authorId",
      model: "Habit",
    });

    if (!personalHabit) {
      return res
        .status(httpStatusCodes.notFound)
        .send(`There's no personal habit with id ${personalHabitId}`);
    }

    if (!personalHabit.userId.equals(req.userId)) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: "You are not the user of this personal habit" });
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
  // console.log(rawDate);

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
      select: "reminder joinDate isFinish score userId",
      populate: {
        path: "habitId",
        model: "Habit",
        select: "title description color kind icon target eventInfo authorId",
      },
    });
    res.status(httpStatusCodes.ok).json(items);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// GET habit/my/:personalHabitId/progress
export const getMyHabitProgress = async (req, res) => {
  const { personalHabitId } = req.params;
  try {
    const historyHabits = await HistoryHabit.find({ personalHabitId });
    if (!historyHabits) {
      res.status(httpStatusCodes.notFound).json({ message: error.message });
    }
    let completedItems = [];
    for (let elem of historyHabits) {
      const { completed } = elem;
      if (completed) {
        completedItems.push(elem);
      }
    }

    const numberOfDates = await countDaysOfHabit(personalHabitId);

    const streak = await countStreak(personalHabitId); // current and longest

    const result = {
      listProgress: historyHabits,
      completedItems,
      numberOfDates,
      streak,
    };
    return res.status(httpStatusCodes.accepted).json(result);
  } catch (error) {
    return res
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

  await createListHistoryHabits(21, newPersonalHabit._id, authorId);

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

// PUT habit/my/edit/:personalHabitId
export const updateMyHabit = async (req, res) => {
  const { personalHabitId } = req.params;
  const sentInfo = req.body;
  const {
    title,
    description,
    color,
    kind,
    // daysToDo,
    icon,
    target,
    // eventInfo,
    reminder,
  } = sentInfo;
  try {
    if (!sentInfo)
      return res
        .status(httpStatusCodes.badContent)
        .send(`Update habit information is required`);

    const foundPersonalHabit = await PersonalHabit.findById(personalHabitId);

    if (!foundPersonalHabit)
      return res
        .status(httpStatusCodes.notFound)
        .send(`Cannot find personal habit with id: ${personalHabitId}`);

    if (!foundPersonalHabit.userId.equals(req.userId)) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: "You are not the user of this personal habit" });
    }

    const relativeHabit = await Habit.findById(foundPersonalHabit.habitId);

    if (!relativeHabit)
      return res
        .status(httpStatusCodes.notFound)
        .send(`Cannot find a habit with id: ${foundPersonalHabit.habitId}`);

    // you are owner of habit
    if (relativeHabit.authorId.equals(req.userId)) {
      const updatedHabit = {
        title,
        description,
        color,
        kind,
        // daysToDo,
        icon,
        target,
        // eventInfo,
        _id: foundPersonalHabit.habitId,
      };
      // console.log("update habit", updatedHabit);
      await Habit.findByIdAndUpdate(updatedHabit._id, updatedHabit, {
        new: true,
      });
    }

    // update reminder, isFinish, score
    if (
      getHourAndMinute(reminder).toString() !==
      getHourAndMinute(foundPersonalHabit.reminder).toString()
    ) {
      console.log("reminder", reminder);
      // console.log("found personal", foundPersonalHabit);
      const updatedPersonalHabit = {
        ...foundPersonalHabit.toObject(),
        reminder,
        _id: personalHabitId,
      };

      // console.log("update personal", updatedPersonalHabit);

      await PersonalHabit.findByIdAndUpdate(
        personalHabitId,
        updatedPersonalHabit,
        {
          new: true,
        }
      );
      return res.status(httpStatusCodes.ok).json(updatedPersonalHabit);
    } else {
      return res
        .status(httpStatusCodes.noContent)
        .json({ message: "Personal habit has not changed" });
    }
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// PUT habit/my/progress/:historyHabitId
export const updateMyHistoryHabit = async (req, res) => {
  const { historyHabitId } = req.params;
  const sentInfo = req.body;
  const { progress, completed } = sentInfo;
  try {
    if (!sentInfo)
      return res
        .status(httpStatusCodes.badContent)
        .send(`Progress habit information is required`);

    const foundHistoryHabit = await HistoryHabit.findById(historyHabitId);

    if (!foundHistoryHabit)
      return res
        .status(httpStatusCodes.notFound)
        .send(`Cannot find history habit with id: ${historyHabitId}`);

    if (!foundHistoryHabit.userId.equals(req.userId)) {
      return res
        .status(httpStatusCodes.unauthorized)
        .json({ message: "You are not the user of this history habit" });
    }

    const relativePersonalHabit = await PersonalHabit.findById(
      foundHistoryHabit.personalHabitId
    );

    if (!relativePersonalHabit)
      return res
        .status(httpStatusCodes.notFound)
        .send(
          `Cannot find personal habit with id: ${foundHistoryHabit.personalHabitId}`
        );

    if (
      progress !== foundHistoryHabit.progress ||
      completed !== foundHistoryHabit.completed
    ) {
      const updatedHistoryHabit = {
        progress,
        completed,
        _id: foundHistoryHabit._id,
      };
      // console.log("update habit", updatedHistoryHabit);
      await HistoryHabit.findByIdAndUpdate(
        updatedHistoryHabit._id,
        updatedHistoryHabit,
        {
          new: true,
        }
      );

      return res.status(httpStatusCodes.ok).json(updatedHistoryHabit);
    } else {
      return res
        .status(httpStatusCodes.noContent)
        .json({ message: "History habit has not changed" });
    }
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// DELETE habit/:personalHabitId
export const deletePersonalHabitId = async (req, res) => {
  const { personalHabitId } = req.params;
  const { userId } = req;

  try {
    const personalHabit = await PersonalHabit.findById(personalHabitId);

    if (!personalHabit) {
      return res
        .status(httpStatusCodes.notFound)
        .send(`No personal habit with id: ${personalHabitId}`);
    }

    if (!userId || !personalHabit.userId.equals(userId)) {
      return res.status(httpStatusCodes.unauthorized).json({
        message: `You don't have permission to delete this personal habit`,
      });
    }

    const relativeHabit = await Habit.findById(personalHabit.habitId);

    //TODO: handle it is finished
    if (!relativeHabit?.eventInfo) {
      // check if user is owner of habit
      if (relativeHabit.authorId.equals(userId)) {
        await Habit.findByIdAndRemove(personalHabit.habitId);
      }
    } else {
      // const listJoiners = relativeHabit.eventInfo?.listJoiners;
      const index = relativeHabit.eventInfo?.listJoiners.indexOf(userId);
      if (index > -1) {
        relativeHabit.eventInfo?.listJoiners.splice(index, 1);
      }
      await relativeHabit.save();
    }

    await PersonalHabit.findByIdAndRemove(personalHabitId);
    await HistoryHabit.deleteMany({
      personalHabitId,
    });

    res
      .status(httpStatusCodes.ok)
      .json({ message: "Delete habit successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

//#endregion
