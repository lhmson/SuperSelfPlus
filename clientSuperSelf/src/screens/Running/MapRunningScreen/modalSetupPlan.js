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

function ModalSetupPlan({
  statusModal,
  setStatusModal,
  assignMinutes,
  assignDistance,
  assignNoti,
}) {
  const cancelSetup = () => {
    setStatusModal("No Plan");
  };

  const submitPlan = () => {
    setStatusModal("Run");
  };

  const MainSetup = () => {
    const [noti, setNoti] = useState(true);
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={ICON.plan}
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
          }}
        />
        <MyTextInput
          placeholder="Timer (minutes)"
          keyboardType="numeric"
          size4
          long1
          onChangeText={(m) => assignMinutes(Number(m))}
        ></MyTextInput>
        <MyTextInput
          placeholder="Distance (meters)"
          keyboardType="numeric"
          size4
          long1
          onChangeText={(m) => assignDistance(Number(m))}
        ></MyTextInput>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <MySwitch
            onValueChange={() => {
              assignNoti(!noti);
              setNoti(!noti);
            }}
            value={noti}
          ></MySwitch>
          <View style={{ width: 16 }}></View>
          <MyText>Allow notifications</MyText>
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
        <MyButton color={COLOR.white} onPress={cancelSetup}>
          <MyText>Cancel</MyText>
        </MyButton>
        <View style={{ width: WIDTH / 7 }}></View>
        <MyButton color={COLOR.green} onPress={submitPlan}>
          <MyText>Setup</MyText>
        </MyButton>
      </View>
    );
  };
  return (
    <View style={{ zIndex: 100 }}>
      <Modal isVisible={statusModal === "Setup"}>
        <MyCard style={{ flexDirection: "column" }}>
          <MainSetup></MainSetup>
          <ButtonFooter></ButtonFooter>
        </MyCard>
      </Modal>
    </View>
  );
}

export default ModalSetupPlan;