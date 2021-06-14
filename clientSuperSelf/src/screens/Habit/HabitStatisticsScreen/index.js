import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Share,
  Platform,
  Alert,
  ImageBackground,
} from "react-native";
import styled from "styled-components";
import styles from "../styles";
import { useIsFocused } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import moment from "moment";

import CalendarStrip from "react-native-calendar-strip";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import Loading from "../../../components/Loading";
import MyTextInput from "../../../components/MyTextInput";
import SkeletonSample from "../../../components/SkeletonSample";
import MyCard from "../../../components/MyCard";
import MySwitch from "../../../components/MySwitch";
import FooterList from "../../../components/FooterList";
import MyFloatingButton from "../../../components/MyFloatingButton";

import * as apiHabit from "../../../api/habit";
import { useUser } from "../../../context/UserContext";
import FONT from "../../../constants/font";
import { getDateNoTime, getMonday } from "../../../utils/datetime";
import useIsMountedRef from "../../../hooks/useIsMountedRef";

const HabitStatisticsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const user = useUser();
  const userJoinDate = getDateNoTime(user.state.createdAt);

  const isFocused = useIsFocused();
  const isMountedRef = useIsMountedRef();

  const [listHabits, setListHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectMenu, setSelectMenu] = useState(1);
  const [selectDate, setSelectDate] = useState(getDateNoTime(new Date()));

  //#region calendar
  const calendarStripRef = useRef();

  let datesWhitelist = [
    {
      start: userJoinDate,
      end: moment().add(21, "days").format("YYYY-MM-DD"), // total 4 days enabled
    },
  ];

  // const markedDates = [
  //   {
  //     date: moment().format("YYYY-MM-DD"),
  //     dots: [
  //       {
  //         color: COLOR.red,
  //         //   selectedColor: COLOR.red,
  //       },
  //       { color: COLOR.purple },
  //       {
  //         color: COLOR.red,
  //       },
  //     ],
  //   },
  //   {
  //     date: moment().add(1, "days").format("YYYY-MM-DD"),
  //     lines: [
  //       {
  //         color: COLOR.green,
  //         //   selectedColor: COLOR.red,
  //       },
  //     ],
  //   },
  // ];

  //#endregion

  useEffect(() => {
    // console.log(getDateNoTime(selectDate));
    apiHabit
      .getMyHabitsOfDate(getDateNoTime(selectDate))
      .then((res) => {
        if (isMountedRef.current) {
          // console.log(res.data);
          setListHabits(res.data);
        }
      })
      .catch((error) => {
        alert("Error when getting habits", error);
        console.log("Error when getting habits", error);
      })
      .finally(() => setLoading(false));
  }, [selectDate, isFocused]);

  const shareIt = async () => {
    console.log(item.personalHabitId.habitId.target);
    try {
      const result = await Share.share(
        {
          ...Platform.select({
            ios: {
              message: `Hey, I am currently setting my goal to become a master of this habit: ${item.personalHabitId.habitId.title.toUpperCase()}\n${
                item.personalHabitId.habitId.target
                  ? `I do it ${item.personalHabitId.habitId.target?.targetNumber} ${item.personalHabitId.habitId.target?.targetUnit} a day `
                  : ""
              }`,
              url: "https://www.facebook.com/superselfapp",
            },
            android: {
              message:
                `Hey, I am currently setting my goal to become a master of this habit ${item.personalHabitId.habitId.title.toUpperCase()}\n${
                  item.personalHabitId.habitId.target
                    ? `I do it ${item.personalHabitId.habitId.target?.targetNumber} ${item.personalHabitId.habitId.target?.targetUnit} a day `
                    : ""
                } ` + "https://www.facebook.com/superselfapp",
            },
          }),
          title: "Habit: " + item.personalHabitId.habitId.title,
        },
        {
          ...Platform.select({
            ios: {
              // iOS only:
              excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
            },
            android: {
              // Android only:
              dialogTitle: "Share : " + item.personalHabitId.habitId.title,
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
            shareIt();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.content}>
          {/* <SelfArea>
            <SearchBar
              placeholder="Search here"
              // onPress={() => alert("onPress")}
              onChangeText={(text) => filterItem(text)}
              onClearPress={() => filterItem("")}
            />
          </SelfArea> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MyButton
              long6
              style={{
                backgroundColor:
                  selectMenu === 1 ? COLOR.green : COLOR.whiteSmoke,
              }}
              onPress={() => {
                setSelectMenu(1);
              }}
            >
              <MyText
                b6
                size5
                color={selectMenu === 1 ? COLOR.white : COLOR.black}
              >
                All
              </MyText>
            </MyButton>
            <MyButton
              long6
              style={{
                backgroundColor:
                  selectMenu === 2 ? COLOR.green : COLOR.whiteSmoke,
              }}
              onPress={() => {
                setSelectMenu(2);
              }}
            >
              <MyText
                b6
                size5
                color={selectMenu === 2 ? COLOR.white : COLOR.black}
              >
                To Do
              </MyText>
            </MyButton>
            <MyButton
              long6
              style={{
                backgroundColor:
                  selectMenu === 3 ? COLOR.green : COLOR.whiteSmoke,
              }}
              onPress={() => {
                setSelectMenu(3);
              }}
            >
              <MyText
                b6
                size5
                color={selectMenu === 3 ? COLOR.white : COLOR.black}
              >
                Done
              </MyText>
            </MyButton>
          </View>
        </View>
      </ScrollView>

      {/* action button */}
      <MyFloatingButton
        // active={isActiveFloatingButton}
        position="bottomLeft"
        onPress={handleShareHabit}
      >
        <Entypo name="share" size={24} color={COLOR.white} />
      </MyFloatingButton>
      <MyFloatingButton
        // active={isActiveFloatingButton}
        position="bottomRight"
        onPress={() => navigation.navigate("Edit Habit", { item: item })}
      >
        <Entypo name="edit" size={24} color={COLOR.white} />
      </MyFloatingButton>
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
