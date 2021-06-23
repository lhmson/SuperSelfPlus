import React, { useState } from "react";
import { View, Dimensions, Image } from "react-native";
import Modal from "react-native-modal";
import MyCard from "../../../components/MyCard/index";
import MyButton from "../../../components/MyButton/index";
import MyText from "../../../components/MyText/index";

import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";
import { updateRunDate, updateRunHabitProgress } from "../../../api/run";
import { useUser } from "../../../context/UserContext";
import { scaleFontSize } from "../../../constants/dimensions";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function ModalFinish({
  isOpenModalFinish,
  setIsOpenModalFinish,
  ListCardRun,
  Steps,
  Distance,
  onPressStop,
  selectEvent,
  selectHabit,
}) {
  const user = useUser();

  const MainModal = () => {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MyText size2 b7 color={COLOR.green}>
          FINISH
        </MyText>
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/30/af/f3/30aff360b79461a9b4c412c882fe5529.jpg",
          }}
          style={{
            width: 200,
            height: 100,
            resizeMode: "contain",
          }}
        />
        <MyText size6 b3i center>
          Congratulations, you have reached your goal!
        </MyText>
        <View style={{ marginTop: 20 }}></View>
      </View>
    );
  };

  const ButtonFooter = () => {
    const saveRunData = async () => {
      updateRunDate(user.state.uid, { steps: Steps, distance: Distance })
        .then((res) => {
          alert("Update run data success");
        })
        .catch((error) => {
          console.log("Error when auto update rundata", error);
        });

      if (selectHabit && selectHabit?.length > 0)
        updateRunHabitProgress(user.state.uid, {
          steps: Steps,
          distance: Distance,
          nameHabit: selectHabit,
        })
          .then((res) => {
            alert("Update habit success");
          })
          .catch((error) => {
            console.log("Error when auto update run habits", error);
          });
      onPressStop();
    };
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          width: "100%",
        }}
      >
        <MyButton color={COLOR.green} onPress={saveRunData}>
          <MyText color={COLOR.white} b6>
            OK
          </MyText>
        </MyButton>
      </View>
    );
  };

  const Confeti = () => {
    return (
      <View style={{ zIndex: 101 }}>
        <Image
          source={require("../../../utils/resources/IconRunning/confeti.gif")}
          style={{ marginTop: -300, resizeMode: "contain", zIndex: 101 }}
        ></Image>
      </View>
    );
  };
  return (
    <View style={{ zIndex: 100 }}>
      <Modal isVisible={isOpenModalFinish}>
        <MyCard style={{ flexDirection: "column" }}>
          <MainModal></MainModal>
          <ListCardRun style={{ zIndex: 100 }}></ListCardRun>
          <ButtonFooter></ButtonFooter>
          <Confeti></Confeti>
        </MyCard>
      </Modal>
    </View>
  );
}

export default ModalFinish;
