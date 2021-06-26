import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, ScrollView, Image } from "react-native";
import styled from "styled-components";
import styles from "../styles";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import {
  VictoryChart,
  VictoryLine,
  VictoryBar,
  VictoryTheme,
} from "victory-native";

import MyText from "../../../components/MyText";
import MyCard from "../../../components/MyCard";
import SkeletonSample from "../../../components/SkeletonSample";
import MyFloatingButton from "../../../components/MyFloatingButton";
import MyButton from "../../../components/MyButton";

import { width } from "../../../constants/dimensions";

import { useUser } from "../../../context/UserContext";
import * as apiHabit from "../../../api/habit";
import { dateCompare, getDateNoTime } from "../../../utils/datetime";

const _marginText = 8;

const HabitStatisticsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const user = useUser();

  const [loading, setLoading] = useState(true);

  const [numberOfDates, setNumberOfDates] = useState();
  const [listProgress, setListProgress] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [streak, setStreak] = useState();

  const allDates = useMemo(
    () => listProgress.map((item) => getDateNoTime(item.date)),
    [listProgress]
  );

  // const completeDates = useMemo(
  //   () => completedItems.map((item) => getDateNoTime(item.date)),
  //   [completedItems]
  // );

  const progressDaysObj = useMemo(
    () => ({
      // //TODO: maybe do not have to add this
      // [allDates[0]]: {
      //   startingDay: true,
      //   color: COLOR.yellow,
      //   textColor: "white",
      // },
    }),
    [allDates]
  );

  const chartProgressData = useMemo(
    () =>
      listProgress.map((item, index) => ({
        x: index + 1,
        y: item.progress,
      })),
    [listProgress]
  );

  // console.log(newDaysObject);

  useEffect(() => {
    allDates.forEach((day, index) => {
      progressDaysObj[day] = {
        startingDay: index === 0,
        endingDay: index === allDates.length - 1,
        marked: day === getDateNoTime(new Date()) ? true : false,
        dotColor: COLOR.yellow,
        color:
          dateCompare(getDateNoTime(new Date()), day) === -1
            ? COLOR.yellow
            : listProgress[index].completed
            ? COLOR.green
            : listProgress[index].progress && listProgress[index].progress !== 0
            ? COLOR.orange
            : COLOR.grey,
        textColor: COLOR.white,
      };
    });
  }, [allDates]);

  useEffect(() => {
    apiHabit
      .getMyHabitProgress(item._id)
      .then((res) => {
        setListProgress(res.data.listProgress);
        setNumberOfDates(res.data.numberOfDates);
        setCompletedItems(res.data.completedItems);
        setStreak(res.data.streak);
      })
      .catch((error) => {
        console.log("Error when getting habit progress", error);
        alert("Error when getting habit progress");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //#region
  const HeaderInfoHabit = () => {
    const ProgressBar = ({ percent }) => {
      const _height = 30;
      const _wParent = width * 0.7;
      const _wChild = percent ? (_wParent * percent) / 100 : 0;
      return (
        <View
          style={{
            width: _wParent,
            height: _height,
            borderRadius: 30,
            backgroundColor: COLOR.grey,
          }}
        >
          <View
            style={{
              position: "absolute",
              backgroundColor: COLOR.green,
              borderRadius: 30,
              width: _wChild,
              top: 0,
              left: 0,
              height: _height,
            }}
          ></View>
        </View>
      );
    };
    return (
      <View
        style={{
          padding: 8,
          paddingTop: 16,
          width: width,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 70,
          }}
        >
          <Image
            source={{
              uri: item.habitId.icon,
            }}
            style={{
              width: 70,
              height: 70,
              resizeMode: "contain",
              borderRadius: 100,
            }}
          ></Image>
        </View>
        <View
          style={{
            width: width * 0.8,
            flexDirection: "column",
            marginLeft: 16,
          }}
        >
          {/* <View style={{ height: _marginText / 2 }}></View> */}
          <MyText size3 b7>
            {item.habitId.title}
          </MyText>
          <MyText size5>{item.habitId.description}</MyText>
          <View style={{ height: _marginText }}></View>
          <MyText b4 color={COLOR.orange}>
            {`${completedItems?.length}/${numberOfDates} days`}
          </MyText>
          <ProgressBar
            percent={(completedItems?.length / numberOfDates) * 100}
          />

          <View
            style={{
              marginTop: _marginText,
              flexDirection: "row",
              justifyContent: "space-between",
              width: width * 0.6,
            }}
          >
            <View style={{ alignItems: "flex-start", flexDirection: "column" }}>
              <MyText size5 b2>
                Repeat
              </MyText>
              <MyText>Daily</MyText>
            </View>

            <View style={{ alignItems: "flex-start", flexDirection: "column" }}>
              <MyText size5 b2>
                Reminder
              </MyText>
              <MyText>
                {item.reminder
                  ? moment(item.reminder).format("HH:mm a")
                  : "No setup"}
              </MyText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const CalendarHabit = () => {
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
            <MyText
              size5
              b5
              color={COLOR.green}
              style={{ marginHorizontal: 4 }}
            >
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

            <MyText
              size5
              b5
              color={COLOR.yellow}
              style={{ marginHorizontal: 4 }}
            >
              In future
            </MyText>
          </View>
        </MyCard>
      </View>
    );
  };

  const CardStreak = () => {
    return (
      <View style={{ padding: 16 }}>
        <MyCard style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <View style={{ flexDirection: "column", width: "60%" }}>
            <MyText size5>Current steak</MyText>
            <MyText size2 b6>
              {streak?.currentStreak} days
            </MyText>
            <View style={{ height: _marginText * 3 }}></View>
            <MyText size5>Longest streak</MyText>
            <MyText size4 b4>
              {streak?.longestStreak} days
            </MyText>
          </View>

          <View
            style={{
              width: "40%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={ICON.cup}
              style={{
                width: width * 0.3,
                height: width * 0.3,
                resizeMode: "contain",
              }}
            ></Image>
          </View>
        </MyCard>
      </View>
    );
  };

  const BarChartCard = () => {
    if (!item.habitId.target) {
      return <View></View>;
    }

    return (
      <View style={{ padding: 16 }}>
        <MyCard>
          <View style={{ position: "absolute", top: 10, left: 30 }}>
            <MyText size5>{item.habitId.target?.targetUnit ?? "units"}</MyText>
          </View>
          <ScrollView horizontal>
            <VictoryChart
              width={width * 0.85}
              domainPadding={{ x: 20 }}
              theme={VictoryTheme.material}
            >
              <VictoryBar
                animate={{
                  duration: 2000,
                  onLoad: { duration: 5000 },
                }}
                barWidth={10}
                barRatio={0.5}
                style={{
                  data: {
                    fill:
                      item.habitId.color === COLOR.white
                        ? COLOR.green
                        : item.habitId.color,
                  },
                }}
                data={chartProgressData}
              />
            </VictoryChart>
          </ScrollView>
          <View style={{ position: "absolute", bottom: 10, right: 30 }}>
            <MyText size5>day</MyText>
          </View>
        </MyCard>
      </View>
    );
  };

  const LineChartCard = () => {
    return (
      <View style={{ padding: 16 }}>
        <MyCard>
          <View style={{ position: "absolute", top: 10, left: 30 }}>
            <MyText size5>streak</MyText>
          </View>
          <VictoryChart width={width * 0.85} theme={VictoryTheme.material}>
            <VictoryLine
              animate={{
                duration: 2000,
                onLoad: { duration: 5000 },
              }}
              style={{
                data: { stroke: COLOR.green },
                parent: { border: "3px solid #000" },
              }}
              data={[
                { x: 1, y: 3 },
                { x: 2, y: 12 },
                { x: 3, y: 14 },
                { x: 4, y: 12 },
                { x: 5, y: 8 },
                { x: 6, y: 12 },
                { x: 7, y: 14 },
                { x: 8, y: 33 },
                { x: 9, y: 12 },
                { x: 10, y: 3 },
                { x: 11, y: 5 },
                { x: 12, y: 3 },
                { x: 13, y: 10 },
                { x: 14, y: 22 },
                { x: 15, y: 0 },
                { x: 16, y: 12 },
                { x: 17, y: 17 },
                { x: 18, y: 32 },
                { x: 19, y: 19 },
                { x: 20, y: 15 },
                { x: 21, y: 4 },
              ]}
            />
          </VictoryChart>
          <View style={{ position: "absolute", bottom: 10, right: 30 }}>
            <MyText size5>day</MyText>
          </View>
        </MyCard>
      </View>
    );
  };
  //#endregion
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <SkeletonSample />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            <View style={styles.content}>
              <HeaderInfoHabit></HeaderInfoHabit>
              <CalendarHabit></CalendarHabit>
              <CardStreak></CardStreak>
              <BarChartCard></BarChartCard>
              <LineChartCard></LineChartCard>
            </View>
          </ScrollView>
          {/* action button */}
          <MyFloatingButton
            // active={isActiveFloatingButton}
            position="bottomRight"
            onPress={() => navigation.navigate("Edit Habit", { item: item })}
          >
            <Entypo name="edit" size={24} color={COLOR.white} />
          </MyFloatingButton>
        </>
      )}
    </View>
  );
};

const SelfArea = styled.View`
  background-color: ${COLOR.white};
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default HabitStatisticsScreen;
