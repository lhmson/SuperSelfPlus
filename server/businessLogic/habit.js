import PersonalHabit from "../models/personalHabit.js";
import HistoryHabit from "../models/historyHabit.js";
import {
  countDaysBetweenDatesIncludingToday,
  getDateNoTime,
} from "../utils/aboutDateTime.js";

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

    const longestStreak = countLongestStreak(historyHabits);
    return { currentStreak, longestStreak };
  } catch (error) {
    console.log("Error when count streak", error);
  }
  return result;
};

function countLongestStreak(arr) {
  // 'max' to store the length of longest streak
  // 'len' to store the lengths of longest streak at different instants of date
  var max = 0,
    len = 0;

  // traverse the array from the 2nd element
  for (let elem of arr) {
    // if current element is completed, then this element helps in building up the prev streak encountered so far
    if (elem.completed) len++;
    else {
      // check if max length is less than the length of the present streak. If true, then update max
      if (max < len) {
        max = len;
      }

      // reset 'len' to 1 as from this element again the length of the new streak is being calculated
      len = 0;
    }
  }

  // comparing the length of the last streak with 'max'
  if (max < len) {
    max = len;
  }
  return max;
}

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
