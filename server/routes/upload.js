import express from "express";
import { uploadImg } from "../controllers/upload.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/img", auth, uploadImg);

export default router;
