import { Share, Platform } from "react-native";
import { logoUrl } from "./logo";

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
    console.log(error.message);
    alert(error.message);
  }
};

export const shareStory = (item) => {
  try {
    Share.share(
      {
        ...Platform.select({
          ios: {
            message: `Read this from ${item.userId.username} \n ${item.postText}`,
            url: item.postImg,
          },
          android: {
            message: item.postImg
              ? `Read this from ${item.userId.username} of SuperSelf \n${item.postText} ` +
                item.postImg
              : `Read this from ${item.userId.username} of SuperSelf \n${item.postText} https://www.facebook.com/superselfapp `,
          },
        }),
        title: "This is a great story from Super Self",
      },
      {
        ...Platform.select({
          ios: {
            // iOS only:
            excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
          },
          android: {
            // Android only:
            dialogTitle: "Share story of : " + item.userId.username,
          },
        }),
      }
    );
  } catch (error) {
    alert(error.message);
  }
};

export const shareApp = () => {
  try {
    Share.share(
      {
        ...Platform.select({
          ios: {
            message: `Hey let's join SuperSelf - the app to build a community of positive habits https://www.facebook.com/superselfapp`,
            url: logoUrl,
          },
          android: {
            message: `Hey let's join SuperSelf - the app to build a community of positive habits https://www.facebook.com/superselfapp`,
          },
        }),
        title: "App to build greats habits",
      },
      {
        ...Platform.select({
          ios: {
            // iOS only:
            excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
          },
          android: {
            // Android only:
            dialogTitle: "Share to friends",
          },
        }),
      }
    );
  } catch (error) {
    alert(error.message);
  }
};
