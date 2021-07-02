import PersonalHabit from "../models/personalHabit.js";
import HistoryHabit from "../models/historyHabit.js";
import Habit from "../models/habit.js";
import {
  countDaysBetweenDatesIncludingToday,
  getDateNoTime,
  getDatesBetweenTwoDays,
} from "../utils/aboutDateTime.js";
import { habitThemes } from "../utils/habitThemes.js";

export const createListHistoryHabits = async (
  numberOfDays,
  personalHabitId,
  userId
) => {
  const dates = getDatesBetweenTwoDays(
    new Date(),
    new Date().addDays(numberOfDays)
  );
  // console.log(dates);

  for (let i = 0; i < numberOfDays; i++) {
    // console.log(dates[i]);
    await HistoryHabit.create({
      personalHabitId,
      userId,
      date: getDateNoTime(dates[i]),
    });
  }
};

export const countStreak = async (personalHabitId) => {
  try {
    // get day from start to today and sort decrease
    const historyHabits = await HistoryHabit.find({
      personalHabitId,
      date: { $lte: getDateNoTime(new Date()) },
    }).sort({
      date: -1,
    });

    let currentStreak = 0;

    for (let elem of historyHabits) {
      if (elem.completed) {
        currentStreak++;
      } else {
        break;
      }
    }

    const { longestStreak, streakLogs } = countLongestStreak(
      // count from begin
      historyHabits.reverse()
    );

    return { currentStreak, longestStreak, streakLogs };
  } catch (error) {
    console.log("Error when count streak", error);
  }
  return result;
};

function countLongestStreak(arr) {
  const streakLogs = Array(arr.length).fill(0);

  // 'max' to store the length of longest streak
  // 'len' to store the lengths of longest streak at different instants of date
  let max = 0,
    len = 0,
    numberOfComplete = 0;

  // traverse the array from the 2nd element
  for (let i = 0; i < arr.length; i++) {
    // if current element is completed, then this element helps in building up the prev streak encountered so far
    if (arr[i].completed) {
      len++;
      numberOfComplete++;
    } else {
      // check if max length is less than the length of the present streak. If true, then update max
      if (max < len) {
        max = len;
      }

      // reset 'len' to 1 as from this element again the length of the new streak is being calculated
      len = 0;
    }
    streakLogs[i] = len;
  }
  // console.log(streakLogs);

  // comparing the length of the last streak with 'max'
  if (max < len) {
    max = len;
  }
  return { longestStreak: max, streakLogs, numberOfComplete };
}

export const getScoreOfMyHabit = async (personalHabitId) => {
  try {
    // get day from start to today and sort decrease
    const historyHabits = await HistoryHabit.find({
      personalHabitId,
      date: { $lte: getDateNoTime(new Date()) },
    }).sort({
      date: -1,
    });

    const personalHabit = await PersonalHabit.findOne(personalHabitId);
    const habit = await Habit.findOne(personalHabit.habitId);
    const kind = habit.kind;

    const { longestStreak, numberOfComplete } =
      countLongestStreak(historyHabits);

    let score = 0;
    if (kind !== "Run") {
      score = longestStreak * 10 + numberOfComplete * 10;
    } else {
      //TODO: add run
      for (let elem of historyHabits) {
        score += elem.progress;
      }
    }

    return score;
  } catch (error) {
    console.log("Error when get score", error);
  }
};

// export const updateLongestStreak = async (personalHabitId, currentStreak) => {
//   try {
//     const personalHabit = await PersonalHabit.findById(personalHabitId);
//     if (personalHabit) {
//       if (currentStreak > longestStreak) {
//         personalHabit.longestStreak = currentStreak;
//         await personalHabit.save();
//       }
//     }
//   } catch (error) {
//     console.log("Error when update long streak", error);
//   }
// };

export const arrayHabitsBasedOnTrend = () => {};

export const countDaysOfHabit = async (personalHabitId) => {
  const personalHabit = await PersonalHabit.findById(personalHabitId);
  const startDate = getDateNoTime(personalHabit.joinDate);
  const today = getDateNoTime(new Date());
  const days = countDaysBetweenDatesIncludingToday(startDate, today);
  return days;
};

export const countMyHabitsByTheme = async (userId) => {
  const personalHabits = await PersonalHabit.find({ userId });
  let habits = [];
  for (let elem of personalHabits) {
    const habit = await Habit.findById(elem.habitId);
    habits.push(habit);
  }
  const numberByTheme = habitThemes.map((theme) => {
    const habitByThemes = habits.filter((item) => item.theme === theme);
    return { x: theme, y: habitByThemes.length };
  });
  return numberByTheme;
};
