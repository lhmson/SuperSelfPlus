import express from "express";
import {
  createRunData,
  updateRunData,
  getRankingRunWorld_week,
} from "../controllers/run.js";

const router = express.Router();

router.post("/:userId/createRunData", createRunData);
router.put("/:userId/updateRunData", updateRunData);

router.get("/listRankingRunWeek", getRankingRunWorld_week);
export default router;
