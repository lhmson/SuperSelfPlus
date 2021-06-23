import PersonalHabit from "../models/personalHabit.js";
import {
  countDaysBetweenDates,
  getDateNoTime,
} from "../utils/aboutDateTime.js";

export const countStreak = (personalHabitId) => {};

export const arrayHabitsBasedOnTrend = () => {};

export const countDaysOfHabit = async (personalHabitId) => {
  const personalHabit = await PersonalHabit.findOne({ _id: personalHabitId });
  const startDate = getDateNoTime(personalHabit.joinDate);
  const today = getDateNoTime(new Date());
  const days = countDaysBetweenDates(startDate, today);
  return days;
};
