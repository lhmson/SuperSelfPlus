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
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
const cloudinaryv2 = cloudinary.v2;

import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import habitRouter from "./routes/habit.js";
import runRouter from "./routes/run.js";
import eventRouter from "./routes/event.js";
import uploadRouter from "./routes/upload.js";
import postRouter from "./routes/post.js";
import tinderRouter from "./routes/tinder.js";

// import messageRouter from "./routes/message.js";

import {
  getCurrentUserDetails,
  userJoinGroup,
  userLeaveGroup,
} from "./utils/chat.js";

dotenv.config();

const app = express();

// socket io set up
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", //"http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

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
app.use("/tinder", tinderRouter);
app.use("/post", postRouter);
// app.use("/message", messageRouter);

//#region chat
io.on("connection", (socket) => {
  socket.on("joinGroup", (data) => {
    const user = userJoinGroup(socket.id, data.username, data.room);
    console.log(`${user.username} user connected to ${user.room}`);
    socket.join(user.room);

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit("roomNotification", `${user.username} has joined group`);
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUserDetails(socket.id);
    io.to(user.room).emit("message", msg);
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeaveGroup(socket.id);

    if (user) {
      console.log(`${user.username} is left the group!`);
      io.to(user.room).emit(
        "roomNotification",
        `${user.username} has left the group`
      );
    }
  });
});

//#endregion

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
