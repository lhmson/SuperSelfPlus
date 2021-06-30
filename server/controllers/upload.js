import { httpStatusCodes } from "../utils/httpStatusCode.js";

import cloudinary from "cloudinary";
import multiparty from "multiparty";
import User from "../models/user.js";

const cloudinaryv2 = cloudinary.v2;

export const uploadImg = async (req, res) => {
  try {
    const form = new multiparty.Form();
    form.parse(req, async function (err, fields, files) {
      const { avatar } = files;
      const uploadResponse = await cloudinaryv2.uploader.upload(
        avatar[0].path,
        {}
      );
      if (uploadResponse.url) {
        const postData = {
          avatar: uploadResponse.url,
        };
        // const result = await User.findByIdAndUpdate(req.userId, postData, {
        //   new: true,
        // });
        // const returnedUser = { ...result._doc };
        // delete returnedUser.password;
        res.json({
          data: {
            // ...returnedUser,
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
