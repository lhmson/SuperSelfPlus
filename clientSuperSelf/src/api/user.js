import API from "./index";

export const getUser = (userId) => API.get(`/user/${userId}`);

export const editMyProfile = (updatedUser) =>
  API.put(`/user/edit/my`, updatedUser);
