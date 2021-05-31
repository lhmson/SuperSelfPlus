import express from "express";
import {
  getHabitsOfUser,
  addHabit,
  checkHabit,
  deleteHabit,
} from "../controllers/habit.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:userId", auth, getHabitsOfUser);

router.post("/", auth, addHabit);

router.put("/:habitId", auth, checkHabit);
// router.put('/streak/:id', updateHabitStreak)

router.delete("/:habitId", auth, deleteHabit);

export default router;
