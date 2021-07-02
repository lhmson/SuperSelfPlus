import API from "./index";

export const getMyHabits = () => API.get("/habit/my/list");
export const getUserHabits = (userId) => API.get(`habit/user/${userId}/list`);
export const getAHabitOfMe = (habitId) => API.get(`/habit/my/${habitId}`);
export const getMyHabitsOfDate = (dateStr) =>
  API.get(`/habit/my/list/${dateStr}`);
export const getMyHabitProgress = (personalHabitId) =>
  API.get(`/habit/my/${personalHabitId}/progress`);

export const addHabit = (habit) => API.post("/habit", habit);

export const updateMyHabit = (personalHabitId, updatedHabit) =>
  API.put(`habit/my/edit/${personalHabitId}`, updatedHabit);
export const updateMyHistoryHabit = (historyHabitId, updatedHistoryHabit) =>
  API.put(`habit/my/progress/${historyHabitId}`, updatedHistoryHabit);

export const deleteMyHabit = (personalHabitId) =>
  API.delete(`/habit/my/${personalHabitId}`);
