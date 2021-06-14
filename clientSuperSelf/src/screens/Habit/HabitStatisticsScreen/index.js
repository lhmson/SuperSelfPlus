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
  Dimensions,
  Image,
} from "react-native";
import styled from "styled-components";
import styles from "../styles";
import COLOR from "../../../constants/colors";
import { useUser } from "../../../context/UserContext";
import ICON from "../../../constants/icon";
import MyText from "../../../components/MyText/index";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import MyCard from "../../../components/MyCard/index";

import { VictoryChart, VictoryLine } from "victory-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const _marginText = 8;

const HabitStatisticsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const user = useUser();

  useEffect(() => {}, []);

  //#region
  const HeaderInfoHabit = () => {
    const ProgressBar = ({ percent }) => {
      const _height = 30;
      const _wParent = WIDTH * 0.7;
      const _wChild = (_wParent * percent) / 100;
      return (
        <View
          style={{
            width: _wParent,
            height: _height,
            borderRadius: 30,
            backgroundColor: COLOR.lightGreen,
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
          width: WIDTH,
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
              uri: "https://i.pinimg.com/564x/ec/dc/ac/ecdcac48fde385c87f935e911701ca83.jpg",
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
            width: WIDTH * 0.8,
            flexDirection: "column",
            marginLeft: 16,
          }}
        >
          <View style={{ height: _marginText / 2 }}></View>
          <MyText size3 b7>
            Read
          </MyText>
          <View style={{ height: _marginText }}></View>
          <MyText b4 color={COLOR.orange}>
            16/20
          </MyText>
          <ProgressBar percent={80}></ProgressBar>

          <View
            style={{
              marginTop: _marginText,
              flexDirection: "row",
              justifyContent: "space-between",
              width: WIDTH * 0.6,
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
                Remind
              </MyText>
              <MyText>Set time</MyText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const CalendarHabit = () => {
    return (
      <View style={{ padding: 16 }}>
        <MyCard style={{ alignItems: "center" }}>
          <Calendar
            markingType={"period"}
            markedDates={{
              "2021-06-15": { marked: true, dotColor: COLOR.orange },
              "2021-06-16": { marked: true, dotColor: COLOR.orange },
              "2021-06-21": {
                startingDay: true,
                color: COLOR.green,
                textColor: "white",
              },
              "2021-06-22": { color: COLOR.lightGreen, textColor: "white" },
              "2021-06-23": {
                color: COLOR.lightGreen,
                textColor: "white",
                marked: true,
                dotColor: "white",
              },
              "2021-06-24": { color: COLOR.lightGreen, textColor: "white" },
              "2021-06-25": {
                endingDay: true,
                color: COLOR.green,
                textColor: "white",
              },
            }}
          />
        </MyCard>
      </View>
    );
  };

  const CardStreak = () => {
    return (
      <View style={{ padding: 16 }}>
        <MyCard style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <View style={{ flexDirection: "column", width: "60%" }}>
            <MyText size2 b6>
              13 days
            </MyText>
            <MyText size5>Your current steak</MyText>
            <View style={{ height: _marginText * 3 }}></View>
            <MyText size4 b4>
              5 days
            </MyText>
            <MyText size5>Your longest streak</MyText>
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
                width: WIDTH * 0.3,
                height: WIDTH * 0.3,
                resizeMode: "contain",
              }}
            ></Image>
          </View>
        </MyCard>
      </View>
    );
  };

  const CardChart = () => {
    return (
      <View style={{ padding: 16 }}>
        <MyCard>
          <VictoryChart width={WIDTH * 0.85}>
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
        </MyCard>
      </View>
    );
  };
  //#endregion
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.content}>
          <HeaderInfoHabit></HeaderInfoHabit>
          <CalendarHabit></CalendarHabit>
          <CardStreak></CardStreak>
          <CardChart></CardChart>
        </View>
      </ScrollView>
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
