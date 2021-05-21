import API from "./index";

export const fetchPosts = () => API.get("/post/list/all");
