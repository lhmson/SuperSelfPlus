import express from "express";

import User from "../models/user.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import Tinder from "../models/tinder.js";

export const getListTinders = async (req, res) => {
  const { userId } = req.params;
  try {
    const users = await User.find();
    const tinders = await Tinder.find({ isDisplay: true });

    console.log(tinders);
    let results = [];
    for (let i = 0; i < tinders.length; i++)
      for (let j = 0; j < users.length; j++)
        if (tinders[i].userId.equals(users[j]._id)) {
          console.log("1");
          const item = {
            ...tinders[i].toObject(),
            name: users[j].username,
            avatarUrl: users[j].avatarUrl,
          };
          console.log(item);
          results.push(item);
        }
    return res.status(httpStatusCodes.ok).json(results);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const updateLocation = async (req, res) => {
  const { userId } = req.params;
  const { latitude, longitude } = req.body;
  try {
    console.log(latitude, longitude);
    if (latitude === undefined || longitude === undefined) return;
    let tinder = await Tinder.findOne({ userId: userId });
    console.log(tinder);
    tinder.latitude = latitude;
    tinder.longitude = longitude;
    await tinder.save();
    return res.status(httpStatusCodes.ok).json(tinder);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const updateHashtag = async (req, res) => {
  const { userId } = req.params;
  const { hashtag } = req.body;
  try {
    let tinder = await Tinder.findOne({ userId: userId });
    tinder.hashtag = hashtag;
    await tinder.save();
    return res.status(httpStatusCodes.ok).json(tinder);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const createTinder = async (req, res) => {
  const { userId } = req.params;
  try {
    const tinders = await Tinder.find({ userId: userId });

    if (tinders.length === 0) {
      const newTinder = new Tinder({ userId: userId });
      await newTinder.save();
      return res.status(httpStatusCodes.ok).json(newTinder);
    }
    return res.status(httpStatusCodes.ok).json({});
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
