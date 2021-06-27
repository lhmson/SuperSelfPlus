import React, { useEffect } from "react";
import { View, ScrollView, Image } from "react-native";
import styles from "../styles";
import COLOR from "../../../constants/colors";
import { Calendar } from "react-native-calendars";

import MyText from "../../../components/MyText";
import MyCard from "../../../components/MyCard";

const CalendarHabit = ({ navigation, route, item, progressDaysObj }) => {
  return (
    <View style={{ padding: 16 }}>
      <MyCard
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Calendar
          markingType={"period"}
          markedDates={
            // "2021-06-15": { marked: true, dotColor: COLOR.orange },
            // "2021-06-16": { marked: true, dotColor: COLOR.orange },
            // "2021-06-21": {
            // startingDay: true,
            // color: COLOR.green,
            // textColor: "white",
            // },
            // "2021-06-22": { color: COLOR.lightGreen, textColor: "white" },
            // "2021-06-23": {
            //   color: COLOR.lightGreen,
            //   textColor: "white",
            //   marked: true,
            //   dotColor: "white",
            // },
            // "2021-06-24": { color: COLOR.lightGreen, textColor: "white" },
            // "2021-06-25": {
            //   endingDay: true,
            //   color: COLOR.green,
            //   textColor: "white",
            // },
            progressDaysObj
          }
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 8,
          }}
        >
          <MyText size5 b5 color={COLOR.green} style={{ marginHorizontal: 4 }}>
            Completed
          </MyText>
          {item.habitId.target && (
            <MyText
              size5
              b5
              color={COLOR.orange}
              style={{ marginHorizontal: 4 }}
            >
              Not completed
            </MyText>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 8,
          }}
        >
          <MyText size5 b5 color={COLOR.grey} style={{ marginHorizontal: 4 }}>
            Skip
          </MyText>

          <MyText size5 b5 color={COLOR.yellow} style={{ marginHorizontal: 4 }}>
            In future
          </MyText>
        </View>
      </MyCard>
    </View>
  );
};

export default CalendarHabit;
