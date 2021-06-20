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

export const autoUpdateProgressRunHabits = async (req, res) => {
  const { userId } = req.params;
  const { steps, distance } = req.body;
  try {
    const habits = await filterPersonalHabit_Run_InProgress(userId);
    for (let i = 0; i < habits.length; i++) {
      let progress = await getHistoryHabitProgressToDay(habits[i]._id);
      if (progress && !progress?.completed) {
        const target = Number(habits[i].target.targetNumber) * 1000; // km to meter
        let newProgress = progress.progress + distance / target;
        progress.progress = newProgress;
        if (newProgress >= 1) {
          progress.progress = 1;
          progress.completed = true;
          await upScorePersonalHabit(habits[i]._id, 1);
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
