import express from "express";
import { createRunData, updateRunData } from "../controllers/run.js";

const router = express.Router();

router.post("/:userId/createRunData", createRunData);
router.put("/:userId/updateRunData", updateRunData);

export default router;
