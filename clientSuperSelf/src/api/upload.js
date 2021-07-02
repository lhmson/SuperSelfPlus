import API from "./index";

export const uploadAvatar = (content) => API.post("upload/avatar", content);

export const uploadStory = (content) => API.post("upload/img/story", content);
