import API from "./index";

export const getMyHabits = () => API.get("/habit/my/list");
export const getUserHabits = (userId) => API.get(`/user/${userId}/list`);
export const getAHabitOfMe = (personalHabitId) =>
  API.get(`/habit/my/${personalHabitId}`);
export const getMyHabitsOfDate = (dateStr) =>
  API.get(`/habit/my/list/${dateStr}`);

export const addHabit = (habit) => API.post("/habit", habit);

export const updateMyHabit = (personalHabitId, updatedHabit) =>
  API.put(`habit/my/edit/${personalHabitId}`, updatedHabit);

export const deleteHabit = (personalHabitId) =>
  API.delete(`/habit/my/${personalHabitId}`);
