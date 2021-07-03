import Habit from "../models/habit.js";
import Message from "../models/message.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";

//#region CRUD
// GET message/list/all
export const getAllMessages = async (req, res) => {
  try {
    const { userId } = req;
    const anotherUserId = req.query.userId;
    if (!anotherUserId) {
      return res
        .status(httpStatusCodes.badContent)
        .json({ message: "User message not found" });
    }
    const key = [userId, anotherUserId.toString()].sort((a, b) =>
      a < b ? -1 : 1
    );
    const roomId = `${key[0]}-${key[1]}`;

    const messages = await Message.find({ roomId });

    return res.status(httpStatusCodes.ok).json(messages);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// DELETE message/list
export const deleteAllMessages = async (req, res) => {
  try {
    await Message.deleteMany({});
    return res.res
      .status(httpStatusCodes.ok)
      .json({ message: "Message delete successfully" });
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

//#endregion
