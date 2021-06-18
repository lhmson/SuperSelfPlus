import express from "express";
import {
  updateRunData,
  autoUpdateProgressRunHabits,
} from "../controllers/run.js";

const router = express.Router();

router.put("/:userId/updateRunData", updateRunData);
router.put("/:userId/autoUpdateRunHabit", autoUpdateProgressRunHabits);

export default router;
