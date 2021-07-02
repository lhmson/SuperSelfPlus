import API from "./index";

export const fetchPosts = () => API.get("/post/list/all");

export const createPost = (story) => API.post("/post", story);

export const likePost = (storyId) => API.put(`/post/like/${storyId}`);

export const deletePost = (storyId) => API.delete(`/post/${storyId}`);
