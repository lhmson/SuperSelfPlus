import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import MyCard from "../../../components/MyCard/index";
import MyButton from "../../../components/MyButton/index";
import MyText from "../../../components/MyText/index";
import ICONWORLD from "../../../constants/imageWorld";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";
import { Item } from "native-base";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function ModalChooseEvent({ isModalEvent, setIsModalEvent, assignEvent }) {
  const cancelSetup = () => {
    setIsModalEvent(false);
  };

  const chooseEvent = (name, id) => {
    assignEvent(name, id);
    setIsModalEvent(false);
  };

  const MainModal = () => {
    const ItemEvent = (nameEvent, key) => {
      return (
        <TouchableOpacity key={key} onPress={() => chooseEvent(nameEvent, 0)}>
          <MyCard>
            <Image
              source={ICONWORLD.event}
              style={{ width: 30, height: 30, marginRight: 8 }}
            ></Image>
            <MyText size6 b4>
              {nameEvent}
            </MyText>
          </MyCard>
        </TouchableOpacity>
      );
    };
    const ScrollEvent = () => {
      const data = [
        "Cuộc đua kỳ thú 2021",
        "Tốc biến vùng dịch Tháng 8",
        "Cuộc đua ngôi vị sức bền 2021 IV",
      ];
      return (
        <View
          style={{
            width: "95%",
            height: 250,
            borderColor: COLOR.grey,
            borderWidth: 2,
            borderRadius: 20,
            padding: 4,
          }}
        >
          <ScrollView style={{ padding: 8 }}>
            {data.map((event) => ItemEvent(event))}
          </ScrollView>
        </View>
      );
    };
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={ICONWORLD.event}
          style={{
            width: 80,
            height: 80,
            resizeMode: "center",
          }}
        />
        <ScrollEvent></ScrollEvent>
      </View>
    );
  };

  const ButtonFooter = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          padding: 8,
          width: "100%",
        }}
      >
        <MyButton
          style={{ width: 130, height: 40 }}
          color={COLOR.white}
          onPress={cancelSetup}
        >
          <MyText color={COLOR.green} b6>
            Cancel
          </MyText>
        </MyButton>
      </View>
    );
  };
  return (
    <View style={{ zIndex: 100 }}>
      <Modal isVisible={isModalEvent}>
        <MyCard style={{ flexDirection: "column" }}>
          <MainModal></MainModal>
          <ButtonFooter></ButtonFooter>
        </MyCard>
      </Modal>
    </View>
  );
}

export default ModalChooseEvent;
