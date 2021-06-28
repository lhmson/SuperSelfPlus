import express from "express";
import {
  getMyHabits,
  getUserHabits,
  getAHabitOfMe,
  getMyHabitsOfDate,
  addHabit,
  getMyHabitProgress,
  updateMyHabit,
  updateMyHistoryHabit,
  // updateMyHabitScore,
  deletePersonalHabit,
} from "../controllers/habit.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/my/list", auth, getMyHabits);
router.get("/:userId/list", auth, getUserHabits);
// router.get("/my/:personalHabitId", auth, getAHabitOfMe);
router.get("/my/:habitId", auth, getAHabitOfMe);
router.get("/my/list/:dateStr", auth, getMyHabitsOfDate); // used

// progress statistics
router.get("/my/:personalHabitId/progress", auth, getMyHabitProgress);

router.post("/", auth, addHabit); // used

router.put("/my/edit/:personalHabitId", auth, updateMyHabit);
router.put("/my/progress/:historyHabitId", auth, updateMyHistoryHabit);
// router.put("/my/updateScore/:personalHabitId", auth, updateMyHabitScore);

router.delete("/my/:personalHabitId", auth, deletePersonalHabit); // used

export default router;
