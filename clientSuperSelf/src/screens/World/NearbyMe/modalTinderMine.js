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

function ModalTinderMine({ isOpenTinderMine, setIsOpenTinderMine }) {
  const user = useUser();

  const MainModal = () => {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MyText size4 b7 color={COLOR.green}>
          About me
        </MyText>
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/7e/79/1d/7e791da660ab1d2c7b2f5c4039d4d54c.jpg",
          }}
          style={{
            width: 300,
            height: 300,
            resizeMode: "cover",
            borderRadius: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <MyText size3 b5>
            sanhlike1809
          </MyText>
          <View style={{ width: 16 }}></View>
          <MyText size5 b7>
            21yo
          </MyText>
        </View>
        <View style={{ marginTop: 20 }}></View>
      </View>
    );
  };

  return (
    <View style={{ zIndex: 100 }}>
      <Modal isVisible={isOpenTinderMine}>
        <MyCard style={{ flexDirection: "column" }}>
          <MainModal></MainModal>
        </MyCard>
      </Modal>
    </View>
  );
}

export default ModalTinderMine;
