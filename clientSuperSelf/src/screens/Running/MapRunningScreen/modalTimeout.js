import React, { useState } from "react";
import { View, Image } from "react-native";
import Modal from "react-native-modal";
import MyCard from "../../../components/MyCard/index";
import MyButton from "../../../components/MyButton/index";
import MyText from "../../../components/MyText/index";

import COLOR from "../../../constants/colors";

function ModalTimeOut({ isOpenModalTimeOut, ListCardRun, onPressStop }) {
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
        <ListCardRun></ListCardRun>
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
        <MyButton color={COLOR.red} onPress={onPressStop}>
          <MyText color={COLOR.white} b6>
            I know, I'll try more!
          </MyText>
        </MyButton>
      </View>
    );
  };
  return (
    <View style={{ zIndex: 100 }}>
      <Modal isVisible={isOpenModalTimeOut}>
        <MyCard style={{ flexDirection: "column" }}>
          <MainModal></MainModal>
          <ButtonFooter></ButtonFooter>
        </MyCard>
      </Modal>
    </View>
  );
}

export default ModalTimeOut;
