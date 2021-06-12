import express from "express";
import {
  getMyHabits,
  getUserHabits,
  getAHabitOfMe,
  getMyHabitsOfDate,
  addHabit,
  updateHabit,
  updatePersonalHabit,
  deleteHabit,
} from "../controllers/habit.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/my/list", auth, getMyHabits);
router.get("/:userId/list", auth, getUserHabits);
router.get("/my/:personalHabitId", auth, getAHabitOfMe);
router.get("/my/list/:dateStr", auth, getMyHabitsOfDate);

router.post("/", auth, addHabit);

router.put("/edit/:habitId", auth, updateHabit);
router.put("/my/edit/:personalHabitId", auth, updatePersonalHabit);

router.delete("/:habitId", auth, deleteHabit);

export default router;
