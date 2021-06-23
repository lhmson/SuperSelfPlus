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
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import ICONWORLD from "../../../constants/imageWorld";
import FONT from "../../../constants/font";
import ModalSetupPlan from "./modalSetupPlan";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const _marginButton = (WIDTH - 350) / 4;

const InfoBottomSheet = ({
  countDistance,
  countSteps,
  status,
  setStatus,
  setRoadRunCoordinate,
}) => {
  const [planDistance, setPlanDistance] = useState(0);
  const [planMinutes, setPlanMinutes] = useState(0);
  const [planEvent, setPlanEvent] = useState();
  const [planNoti, setPlanNoti] = useState(false);
  const [planHabitRun, setPlanHabitRun] = useState();
  const [timeStart, setTimeStart] = useState(new Date());

  const [isOpenModalSetup, setIsOpenModalSetup] = useState(false);

  const onPressStop = () => {
    setPlanEvent();
    setPlanHabitRun();
    setTimeStart(new Date());
    setPlanNoti(false);
    setStatus("Not Run");
    setPlanDistance(0);
    setPlanMinutes(0);
    setRoadRunCoordinate([]);
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
                  onFinish={() => {}}
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
      if (status === "Run" && distanceLeft <= 0) {
        //TODO : init modal Time out!
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

    const Event = () => {
      return (
        <MyCard
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={ICONWORLD.event}
            style={{ width: 40, height: 40, resizeMode: "center" }}
          ></Image>
          <MyText size5 b6 color={COLOR.black}>
            The Amazing Road 2021
          </MyText>
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
        ></ModalSetupPlan>
        <ButtonSetup></ButtonSetup>
        <ListCardRun></ListCardRun>
        <Event></Event>
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
      <DestinationFooter></DestinationFooter>
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
