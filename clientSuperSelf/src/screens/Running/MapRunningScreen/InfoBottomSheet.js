import React, { useState, useEffect, useCallback, useMemo } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "react-native";
import MyText from "../../../components/MyText/index";
import MyButton from "../../../components/MyButton/index";
import MyCard from "../../../components/MyCard/index";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";
import CountDown from "react-native-countdown-component";
import BottomSheet from "@gorhom/bottom-sheet";
import { TouchableOpacity, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import ICONWORLD from "../../../constants/imageWorld";
import FONT from "../../../constants/font";
import ModalSetupPlan from "./modalSetupPlan";
import ModalTimeOut from "./modalTimeout";
import ModalFinish from "./modalFinishGoal";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const _marginButton = (WIDTH - 350) / 4;

const InfoBottomSheet = ({
  countDistance,
  countSteps,
  status,
  setStatus,
  setRoadRunCoordinate,
  setCountDistance,
  setCountSteps,
}) => {
  const [planDistance, setPlanDistance] = useState(0);
  const [planMinutes, setPlanMinutes] = useState(0);
  const [planEvent, setPlanEvent] = useState("");
  const [planNoti, setPlanNoti] = useState(false);
  const [planHabitRun, setPlanHabitRun] = useState("");
  const [timeStart, setTimeStart] = useState(new Date());

  const [isOpenModalSetup, setIsOpenModalSetup] = useState(false);
  const [isOpenModalTimeOut, setIsOpenModalTimeOut] = useState(false);
  const [isOpenModalFinish, setIsOpenModalFinish] = useState(false);

  const [pace, setPace] = useState(0); // unit seconds
  const [maxPace, setMaxPace] = useState(0); // unit seconds
  const [updatedPaceTime, setUpdatedPaceTime] = useState(new Date()); // unit date
  const [updatedDistance, setUpdateDistance] = useState(0); // unit number

  const updatePace = () => {
    if (countDistance - updatedDistance >= 1000) {
      let newPace = new Date().getSeconds() - updatedPaceTime.getSeconds();
      if (newPace <= 0) newPace = 0;
      if (maxPace < newPace) setMaxPace(newPace);
      setPace(newPace);
      updatedPaceTime(new Date());
      updatedDistance(countDistance);
    }
  };
  const onPressStop = () => {
    setPlanEvent();
    setPlanHabitRun();
    setTimeStart(new Date());
    setPlanNoti(false);
    setStatus("Not Run");
    setPlanDistance(0);
    setPlanMinutes(0);
    setRoadRunCoordinate([]);
    setIsOpenModalSetup(false);
    setIsOpenModalTimeOut(false);
    setIsOpenModalFinish(false);
    setCountDistance(0);
    setCountSteps(0);
    setPace(0);
    setMaxPace(0);
    setUpdateDistance(0);
    setUpdatedPaceTime(new Date());
  };

  const DestinationFooter = () => {
    const ButtonSetup = () => {
      let totalMinutes =
        planMinutes * 60 - (new Date().getSeconds() - timeStart.getSeconds());
      if (status !== "Run") totalMinutes = 0;
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {status === "Run" && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 24,
                }}
              >
                <CountDown
                  until={totalMinutes}
                  size={25}
                  onFinish={() => {
                    if (status == "Run") setIsOpenModalTimeOut(true);
                  }}
                  digitStyle={{ backgroundColor: COLOR.white }}
                  digitTxtStyle={{
                    color: COLOR.green,
                    fontFamily: FONT.Nunito_700,
                  }}
                  showSeparator
                  separatorStyle={{
                    color: COLOR.green,
                    fontFamily: FONT.Nunito_200,
                  }}
                  timeLabelStyle={{ display: "none" }}
                  timeToShow={["M", "S"]}
                  running={status === "Run"}
                />
              </View>
            )}

            {status !== "Run" && (
              <TouchableOpacity
                onPress={() => {
                  setIsOpenModalSetup(true);
                }}
              >
                <MyButton size5 color={COLOR.green}>
                  <MyText b5 color={COLOR.white}>
                    RUN
                  </MyText>
                </MyButton>
              </TouchableOpacity>
            )}

            {status === "Run" && (
              <TouchableOpacity onPress={onPressStop}>
                <MyButton size5 onPress={() => {}} color={COLOR.green}>
                  <MyText b5 color={COLOR.white}>
                    STOP
                  </MyText>
                </MyButton>
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    };
    const ListCardRun = () => {
      let distanceLeft = planDistance - countDistance;
      if (status !== "Run") {
        distanceLeft = 0;
      }
      if (status === "Run" && distanceLeft <= 0 && !isOpenModalFinish) {
        setIsOpenModalFinish(true);
        distanceLeft = 0;
      }
      return (
        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ width: _marginButton }}></View>
            <MyCard
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                source={ICON.shoe}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <MyText size5 b6>
                {countSteps}
              </MyText>
              <MyText size5 b6>
                steps
              </MyText>
            </MyCard>

            <View style={{ width: _marginButton }}></View>
            <MyCard
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                source={ICON.map}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <MyText size5 b6>
                {countDistance}
              </MyText>
              <MyText size5 b6>
                m done
              </MyText>
            </MyCard>
            <View style={{ width: _marginButton }}></View>
            <MyCard
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                source={ICON.goal}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <MyText size5 b6>
                {distanceLeft}
              </MyText>
              <MyText size5 b6>
                m left
              </MyText>
            </MyCard>

            <View style={{ width: _marginButton }}></View>
          </View>
        </View>
      );
    };
    const ListCardRunBonus = () => {
      updatePace();
      const strPace = pace / 60 + ":" + (pace % 60);
      const strMaxPace = maxPace / 60 + ":" + (maxPace % 60);
      return (
        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ width: _marginButton }}></View>
            <MyCard
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://i.pinimg.com/564x/e6/9b/cd/e69bcd7763bcd01a4722b175158e507c.jpg",
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  resizeMode: "contain",
                }}
              />
              <MyText size5 b6>
                {strPace}
              </MyText>
              <MyText size5 b6>
                pace
              </MyText>
            </MyCard>

            <View style={{ width: _marginButton }}></View>
            <MyCard
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://i.pinimg.com/564x/f5/24/22/f5242280bb28fc29ceb99f19c2e405b0.jpg",
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                }}
              />
              <MyText size5 b6>
                {(countDistance / 16).toFixed(1)}
              </MyText>
              <MyText size5 b6>
                calories
              </MyText>
            </MyCard>
            <View style={{ width: _marginButton }}></View>
            <MyCard
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://i.pinimg.com/564x/b3/20/b9/b320b913f641d79741f8d3a2efce77a7.jpg",
                }}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <MyText size5 b6>
                {strMaxPace}
              </MyText>
              <View style={{ marginLeft: -8, marginRight: -8 }}>
                <MyText size5 b6>
                  max pace
                </MyText>
              </View>
            </MyCard>

            <View style={{ width: _marginButton }}></View>
          </View>
        </View>
      );
    };
    const Event = () => {
      return (
        <MyCard>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: WIDTH - 100,
            }}
          >
            <Image
              source={ICONWORLD.event}
              style={{ width: 40, height: 40, resizeMode: "center" }}
            ></Image>
            <MyText size6 b3i color={COLOR.black}>
              {planEvent}
            </MyText>
          </View>
        </MyCard>
      );
    };
    const Habit = () => {
      return (
        <MyCard>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: WIDTH - 100,
            }}
          >
            <Image
              source={require("../../../utils/resources/superself-icon.png")}
              style={{ width: 40, height: 40, resizeMode: "center" }}
            ></Image>
            <MyText size6 b3i color={COLOR.black}>
              {planHabitRun}
            </MyText>
          </View>
        </MyCard>
      );
    };

    return (
      <View style={styles.bottomSheet}>
        <ModalSetupPlan
          setStatus={setStatus}
          setPlanMinutes={setPlanMinutes}
          setPlanDistance={setPlanDistance}
          setTimeStart={setTimeStart}
          setPlanNoti={setPlanNoti}
          setIsOpenModalSetup={setIsOpenModalSetup}
          isOpenModalSetup={isOpenModalSetup}
          setPlanEvent={setPlanEvent}
          setPlanHabitRun={setPlanHabitRun}
        ></ModalSetupPlan>

        <ModalTimeOut
          isOpenModalTimeOut={isOpenModalTimeOut}
          ListCardRun={ListCardRun}
          onPressStop={onPressStop}
        ></ModalTimeOut>

        <ModalFinish
          isOpenModalFinish={isOpenModalFinish}
          setIsOpenModalFinish={setIsOpenModalFinish}
          ListCardRun={ListCardRun}
          Steps={countSteps}
          Distance={countDistance}
          onPressStop={onPressStop}
          selectHabit={planHabitRun}
        ></ModalFinish>
        <ButtonSetup></ButtonSetup>
        <ListCardRun></ListCardRun>
        <ListCardRunBonus></ListCardRunBonus>
        <Event></Event>
        <Habit></Habit>
      </View>
    );
  };
  // variables
  const snapPoints = useMemo(() => ["2%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet
      // ref={bottomSheetRef}
      borderRadius={30}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      style={{ borderRadius: 30 }}
    >
      <BottomSheetScrollView>
        <DestinationFooter></DestinationFooter>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheet: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: WIDTH,
    paddingHorizontal: 8 * 2,
    borderRadius: 30,
    backgroundColor: COLOR.white,
  },
});

export default InfoBottomSheet;
