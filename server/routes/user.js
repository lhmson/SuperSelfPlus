import express from "express";
import {
  signin,
  signup,
  getUser,
  getAllUsers,
  editMyProfile,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/list/all", auth, getAllUsers);
router.get("/:userId", auth, getUser);
router.post("/signin", signin);
router.post("/signup", signup);
router.put("/edit/my", auth, editMyProfile);

export default router;
