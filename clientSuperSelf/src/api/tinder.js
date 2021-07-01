import API from "./index";

export const getListTinders = () => API.get(`/tinder/list/all`);

export const createTinder = (userId) => API.post(`/tinder/${userId}/create`);

export const updateLocation = (userId, data) =>
  API.put(`/tinder/${userId}/updateLocation`, data);

export const updateHashtag = (userId, data) =>
  API.put(`/tinder/${userId}/updateHashtag`, data);
