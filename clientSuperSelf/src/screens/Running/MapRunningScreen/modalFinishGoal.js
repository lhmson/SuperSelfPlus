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

function ModalFinish({ isModalFinish, setIsModalFinish, Steps, Distance }) {
  const cancelSetup = () => {
    setIsModalFinish(false);
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
        <MyText size2 b7 color={COLOR.green}>
          FINISH
        </MyText>
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/30/af/f3/30aff360b79461a9b4c412c882fe5529.jpg",
          }}
          style={{
            width: WIDTH * 0.8,
            height: WIDTH * 0.4,
            resizeMode: "contain",
          }}
        />
        <MyText center>Congratulations, you have reached your goal!</MyText>
        <View style={{ marginTop: 20 }}></View>
      </View>
    );
  };
  const ListCardRun = () => {
    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
              {Steps ?? 0}
            </MyText>
          </MyCard>
          <View style={{ width: 32 }}></View>
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
              {Distance ?? 0}
            </MyText>
          </MyCard>
        </View>
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
        <MyButton color={COLOR.green} onPress={cancelSetup}>
          <MyText color={COLOR.white} b6>
            OK
          </MyText>
        </MyButton>
      </View>
    );
  };
  return (
    <View style={{ zIndex: 100 }}>
      <Modal isVisible={isModalFinish}>
        <MyCard style={{ flexDirection: "column" }}>
          <MainModal></MainModal>
          <ListCardRun></ListCardRun>
          <ButtonFooter></ButtonFooter>
        </MyCard>
      </Modal>
    </View>
  );
}

export default ModalFinish;
