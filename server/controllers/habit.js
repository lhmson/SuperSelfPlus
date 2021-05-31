import Habit from "../models/habit.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import User from "../models/user.js";

//#region CRUD
// GET habit/:userId
export const getHabitsOfUser = async (req, res) => {
  try {
    const { userId } = req.params.userId;
    try {
      const habits = await Habit.find({ userId });
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

// POST habit
export const addHabit = async (req, res) => {
  const habit = {
    title: req.body.title,
    frequency: req.body.frequency,
  };

  // new habit shouldn't have an _id in it
  if (habit._id) {
    return res
      .status(httpStatusCodes.badContent)
      .json("New habit mustn't have _id field");
  }

  const newHabit = new Habit({
    ...habit,
    userId: req.userId,
  });

  try {
    console.log(newHabit);
    await newPost.save();

    res.status(httpStatusCodes.created).json(newPost);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// PUT habit/:habitId
export const checkHabit = async (req, res) => {
  const { habitId } = req.params;
  try {
    const habit = await Habit.findById(id);
    if (!habit)
      return res
        .status(httpStatusCodes.notFound)
        .send(`Cannot find a habit with id: ${habitId}`);

    const updatedHabit = {
      ...habit,
      datesChecked: habit.datesChecked.push(new Date()),
      //   streak: habit.streak++,
    };

    console.log("update post", updatedHabit);

    await Habit.findByIdAndUpdate(habitId, updatedHabit, { new: true });
    return res.status(httpStatusCodes.ok).json(updatedPost);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// DELETE habit/:habitId
export const deleteHabit = async (req, res) => {
  const { habitId } = req.params;

  try {
    if (!(await Habit.findById(habitId))) {
      return res
        .status(httpStatusCodes.notFound)
        .send(`No habit with id: ${habitId}`);
    }

    await Habit.findByIdAndRemove(habitId);
    res
      .status(httpStatusCodes.ok)
      .json({ message: "Habit deleted successfully." });
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

//#endregion
