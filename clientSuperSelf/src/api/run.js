import API from "./index";

export const updateRunDate = (userId, data) =>
  API.put(`/run/${userId}/updateRunData`, data);
