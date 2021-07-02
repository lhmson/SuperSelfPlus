import express from "express";
import { uploadAvatar, uploadStory } from "../controllers/upload.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/avatar", auth, uploadAvatar);
router.post("/img/story", auth, uploadStory);

export default router;
