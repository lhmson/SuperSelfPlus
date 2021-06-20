import express from "express";
import { getMyJoiningEvents } from "../controllers/event.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/my/list", auth, getMyJoiningEvents);
// router.get("/:userId/list", auth, getUserHabits);
// router.get("/my/:personalHabitId", auth, getAHabitOfMe);
// router.get("/my/list/:dateStr", auth, getMyHabitsOfDate); // used

// router.post("/", auth, addHabit); // used

// router.put("/my/edit/:personalHabitId", auth, updateMyHabit);
// router.put("/my/progress/:historyHabitId", auth, updateMyHistoryHabit);

// router.delete("/my/:personalHabitId", auth, deletePersonalHabitId);

export default router;
