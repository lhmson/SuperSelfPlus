import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
    },
    urlImage: {
      type: String,
    },
    numberLikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

var Post = mongoose.model("Post", postSchema);

export default Post;
