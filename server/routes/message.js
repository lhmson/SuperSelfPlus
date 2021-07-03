import express from "express";
import { getAllMessages, deleteAllMessages } from "../controllers/message.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/list/all", auth, getAllMessages);
router.delete("/list", auth, deleteAllMessages);

export default router;
