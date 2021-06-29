import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import createError from "http-errors";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";

import cloudinary from "cloudinary";
const cloudinaryv2 = cloudinary.v2;

import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import habitRouter from "./routes/habit.js";
import runRouter from "./routes/run.js";
import eventRouter from "./routes/event.js";
import uploadRouter from "./routes/upload.js";
// import postRouter from "./routes/post.js";

dotenv.config();

const app = express();

// socket io set up
const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*", //"http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
// const __dirname = path.resolve(
//   path.dirname(decodeURI(new URL(import.meta.url).pathname))
// );
// app.use(express.static(path.join(__dirname, "public")));

cloudinaryv2.config({
  cloud_name: process.env.CLOUDINARY_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

// router
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/habit", habitRouter);
app.use("/event", eventRouter);
app.use("/run", runRouter);
app.use("/upload", uploadRouter);
// app.use("/post", postRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    server.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
