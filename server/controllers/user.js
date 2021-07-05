import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import User from "../models/user.js";
import HistoryHabit from "../models/historyHabit.js";
import { countMyHabitsByTheme } from "../businessLogic/habit.js";
import sendVerificationMail from "../utils/sendVerificationMail.js";

export const signin = async (req, res) => {
  console.log("signin");
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email or password is null" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_ACCESS_KEY,
      {
        // expiresIn: "24h",
      }
    );

    res.status(200).json({ result: user, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  console.log("signup");
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    // const newInfo = await UserInfo.create({
    //   firstName: firstName,
    //   lastName: lastName,
    //   gender: gender,
    //   dateOfBirth: dob,
    // });

    const result = await User.create({
      username,
      email,
      password: hashedPassword,
      // name: `${firstName} ${lastName}`,
      // userInfo: newInfo,
    });

    await sendVerificationMail(email);

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_ACCESS_KEY,
      {
        // expiresIn: "24h",
      }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

// GET post/list/all
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(httpStatusCodes.ok).json(users);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// GET user/:userId

export const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(httpStatusCodes.notFound)
        .json(`Cannot find user with id: ${userId}`);
    }

    const {
      username,
      listAchievements,
      userInfo,
      createdAt,
      avatarUrl,
      _id,
      role,
    } = user;

    const numberOfHabitsByThemes = await countMyHabitsByTheme(user._id);

    return res.status(httpStatusCodes.ok).json({
      username,
      listAchievements,
      userInfo,
      createdAt,
      avatarUrl,
      role,
      _id,
      numberOfHabitsByThemes,
    });
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const editMyProfile = async (req, res) => {
  const { userId } = req;
  const sentInfo = req.body;
  const { username, avatarUrl, userInfo } = sentInfo;
  try {
    if (!sentInfo)
      return res
        .status(httpStatusCodes.badContent)
        .send(`Update info is required`);

    const foundUser = await User.findById(userId);

    if (!foundUser)
      return res
        .status(httpStatusCodes.notFound)
        .send(`Cannot find user with id: ${userId}`);

    const updatedUser = {
      ...foundUser.toObject(),
      username,
      avatarUrl,
      userInfo,
      _id: userId,
    };

    // console.log("update user", updatedUser);

    await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
    return res.status(httpStatusCodes.ok).json(updatedUser);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
