import Post from "../models/post.js";
import { httpStatusCodes } from "../utils/httpStatusCode.js";
import User from "../models/user.js";

//#region CRUD
// GET post/list/all
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "userId",
        model: "User",
        select: "username avatarUrl",
      })
      .sort({ createdAt: -1 });
    return res.status(httpStatusCodes.ok).json(posts);
  } catch (error) {
    return res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// GET post/:id

export const getAPost = async (req, res) => {
  // const { id } = req.params;
  // try {
  //   await Post.findById(id)
  //     .populate("userId", "name") // need to populate more item (avatar, )
  //     .then((post) => {
  //       return res.status(httpStatusCodes.ok).json(post);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       return res
  //         .status(httpStatusCodes.notFound)
  //         .json(`Cannot find a post with id: ${id}`);
  //     });
  // } catch (error) {
  //   return res
  //     .status(httpStatusCodes.internalServerError)
  //     .json({ message: error.message });
  // }
};

// POST post/
export const createPost = async (req, res) => {
  const { userId } = req;
  const sentInfo = req.body;
  const { postText, postImg } = sentInfo;

  // new post shouldn't have an _id in it
  if (sentInfo._id) {
    return res
      .status(httpStatusCodes.badContent)
      .json("New post mustn't have _id field");
  }

  const newPost = new Post({
    userId,
    postText,
    postImg,
    userId: req.userId,
  });

  try {
    console.log(newPost);
    await newPost.save();

    res.status(httpStatusCodes.created).json(newPost);
  } catch (error) {
    res
      .status(httpStatusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  // const { id } = req.params;
  // try {
  //   const newPost = req.body;
  //   if (!newPost)
  //     return res
  //       .status(httpStatusCodes.badContent)
  //       .send(`New post information is required`);
  //   if (!Post.findById(id))
  //     return res
  //       .status(httpStatusCodes.notFound)
  //       .send(`Cannot find a post with id: ${id}`);
  //   const updatedPost = {
  //     ...newPost,
  //     _id: id,
  //   };
  //   console.log("update post", updatedPost);
  //   await Post.findByIdAndUpdate(id, updatedPost, { new: true });
  //   return res.status(httpStatusCodes.ok).json(updatedPost);
  // } catch (error) {
  //   return res
  //     .status(httpStatusCodes.internalServerError)
  //     .json({ message: error.message });
  // }
};

// DELETE post/:id
export const deletePost = async (req, res) => {
  // const { id } = req.params;
  // try {
  //   // auth
  //   if (!req.userId) {
  //     return res.json({ message: "Unauthenticated" });
  //   }
  //   if (!(await Post.findById(id))) {
  //     return res
  //       .status(httpStatusCodes.notFound)
  //       .send(`No post with id: ${id}`);
  //   }
  //   await Post.findByIdAndRemove(id);
  //   res
  //     .status(httpStatusCodes.ok)
  //     .json({ message: "Post deleted successfully." });
  // } catch (error) {
  //   res
  //     .status(httpStatusCodes.internalServerError)
  //     .json({ message: error.message });
  // }
};

//#endregion
