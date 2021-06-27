import API from "./index";

export const getAllEvents = () => API.get("/event/list/all");

export const getMyEvents = () => API.get("/event/my/list");

export const joinEvent = (habitId) => API.put(`event/join/${habitId}`);
