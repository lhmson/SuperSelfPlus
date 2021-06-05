import API from "./index";

export const createRunData = (userId) =>
  API.post(`/run/${userId}/createRunData`);
export const updateRunDate = (userId, data) =>
  API.put(`/run/${userId}/updateRunData`, data);
export const getRankingWeek = () => API.get(`/run/listRankingRunWeek`);
