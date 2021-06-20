import express from "express";
import { getAllEvents, getMyEvents } from "../controllers/event.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/list/all", auth, getAllEvents);
router.get("/my/list", auth, getMyEvents);

export default router;
