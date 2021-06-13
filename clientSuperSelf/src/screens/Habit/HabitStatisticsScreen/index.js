import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
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

const HabitStatisticsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const user = useUser();
  const userJoinDate = getDateNoTime(user.state.createdAt);

  const isFocused = useIsFocused();

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
        // console.log(res.data);
        setListHabits(res.data);
      })
      .catch((error) => {
        alert("Error when getting habits", error);
        console.log("Error when getting habits", error);
      })
      .finally(() => setLoading(false));
  }, [selectDate, isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={[styles.content, { marginTop: 50 }]}>
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
        position="bottomRight"
        onPress={() => navigation.navigate("Add Habit")}
      >
        <Entypo name="plus" size={24} color={COLOR.white} />
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
