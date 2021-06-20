import API from "./index";

export const getMyJoiningEvents = () => API.get("/event/my/list");
