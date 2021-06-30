import React, { useState, useEffect } from "react";
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
import {
  AnimatedCircularProgress,
  Circle,
} from "react-native-circular-progress";
import { height, width } from "../../../constants/dimensions";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import { useUser } from "../../../context/UserContext";
import { getPedometer } from "../../../api/run";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const RunningHomeScreen = ({ navigation }) => {
  const [pedometer, setPedometer] = useState();
  const user = useUser();
  useEffect(() => {
    (async () => {
      getPedometer(user.state.uid)
        .then((res) => {
          setPedometer(res.data);
        })
        .catch((error) => {
          console.log("Error when get pedometer", error);
        });
    })();
  }, []);

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
  const CircleSteps = () => {
    const ChildrenText = () => {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={ICON.startRun}
            style={{ width: 50, height: 30, resizeMode: "center" }}
          ></Image>
          <MyText size3 b6>
            {pedometer?.totalSteps ?? 32}
          </MyText>
          <MyText size4 b3 color="grey">
            steps
          </MyText>
        </View>
      );
    };
    return (
      <AnimatedCircularProgress
        size={200}
        width={25}
        fill={80}
        tintColor={COLOR.green}
        onAnimationComplete={() => {}}
        backgroundColor={COLOR.lightGreen}
        lineCap="round"
        arcSweepAngle={260}
        rotation={230}
        children={(fill) => <ChildrenText></ChildrenText>}
      />
    );
  };

  const ListCircles = () => {
    const wC = (width - 96) / 3;
    const hC = 100;
    const CircleCalo = () => {
      return (
        <View
          style={{
            width: wC,
            height: hC,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnimatedCircularProgress
            size={80}
            width={10}
            fill={80}
            tintColor={COLOR.orange}
            onAnimationComplete={() => {}}
            backgroundColor="#FFD580"
            lineCap="round"
          />
          <Image
            source={require("../../../utils/resources/fire.png")}
            style={{
              width: 30,
              height: 30,
              resizeMode: "cover",
              position: "absolute",
              top: 25,
              left: 35,
            }}
          ></Image>
          <MyText>{pedometer?.totalCalo ?? 5} kcal</MyText>
        </View>
      );
    };
    const CircleDistance = () => {
      return (
        <View
          style={{
            width: wC,
            height: hC,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnimatedCircularProgress
            size={80}
            width={10}
            fill={80}
            tintColor={COLOR.red}
            onAnimationComplete={() => {}}
            backgroundColor="#FF7F7F"
            lineCap="round"
          />
          <Image
            source={{
              uri: "https://i.pinimg.com/564x/3c/d8/6f/3cd86ff9f776254061963f9d5a0e051d.jpg",
            }}
            style={{
              width: 35,
              height: 35,
              resizeMode: "cover",
              position: "absolute",
              top: 22,
              left: 32,
            }}
          ></Image>
          <MyText>{pedometer?.totalDistance ?? 50} m</MyText>
        </View>
      );
    };
    const CircleTimer = () => {
      let strMin = "0:00";
      if (pedometer?.totalTime) {
        strMin =
          Math.floor(pedometer.totalTime / 60) +
          ":" +
          (pedometer.totalTime % 60);
      }
      return (
        <View
          style={{
            width: wC,
            height: hC,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AnimatedCircularProgress
            size={80}
            width={10}
            fill={80}
            tintColor={COLOR.green}
            onAnimationComplete={() => {}}
            backgroundColor={COLOR.lightGreen}
            lineCap="round"
          />
          <Image
            source={require("../../../utils/resources/clock.png")}
            style={{
              width: 35,
              height: 35,
              resizeMode: "cover",
              position: "absolute",
              top: 22,
              left: 31,
            }}
          ></Image>
          <MyText>{strMin}</MyText>
        </View>
      );
    };
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: width,
        }}
      >
        <CircleCalo></CircleCalo>
        <CircleDistance></CircleDistance>
        <CircleTimer></CircleTimer>
      </View>
    );
  };
  const LineChartCard = () => {
    return (
      <View style={{ padding: 16 }}>
        <MyCard>
          {/* <View style={{ position: "absolute", top: 10, left: 30 }}>
            <MyText size5>streak</MyText>
          </View> */}
          <ScrollView horizontal style={{ marginLeft: -48, marginTop: -32 }}>
            <VictoryChart
              // domainPadding={{ x: 20 }}
              // minDomain={{ x: 0, y: 0 }}
              // maxDomain={{ x: 7, y: 9 }}
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
                  parent: {
                    border: "5px solid #89E219",
                  },
                }}
                data={[
                  { x: 0, y: 3 },
                  { x: 1, y: 3 },
                  { x: 2, y: 5 },
                  { x: 3, y: 4 },
                  { x: 4, y: 8 },
                  { x: 5, y: 7 },
                  { x: 6, y: 9 },
                ]}
              />
              <VictoryAxis
                style={{
                  axis: { stroke: "transparent" },
                  ticks: { stroke: "transparent" },
                  tickLabels: { fill: "transparent" },
                }}
              />
            </VictoryChart>
          </ScrollView>
          {/* <View style={{ position: "absolute", bottom: 10, right: 30 }}>
            <MyText size5>day</MyText>
          </View> */}
        </MyCard>
      </View>
    );
  };

  const BackGround = () => {
    return (
      <View style={{ position: "absolute", top: 150, left: -16, width: width }}>
        <Image
          source={ICON.peopleRun}
          style={{
            width: 150,
            height: 150,
            resizeMode: "contain",
            opacity: 0.5,
          }}
        ></Image>
        <View style={{ position: "absolute", top: 100, right: 0 }}>
          <Image
            source={ICON.goalRunning}
            style={{
              width: 200,
              height: 200,
              resizeMode: "contain",
              opacity: 0.5,
            }}
          ></Image>
        </View>
      </View>
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
          <BackGround></BackGround>
          <OptionTimerRunning></OptionTimerRunning>
          <View
            style={{
              width: width,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircleSteps></CircleSteps>
            <ListCircles></ListCircles>
            <LineChartCard></LineChartCard>
          </View>
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
