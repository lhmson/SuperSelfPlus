import express from "express";

import {
  getPosts,
  getAPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/post.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/list/all", auth, getPosts);
router.get("/:id", getAPost);

router.post("/", auth, createPost);

router.put("/:id", auth, updatePost);
router.put("/like/:postId", likePost);

router.delete("/:postId", auth, deletePost);

export default router;
