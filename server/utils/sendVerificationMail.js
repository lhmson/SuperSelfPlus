import nodemailer from "nodemailer";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const sendVerificationMail = async (email) => {
  const user = await User.findOne({ email: email });
  // const token = jwt.sign(
  //   { email: email, id: user._id },
  //   process.env.JWT_ACCESS_KEY,
  //   {
  //     expiresIn: "30m",
  //   }
  // );
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "testlhms123@gmail.com",
      pass: "TestTestLHMS12#",
    },
  });
  const mailContent = `
  <h1>Hi, ${user.username}!</h1>
  <h4>To complete the process, please verify your email address by simply clicking the button</h4>
  <button>Verify your email and join the world 🎉</button>
  <p>It will expire in 30 minutes.</p>
  <h3>SuperSelf - be the best self</p>
  `;

  const mailOptions = {
    from: "stestlhms123@gmail.com",
    to: email,
    subject: "Verify Email Address",
    generateTextFromHTML: true,
    html: mailContent,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default sendVerificationMail;
