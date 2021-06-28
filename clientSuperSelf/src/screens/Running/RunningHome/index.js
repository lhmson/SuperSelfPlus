import * as React from "react";
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

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const RunningHomeScreen = ({ navigation }) => {
  const HeaderInfo = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={ICON.mapMobile}
          style={{
            width: WIDTH * 0.7,
            resizeMode: "contain",
            height: WIDTH * 0.8,
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            paddingTop: 0,
          }}
        >
          <MyText size4 b6>
            RUNNING HOME
          </MyText>
          <MyText center>
            App requires location permission during goal running feature. Hope
            you have the best running experience!
          </MyText>
        </View>
      </View>
    );
  };

  const OptionTimerRunning = () => {
    return (
      <TouchableOpacity
        style={{ padding: 12, marginTop: -16 }}
        onPress={() => {
          navigation.navigate("Goal Running");
        }}
      >
        <MyCard>
          <View style={{ flexDirection: "row", width: "100%" }}>
            {/* <Image
              source={ICON.goalRunning}
              style={{
                position: "absolute",
                top: 0,
                right: 8,
                width: 100,
                resizeMode: "stretch",
                height: 100,
              }}
            /> */}
            <Image
              source={require("../../../utils/resources/trees.jpg")}
              style={{
                position: "absolute",
                bottom: -16,
                left: 0,
                width: 60,
                resizeMode: "stretch",
                height: 60,
                opacity: 0.4,
              }}
            />
            <Image
              source={require("../../../utils/resources/trees.jpg")}
              style={{
                position: "absolute",
                bottom: -16,
                left: 60,
                width: 60,
                resizeMode: "stretch",
                height: 60,
                opacity: 0.4,
              }}
            />
            <Image
              source={require("../../../utils/resources/trees.jpg")}
              style={{
                position: "absolute",
                bottom: -16,
                left: 120,
                width: 60,
                resizeMode: "stretch",
                height: 60,
                opacity: 0.4,
              }}
            />
            <Image
              source={require("../../../utils/resources/earthMap.jpg")}
              style={{
                position: "absolute",
                top: -16,
                right: 0,
                width: 60,
                resizeMode: "stretch",
                height: 60,
                opacity: 0.6,
              }}
            />
            <View style={{ flexDirection: "column", width: "90%" }}>
              <MyText custom1 b5 color={COLOR.green}>
                Goal Running
              </MyText>
              <MyText size5 b5>
                {
                  "Set plan to run on Maps such as running time,distance, number of steps, being reminded when completed."
                }
              </MyText>
            </View>
          </View>
        </MyCard>
      </TouchableOpacity>
    );
  };

  const OptionPedometerRunning = () => {
    return (
      <TouchableOpacity
        style={{ padding: 12, marginTop: -16 }}
        onPress={() => {
          navigation.navigate("Pedometer");
        }}
      >
        <MyCard>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={ICON.goalRunning}
              style={{
                width: 100,
                resizeMode: "contain",
                height: 100,
              }}
            />
            <View style={{ flexDirection: "column", width: WIDTH - 180 }}>
              <MyText custom1 b5>
                Pedometer
              </MyText>
              <MyText size5>
                {
                  "Auto mode measures your steps automatically even when you're not using the app. It's also has current day review mode!"
                }
              </MyText>
            </View>
          </View>
        </MyCard>
      </TouchableOpacity>
    );
  };

  const OptionStatisticRunning = () => {
    return (
      <TouchableOpacity
        style={{ padding: 12, marginTop: -16 }}
        onPress={() => {
          navigation.navigate("Run Charts");
        }}
      >
        <MyCard>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={ICON.goalRunning}
              style={{
                width: 100,
                resizeMode: "contain",
                height: 100,
              }}
            />
            <View style={{ flexDirection: "column", width: WIDTH - 180 }}>
              <MyText custom1 b5>
                Statistic Running
              </MyText>
              <MyText size5>
                {
                  "Charts statistics your running behavior and habits over a period of time, and gives you the most useful advice!"
                }
              </MyText>
            </View>
          </View>
        </MyCard>
      </TouchableOpacity>
    );
  };
  const OptionRankingRunning = () => {
    return (
      <TouchableOpacity
        style={{ padding: 12, marginTop: -16 }}
        onPress={() => {
          navigation.navigate("Rank");
        }}
      >
        <MyCard>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={ICON.goalRunning}
              style={{
                width: 100,
                resizeMode: "contain",
                height: 100,
              }}
            />
            <View style={{ flexDirection: "column", width: WIDTH - 180 }}>
              <MyText custom1 b5>
                Rank Running
              </MyText>
              <MyText size5>
                {
                  "Ranking your running achievements for the past week/month against the world or with your friends."
                }
              </MyText>
            </View>
          </View>
        </MyCard>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            backgroundColor: "white",
          }}
        >
          {/* <HeaderInfo></HeaderInfo> */}
          {/* <OptionRankingRunning></OptionRankingRunning>
          <OptionStatisticRunning></OptionStatisticRunning> */}
          <OptionTimerRunning></OptionTimerRunning>
          {/* <OptionPedometerRunning></OptionPedometerRunning> */}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default RunningHomeScreen;
