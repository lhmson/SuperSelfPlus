import React, { useRef } from "react";
import { View, ScrollView } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import styles from "./styles";
import moment from "moment";
import {
  getDateNoTime,
  getDatesBetweenTwoDays,
  getMonday,
} from "../../../utils/datetime";

import CalendarStrip from "react-native-calendar-strip";
import { useUser } from "../../../context/UserContext";
import FONT from "../../../constants/font";

function TestCalendarScreen() {
  const user = useUser();
  const userJoinDate = getDateNoTime(user.state.createdAt);
  let datesWhitelist = [
    {
      start: userJoinDate,
      end: moment().add(21, "days"), // total 4 days enabled
    },
  ];

  const markedDates = [
    {
      date: moment(),
      dots: [
        {
          color: COLOR.red,
          //   selectedColor: COLOR.red,
        },
        { color: COLOR.purple },
        {
          color: COLOR.red,
        },
      ],
    },
    {
      date: moment().add(1, "days"),
      lines: [
        {
          color: COLOR.green,
          //   selectedColor: COLOR.red,
        },
      ],
    },
  ];

  const calendarStripRef = useRef();

  return (
    <View style={styles.container}>
      <CalendarStrip
        calendarAnimation={{ type: "sequence", duration: 30 }}
        scrollable
        style={{
          height: 100,
          paddingTop: 12,
          paddingBottom: 10,
          fontFamily: FONT.Nunito_700,
        }}
        calendarColor={COLOR.orange}
        calendarHeaderStyle={{
          color: COLOR.blue,
          fontFamily: FONT.Nunito_700,
          fontSize: 16,
        }}
        dateNumberStyle={{ color: COLOR.white, fontFamily: FONT.Nunito_700 }}
        dateNameStyle={{ color: COLOR.white, fontFamily: FONT.Nunito_700 }}
        iconContainer={{ flex: 0.1 }}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: COLOR.white,
        }}
        highlightDateNumberStyle={{
          color: COLOR.blue,
          fontFamily: FONT.Nunito_700,
        }}
        highlightDateNameStyle={{
          color: COLOR.blue,
          fontFamily: FONT.Nunito_700,
        }}
        highlightDateContainerStyle={{ backgroundColor: COLOR.white }}
        disabledDateNameStyle={{
          color: COLOR.grey,
          fontFamily: FONT.Nunito_700,
        }}
        disabledDateNumberStyle={{ color: COLOR.grey }}
        datesWhitelist={datesWhitelist}
        // datesBlacklist={datesBlacklist}
        scrollerPaging
        selectedDate={moment()}
        onDateSelected={(date) => {
          //   alert(moment(date).format("YYYY-MM-DD"));
        }}
        onWeekChanged={(start, end) => {}}
        minDate={getMonday(user.state.createdAt)}
        onHeaderSelected={() =>
          calendarStripRef.current.setSelectedDate(moment())
        }
        markedDates={markedDates}
        ref={calendarStripRef}
      />
      <ScrollView>
        <View></View>
      </ScrollView>
    </View>
  );
}

export default TestCalendarScreen;
