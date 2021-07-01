import express from "express";
import {
  getListTinders,
  updateHashtag,
  updateLocation,
  createTinder,
} from "../controllers/tinder.js";

const router = express.Router();

router.get("/list/all", getListTinders);

router.post("/:userId/create", createTinder);

router.put("/:userId/updateLocation", updateLocation);
router.put("/:userId/updateHashtag", updateHashtag);

export default router;
