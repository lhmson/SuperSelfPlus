import API from "./index";

export const updateRunDate = (userId, data) =>
  API.put(`/run/${userId}/updateRunData`, data);

export const updateRunHabitProgress = (userId, data) =>
  API.put(`/run/${userId}/autoUpdateRunHabit`, data);
