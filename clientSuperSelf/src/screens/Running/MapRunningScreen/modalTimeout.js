import React, { useState } from "react";
import { Button, Text, View, Dimensions, Image } from "react-native";
import Modal from "react-native-modal";
import MyCard from "../../../components/MyCard/index";
import MyButton from "../../../components/MyButton/index";
import MyText from "../../../components/MyText/index";
import MyTextInput from "../../../components/MyTextInput/index";
import MySwitch from "../../../components/MySwitch/index";

import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function ModalTimeOut({ isModalTimeOut, setIsModalTimeOut }) {
  const cancelSetup = () => {
    setIsModalTimeOut(false);
  };

  const MainModal = () => {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/e4/13/d3/e413d32bbb7d25c2f966fdb029bc86bc.jpg",
          }}
          style={{
            width: 400,
            height: 250,
            resizeMode: "center",
          }}
        />
        <View style={{ marginTop: -40 }}></View>
        <MyText>Unfortunately, It was time out!</MyText>
        <View style={{ marginTop: 20 }}></View>
      </View>
    );
  };
  const ButtonFooter = () => {
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
        <MyButton color={COLOR.red} onPress={cancelSetup}>
          <MyText color={COLOR.white} b6>
            OK
          </MyText>
        </MyButton>
      </View>
    );
  };
  return (
    <View style={{ zIndex: 100 }}>
      <Modal isVisible={isModalTimeOut}>
        <MyCard style={{ flexDirection: "column" }}>
          <MainModal></MainModal>
          <ButtonFooter></ButtonFooter>
        </MyCard>
      </Modal>
    </View>
  );
}

export default ModalTimeOut;
