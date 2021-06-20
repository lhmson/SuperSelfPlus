import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { getDateNoTime, getDatesBetweenTwoDays } from "./datetime";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function schedulePushNotification(
  time,
  title = "You've got mail! 📬",
  body = "Here is the notification body",
  data = { data: "goes here" }
) {
  //   console.log(time);
  if (time <= 0) time = 1;
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: { seconds: convertDateToSecondTrigger(time) },
  });
}

export const convertDateToSecondTrigger = (date) => {
  let secondsReminders =
    new Date(Date.parse(date) - Date.parse(new Date())) / 1000;
  return secondsReminders;
};

export const scheduleNotiListForHabit = (
  stopDate,
  reminder,
  title = "You've got mail! 📬",
  body = "Here is the notification body",
  data = { data: "goes here" }
) => {
  console.log("finish", new Date(stopDate));
  const dates = getDatesBetweenTwoDays(
    new Date(getDateNoTime(new Date())),
    new Date(getDateNoTime(stopDate))
  );
  const seconds = reminder.getHours() * 60 * 60 + reminder.getMinutes() * 60;
  dates.forEach((item) => {
    schedulePushNotification(
      new Date(item.getTime() + seconds * 1000),
      title,
      body,
      data
    );
  });
};

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
