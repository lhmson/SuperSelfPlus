import { httpStatusCodes } from "../utils/httpStatusCode.js";

import cloudinary from "cloudinary";
import multiparty from "multiparty";
import User from "../models/user.js";

const cloudinaryv2 = cloudinary.v2;

export const uploadAvatar = async (req, res) => {
  try {
    const form = new multiparty.Form();
    form.parse(req, async function (err, fields, files) {
      const { avatar } = files;
      const uploadResponse = await cloudinaryv2.uploader.upload(
        avatar[0].path,
        { folder: "superselfAvatar", use_filename: true }
      );
      if (uploadResponse.url) {
        const postData = {
          avatar: uploadResponse.url,
        };
        res.json({
          data: {
            ...postData,
          },
        });
      } else {
        res.status(httpStatusCodes.badContent).json({
          message: "Upload image not successful",
        });
      }
    });
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const uploadStory = async (req, res) => {
  try {
    const form = new multiparty.Form();
    form.parse(req, async function (err, fields, files) {
      // name avatar using same createformdata
      const { avatar } = files;
      const uploadResponse = await cloudinaryv2.uploader.upload(
        avatar[0].path,
        { folder: "superselfStory", use_filename: true }
      );
      if (uploadResponse.url) {
        const postData = {
          img: uploadResponse.url,
        };
        res.json({
          data: {
            ...postData,
          },
        });
      } else {
        res.status(httpStatusCodes.badContent).json({
          message: "Upload image not successful",
        });
      }
    });
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};
