import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, ScrollView, Alert, Image } from "react-native";
import styled from "styled-components";
import styles from "../styles";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";
import moment from "moment";
import { Entypo, AntDesign } from "@expo/vector-icons";

import MyButton from "../../../components/MyButton";
import SkeletonSample from "../../../components/SkeletonSample";
import MyFloatingButton from "../../../components/MyFloatingButton";

import { useUser } from "../../../context/UserContext";
import * as apiHabit from "../../../api/habit";

import { dateCompare, getDateNoTime } from "../../../utils/datetime";
import HeaderInfo from "./HeaderInfo";
import CalendarHabit from "./CalendarHabit";
import StreakCard from "./StreakCard";
import BarChartCard from "./BarChartCard";
import LineChartCard from "./LineChartCard";
import { shareHabit } from "../../../utils/share";

const HabitStatisticsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const user = useUser();

  const [loading, setLoading] = useState(true);

  const [numberOfDates, setNumberOfDates] = useState();
  const [listProgress, setListProgress] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [streak, setStreak] = useState();

  const [isActionButton, setIsActionButton] = useState(false);

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

  const handleShareHabit = () => {
    // handle share
    Alert.alert(
      "Do you want to share it with the world?",
      `According to research, this may help you become more motivated to achieve the goal 🏆`,
      [
        {
          text: "No, thank you",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "Yes, I wanna let everyone know",
          onPress: () => {
            shareHabit(item);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleUtils = () => {
    navigation.navigate("");
  };

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
              <BarChartCard item={item} chartProgressData={chartProgressData} />
              <LineChartCard
                numberOfDates={numberOfDates}
                streak={streak}
                chartStreakData={chartStreakData}
              />
            </View>
          </ScrollView>
          {/* action button */}
          <MyFloatingButton
            position="bottomRight"
            onPress={() => navigation.navigate("Edit Habit", { item: item })}
          >
            <Entypo name="edit" size={24} color={COLOR.white} />
          </MyFloatingButton>
          <MyFloatingButton position="bottomLeft" onPress={handleShareHabit}>
            <Entypo name="share" size={24} color={COLOR.white} />
          </MyFloatingButton>

          <MyFloatingButton
            active={isActionButton}
            onPress={() => {
              setIsActionButton((prev) => !prev);
            }}
            position="topRight"
            direction="down"
          >
            <Entypo name="tools" size={24} color={COLOR.white} />
            <MyButton
              onPress={() => navigation.navigate("Countdown", { item: item })}
              style={{ backgroundColor: COLOR.red }}
            >
              <AntDesign name="clockcircle" size={24} color={COLOR.white} />
            </MyButton>
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
