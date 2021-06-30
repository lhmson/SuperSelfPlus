import API from "./index";

export const uploadImg = (content) => API.post("upload/img", content);
