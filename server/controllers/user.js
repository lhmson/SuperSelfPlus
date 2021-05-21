import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

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
