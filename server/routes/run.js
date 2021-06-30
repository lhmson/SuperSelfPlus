import express from "express";
import {
  updateRunData,
  autoUpdateProgressRunHabits,
  getListRunHabitInProgress,
  getListEventInProgress,
  getPedometer,
} from "../controllers/run.js";

const router = express.Router();

router.get("/:userId/habits/list/inProgress", getListRunHabitInProgress);
router.get("/:userId/events/list/Joined", getListEventInProgress);
router.get("/:userId/getPedometer", getPedometer);

router.put("/:userId/updateRunData", updateRunData);
router.put("/:userId/autoUpdateRunHabit", autoUpdateProgressRunHabits);

export default router;
