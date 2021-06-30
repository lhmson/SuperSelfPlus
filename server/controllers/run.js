import express from "express";

import User from "../models/user.js";
import { historyRunSchema } from "../models/historyRun.js";
import { historyRunItemSchema } from "../models/historyRunItem.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import { getDateNoTime } from "../utils/aboutDateTime.js";
import {
  filterPersonalHabit_Run_InProgress,
  getHistoryHabitProgressToDay,
  upScorePersonalHabit,
} from "../utils/supportRunHabit.js";
import PersonalHabit from "../models/personalHabit.js";
import Habit from "../models/habit.js";

// PUT run/:userId/updateRunData
export const updateRunData = async (req, res) => {
  const { userId } = req.params;
  const { steps, distance } = req.body;
  try {
    console.log("user", steps, distance);
    const user = await User.findById(userId);
    if (!user) return res.status(httpStatusCodes.notFound).json();

    if (!user.historyRun) {
      const history = historyRunSchema;
      user.historyRun = history;
      await user.save();
    }

    const today = new Date();
    let { listDataRun } = user?.historyRun;

    for (let i = 0; i < listDataRun.length; i++) {
      if (getDateNoTime(today) === getDateNoTime(listDataRun[i].dateRun)) {
        listDataRun[i].totalSteps += steps;
        listDataRun[i].totalDistance += distance;
        await user.save();
        return res.status(httpStatusCodes.ok).json(listDataRun[i]);
      }
    }

    let itemRun = historyRunItemSchema;
    itemRun.dateRun = new Date();
    itemRun.totalSteps = steps;
    itemRun.totalDistance = distance;

    listDataRun.push(itemRun);
    await user.save();
    return res.status(httpStatusCodes.ok).json(itemRun);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

//PUT run/:userId/autoUpdateRunHabit
export const autoUpdateProgressRunHabits = async (req, res) => {
  const { userId } = req.params;
  const { steps, distance, nameHabit } = req.body;
  try {
    const habits = await filterPersonalHabit_Run_InProgress(userId, nameHabit);
    for (let i = 0; i < habits.length; i++) {
      let progress = await getHistoryHabitProgressToDay(habits[i]._id);
      if (progress) {
        const target = Number(habits[i].target?.targetNumber) * 1000; // km to meter
        let newProgress = progress.progress + distance;
        progress.progress = newProgress;
        if (newProgress >= target && !progress?.completed) {
          progress.completed = true;
        }
        await progress.save();
        return res.status(httpStatusCodes.ok).json(progress);
      }
    }
    return res.status(httpStatusCodes.ok).json(habits);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getListRunHabitInProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const habits = await Habit.find({
      authorId: userId,
      kind: "Run",
    });
    const personalHabits = await PersonalHabit.find({
      userId: userId,
      isFinish: false,
    });
    let resListHabits = [];
    for (let i = 0; i < habits.length; i++)
      for (let j = 0; j < personalHabits.length; j++)
        if (habits[i]?._id.equals(personalHabits[j].habitId)) {
          resListHabits.push(habits[i]);
          break;
        }
    return res.status(httpStatusCodes.ok).json(resListHabits);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

const checkDateActive = (evenInfo) => {
  if (!evenInfo) return false;
  if (evenInfo.createdAt <= new Date() && evenInfo.dateEnd >= new Date())
    return true;
};

export const getListEventInProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const habits = await Habit.find({ authorId: userId, kind: "Run" });

    let resListEvents = [];
    for (let i = 0; i < habits.length; i++)
      if (checkDateActive(habits[i].eventInfo)) {
        console.log("test", habits[i].evenInfo);
        for (let j = 0; j < habits[i].eventInfo.listJoiners?.length; j++)
          if (habits[i].eventInfo.listJoiners[j].equals(userId)) {
            resListEvents.push(habits[i]);
            break;
          }
      }
    return res.status(httpStatusCodes.ok).json(resListEvents);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
