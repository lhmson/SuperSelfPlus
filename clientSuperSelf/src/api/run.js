import API from "./index";

export const getListRunHabitInProgress = (userId) =>
  API.get(`/run/${userId}/habits/list/inProgress`);

export const getListEventInProgress = (userId) =>
  API.get(`/run/${userId}/events/list/Joined`);

export const getPedometer = (userId) => API.get(`/run/${userId}/getPedometer`);

export const updateRunDate = (userId, data) =>
  API.put(`/run/${userId}/updateRunData`, data);

export const updateRunHabitProgress = (userId, data) =>
  API.put(`/run/${userId}/autoUpdateRunHabit`, data);
