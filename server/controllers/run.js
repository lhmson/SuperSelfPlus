import express from "express";

import User from "../models/user.js";
import { historyRunSchema } from "../models/historyRun.js";
import { historyRunItemSchema } from "../models/historyRunItem.js";

import { httpStatusCodes } from "../utils/httpStatusCode.js";
import { getDateNoTime } from "../utils/aboutDateTime.js";

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
