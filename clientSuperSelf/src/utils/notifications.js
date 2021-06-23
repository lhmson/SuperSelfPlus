import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import moment, { months } from "moment";
import {
  getDateNoTime,
  getDatesBetweenTwoDays,
  getHourAndMinute,
} from "./datetime";

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
  if (convertDateToSecondTrigger(time) <= 0) return;
  // console.log("Noti", convertDateToSecondTrigger(time), time);
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: { seconds: convertDateToSecondTrigger(time) },
  });
}
export const convertDateToLocalDate = (d) => {
  const strLocal = d.toLocaleString();
  const strDate = d.toLocaleDateString();
  let month = Number(strDate.substring(0, 2));
  let day = Number(strDate.substring(3, 5));
  let year = Number("20" + strDate.substring(6, 8));

  let h = 0,
    m = 0,
    s = 0;
  for (let i = 0; i < strLocal.length; i++)
    if (strLocal[i] == ":") {
      h = Number(strLocal.substring(i - 2, i));
      m = Number(strLocal.substring(i + 1, i + 3));
      s = Number(strLocal.substring(i + 4, i + 6));
      break;
    }
  let resDate = new Date(Date.UTC(year, month - 1, day, h, m, s));
  return resDate;
};

export const convertDateToSecondTrigger = (date) => {
  const localDate = convertDateToLocalDate(new Date());
  let secondsReminders = date.getTime() - localDate.getTime();
  return secondsReminders / 1000;
};

export const scheduleNotiListForHabit = (
  stopDate,
  reminder,
  title = "You've got mail! 📬",
  body = "Here is the notification body",
  data = { data: "goes here" }
) => {
  //   console.log("finish", new Date(stopDate));
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
