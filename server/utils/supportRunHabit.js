import express from "express";

import User from "../models/user.js";
import { historyRunSchema } from "../models/historyRun.js";
import { historyRunItemSchema } from "../models/historyRunItem.js";

import Habit from "../models/habit.js";
import HistoryHabit from "../models/historyHabit.js";
import PersonalHabit from "../models/personalHabit.js";

import { getDateNoTime } from "./aboutDateTime.js";

export const filterPersonalHabit_Run_InProgress = async (userId, nameHabit) => {
  const listRunHabits = await Habit.find({
    title: nameHabit,
  });

  let listPersonalRunHabits = await PersonalHabit.find({
    userId: userId,
    isFinish: false,
  });

  let res = [];
  for (let i = 0; i < listPersonalRunHabits.length; i++) {
    for (let j = 0; j < listRunHabits.length; j++)
      if (listPersonalRunHabits[i].habitId.equals(listRunHabits[j]._id)) {
        res.push({
          ...listPersonalRunHabits[i].toObject(),
          target: listRunHabits[j].target,
        });
      }
  }

  return res;
};

export const getHistoryHabitProgressToDay = async (personalId) => {
  const progress = await HistoryHabit.find({ personalHabitId: personalId });

  for (let i = 0; i < progress.length; i++) {
    if (getDateNoTime(new Date()) === getDateNoTime(progress[i].date)) {
      return progress[i];
    }
  }
  return null;
};

export const getTargetHabit = async (habitId) => {
  const habit = Habit.findById(habitId);
  return habit.target ?? 100;
};

export const upScorePersonalHabit = async (personalHabitId, score) => {
  let habit = await PersonalHabit.findById(personalHabitId);
  habit.score += score;
  await habit.save();
};
