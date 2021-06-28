import express from "express";
import {
  getAllEvents,
  getMyEvents,
  joinEvent,
  getHabitRanking,
} from "../controllers/event.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/list/all", auth, getAllEvents);
router.get("/my/list", auth, getMyEvents);
router.get("/:habitId/ranking", auth, getHabitRanking);

router.put("/join/:habitId", auth, joinEvent);

export default router;
