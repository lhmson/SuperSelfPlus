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

import indexRouter from "./routes/index.js";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
import runRouter from "./routes/run.js";

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

// router
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/run", runRouter);

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
