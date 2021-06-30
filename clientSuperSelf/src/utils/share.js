import { Share, Platform } from "react-native";

export const shareHabit = async (item) => {
  try {
    const result = await Share.share(
      {
        ...Platform.select({
          ios: {
            message: `Hey, I am currently setting my goal to become a master of this habit: ${item.habitId.title.toUpperCase()}\n${
              item.habitId.target
                ? `I do it ${item.habitId.target?.targetNumber} ${item.habitId.target?.targetUnit} a day `
                : ""
            }`,
            url: "https://www.facebook.com/superselfapp",
          },
          android: {
            message:
              `Hey, I am currently setting my goal to become a master of this habit ${item.habitId.title.toUpperCase()}\n${
                item.habitId.target
                  ? `I do it ${item.habitId.target?.targetNumber} ${item.habitId.target?.targetUnit} a day `
                  : ""
              } ` + "https://www.facebook.com/superselfapp",
          },
        }),
        title: "Habit: " + item.habitId.title,
      },
      {
        ...Platform.select({
          ios: {
            // iOS only:
            excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
          },
          android: {
            // Android only:
            dialogTitle: "Share : " + item.habitId.title,
          },
        }),
      }
    );
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
        alert(
          "You have shared it successfully. Keep doing to show the world you can"
        );
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
      alert("You have not shared");
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};
