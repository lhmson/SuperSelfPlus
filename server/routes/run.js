import express from "express";
import { updateRunData } from "../controllers/run.js";

const router = express.Router();

router.put("/:userId/updateRunData", updateRunData);

export default router;
