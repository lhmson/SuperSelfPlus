import React, { useEffect, useRef, useState, useMemo } from "react";
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

import HabitItem from "./HabitItem";

import * as apiHabit from "../../../api/habit";
import { useUser } from "../../../context/UserContext";
import FONT from "../../../constants/font";
import { getDateNoTime, getMonday } from "../../../utils/datetime";

const HabitsScreen = ({ navigation }) => {
  const user = useUser();
  const userJoinDate = getDateNoTime(user.state.createdAt);

  const isFocused = useIsFocused();

  const [isUpdate, setIsUpdate] = useState(false);

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

    // handle check progress habit
    setIsUpdate(false);
  }, [selectDate, isFocused, isUpdate]);

  const renderHabit = ({ item }) => {
    return (
      <HabitItem
        item={item}
        navigation={navigation}
        setIsUpdate={setIsUpdate}
      />
    );
  };

  const filterItems = useMemo(() => {
    switch (selectMenu) {
      case 1:
        return listHabits;
      case 2:
        return listHabits.filter((item) => !item.completed);
      case 3:
        return listHabits.filter((item) => item.completed);
      default:
    }
  }, [selectMenu, listHabits]);

  return (
    <View style={{ flex: 1 }}>
      <CalendarStrip
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
        // calendarAnimation={{ type: "sequence", duration: 30 }}
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
        selectedDate={selectDate}
        onDateSelected={(date) => {
          // console.log(getDateNoTime(date));
          setSelectDate(getDateNoTime(date));
        }}
        minDate={getDateNoTime(getMonday(user.state.createdAt))}
        onHeaderSelected={() =>
          calendarStripRef.current.setSelectedDate(moment())
        }
        // markedDates={markedDates}
        // scrollToOnSetSelectedDate={false}
        ref={calendarStripRef}
      />
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

          <View>
            {loading ? (
              <SkeletonSample />
            ) : (
              <>
                <FlatList
                  data={selectMenu === 1 ? listHabits : filterItems}
                  renderItem={renderHabit}
                  keyExtractor={(item, index) => index.toString()}
                  removeClippedSubviews={true} // Unmount components when outside of window
                  initialNumToRender={2} // Reduce initial render amount
                  maxToRenderPerBatch={1} // Reduce number in each render batch
                  updateCellsBatchingPeriod={1200} // Increase time between renders
                  windowSize={7} // Reduce the window size
                  ListFooterComponent={() => (
                    <FooterList title={"Get your dream come true"} />
                  )}
                  showsVerticalScrollIndicator={false}
                />
              </>
            )}
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

export default HabitsScreen;
