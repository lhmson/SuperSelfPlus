import React, { useCallback, useMemo, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Image, TouchableOpacity } from "react-native";
import MyText from "../../../components/MyText/index";
import MyButton from "../../../components/MyButton/index";
import MyCard from "../../../components/MyCard/index";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";
import BottomSheet from "@gorhom/bottom-sheet";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const PedometerScreen = ({ navigation }) => {
  const HeaderInfo = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: WIDTH,
        }}
      >
        <MyCard style={{ flexDirection: "row" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Image
              source={{
                uri: "https://i.pinimg.com/564x/aa/18/a9/aa18a9a63f2a6316b4c9d8406f97f55e.jpg",
              }}
              style={{
                width: 100,
                height: 100,
                resizeMode: "cover",
                borderRadius: 50,
              }}
            ></Image>
            <View
              style={{
                position: "absolute",
                top: -5,
                left: -5,
                height: 110,
                width: 110,
              }}
            >
              <Image
                source={ICON.rainbow}
                style={{ width: 110, height: 110, resizeMode: "contain" }}
              ></Image>
            </View>
          </View>
          <View style={{ marginLeft: 16 }}>
            <MyText size4 b7 color={COLOR.green}>
              Hi! Bella
            </MyText>
            <View style={{ height: 10 }}></View>
            <MyText size5 b4 color={COLOR.green}>
              Welcome to Pedometer!
            </MyText>
          </View>
          <View style={{ marginLeft: -50, marginRight: 20, marginTop: -50 }}>
            <Image
              source={ICON.highDegrees}
              style={{ width: 50, height: 50, resizeMode: "cover" }}
            ></Image>
          </View>
        </MyCard>
      </View>
    );
  };

  const PedometerInfo = () => {
    return (
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "center",
          width: WIDTH,
          flexDirection: "row",
          zIndex: 0,
        }}
      >
        <View style={{ flexDirection: "column", zIndex: 2 }}>
          <ImageBackground
            source={ICON.framePedometer}
            style={{
              width: WIDTH / 2.5,
              height: WIDTH / 2.5,
              resizeMode: "stretch",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MyText size4 b6 color={COLOR.green}>
              10023
            </MyText>
            <Image
              source={ICON.shoeRanking}
              style={{ width: 40, height: 40, resizeMode: "contain" }}
            ></Image>
          </ImageBackground>

          <ImageBackground
            source={ICON.framePedometer}
            style={{
              width: WIDTH / 2.5,
              height: WIDTH / 2.5,
              resizeMode: "stretch",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MyText size4 b6 color={COLOR.green}>
              2 m/s
            </MyText>
            <Image
              source={ICON.speed}
              style={{ width: 40, height: 40, resizeMode: "contain" }}
            ></Image>
          </ImageBackground>

          <ImageBackground
            source={ICON.framePedometer}
            style={{
              width: WIDTH / 2.5,
              height: WIDTH / 2.5,
              resizeMode: "stretch",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MyText size4 b6 color={COLOR.green}>
              90
            </MyText>
            <Image
              source={ICON.heart}
              style={{ width: 40, height: 40, resizeMode: "contain" }}
            ></Image>
          </ImageBackground>
        </View>
        <View
          style={{
            flexDirection: "column",
            zIndex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MyCard>
            <View style={{ justifyContent: "flex-start" }}>
              <MyText custom1 b2 color={COLOR.green}>
                Today!
              </MyText>
              <MyText size5 b5 color={COLOR.green}>
                Monday 06/07/2021
              </MyText>
            </View>
          </MyCard>
          <Image
            source={ICON.peopleRun}
            style={{ width: WIDTH / 2, resizeMode: "contain", marginTop: -50 }}
          ></Image>
        </View>
      </View>
    );
  };

  const SheetCalendar = () => {
    // variables
    const snapPoints = useMemo(() => ["2%", "70%"], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
      console.log("handleSheetChanges", index);
    }, []);

    return (
      <BottomSheet
        borderRadius={30}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{ borderRadius: 30, zIndex: 10 }}
      >
        <Calendar
          markingType={"period"}
          markedDates={{
            "2012-05-15": { marked: true, dotColor: "#50cebb" },
            "2012-05-16": { marked: true, dotColor: "#50cebb" },
            "2012-05-21": {
              startingDay: true,
              color: "#50cebb",
              textColor: "white",
            },
            "2012-05-22": { color: "#70d7c7", textColor: "white" },
            "2012-05-23": {
              color: "#70d7c7",
              textColor: "white",
              marked: true,
              dotColor: "white",
            },
            "2012-05-24": { color: "#70d7c7", textColor: "white" },
            "2012-05-25": {
              endingDay: true,
              color: "#50cebb",
              textColor: "white",
            },
          }}
        />
      </BottomSheet>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderInfo></HeaderInfo>
      <PedometerInfo></PedometerInfo>
      <SheetCalendar></SheetCalendar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default PedometerScreen;
