import API from "./index";

export const fetchPosts = () => API.get("/post/list/all");

export const createPost = (story) => API.post("/post", story);
