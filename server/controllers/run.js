import express from "express";
import RunData from "../models/runData.js";
import { runDataDaySchema } from "../models/runDataDay.js";
import User from "../models/user.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import { getDateNoTime } from "../utils/aboutDateTime.js";

export const createRunData = async (req, res) => {
  const { userId } = req.params;
  try {
    const runData = new RunData({
      userId: userId,
      lastDateUpdate: getDateNoTime(new Date()),
    });
    await runData.save();
    res.status(httpStatusCodes.created).json(runData);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const updateRunData = async (req, res) => {
  const { userId } = req.params;
  const { steps } = req.body;
  try {
    const runData = await RunData.findOne({ userId: userId });
    const dateNow = getDateNoTime(new Date());
    const dateLastedUpdate = getDateNoTime(runData.lastDateUpdate ?? dateNow);

    if (
      dateNow > dateLastedUpdate ||
      !runData?.listData30Days ||
      runData?.listData30Days.length == 0
    ) {
      const runDataDay = { date: dateNow, steps: steps };
      runData.lastDateUpdate = dateNow;
      runData.listData30Days = [runDataDay];
      await runData.save();
    } else if (dateNow == dateLastedUpdate) {
      runData.listData30Days[listData30Days.length - 1] = steps;
      runData.lastDateUpdate = dateNow;
      await runData.save();
    }
    return res.status(httpStatusCodes.ok).json(runData);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getRankingRunWorld_week = async (req, res) => {
  try {
    const runData = await RunData.find();
    const userData = await User.find();

    let listRank = runData.map((data) => {
      return { steps: data.totalStepsWeek, userId: data.userId };
    });
    listRank.sort((a, b) => {
      a.steps >= b.steps;
    });

    const listRankInfo = listRank.map((data) => {
      let user;
      for (let i = 0; i < userData.length; i++)
        if (userData[i]._id.equals(data.userId)) user = userData[i];
      return { ...data, username: user?.username };
    });

    res.status(httpStatusCodes.ok).json(listRankInfo);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
