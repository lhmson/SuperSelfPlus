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
import HeaderInfo from "./HeaderInfo";
import CalendarHabit from "./CalendarHabit";
import StreakCard from "./StreakCard";

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

  const chartStreakData = useMemo(() => {
    const arr = [{ x: 0, y: 0 }];
    streak?.streakLogs.forEach((item, index) => {
      arr.push({ x: index + 1, y: item });
    });
    return arr;
  }, [streak]);

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
    console.log("start");
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
              maxDomain={{ y: item.habitId.target?.targetNumber }}
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
          <ScrollView horizontal>
            <VictoryChart
              width={width * 0.85}
              // domainPadding={{ x: 20 }}
              minDomain={{ x: 0, y: 0 }}
              maxDomain={{ x: numberOfDates + 1, y: streak?.longestStreak + 1 }}
              theme={VictoryTheme.material}
            >
              <VictoryLine
                animate={{
                  duration: 2000,
                  onLoad: { duration: 5000 },
                }}
                interpolation="natural"
                style={{
                  data: { stroke: COLOR.green },
                  parent: { border: "3px solid #000" },
                }}
                data={chartStreakData}
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
              <HeaderInfo
                item={item}
                completedItems={completedItems}
                numberOfDates={numberOfDates}
              />
              <CalendarHabit item={item} progressDaysObj={progressDaysObj} />
              <StreakCard streak={streak} />
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
