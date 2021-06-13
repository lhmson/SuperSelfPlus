import moment from "moment";

export const getDateNoTime = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

// 2021-06-26T17:00:00.000Z
export const getRawDateTime = (date) => {
  const regex = /\T.*/g;
  const temp = date.toISOString().replace(regex, "");
  console.log("temp", temp);
  return new Date(temp);
};

export function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const getDatesBetweenTwoDays = (startDate, stopDate) => {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
};

export const getHourAndMinute = (date) => {
  return moment(date).format("HH:mm");
};

export function dateCompare(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  if (date1 > date2) {
    return 1;
  } else if (date1 < date2) {
    return -1;
  } else {
    return 0;
  }
}

export function isToday(date) {
  return (
    dateCompare(getDateNoTime(new Date(date)), getDateNoTime(new Date())) === 0
  );
}
