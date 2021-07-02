import React, { useState } from "react";
import { View, Image, Dimensions } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";

import MyTextInput from "../../../components/MyTextInput";
import MyButton from "../../../components/MyButton";
import Modal from "react-native-modal";

function SetupTimer({
  navigation,
  timer,
  setTimer,
  setKeyTimer,
  isModalSetup,
  setIsModalSetup,
}) {
  const [temp, setTemp] = useState(timer);
  const handleCloseModalSetup = () => {
    setIsModalSetup(false);
  };

  const handleSetupTimer = () => {
    setTimer(temp);
    setIsModalSetup(false);
    setKeyTimer((prev) => prev + 1);
  };

  return (
    <>
      <View>
        <Modal
          onBackButtonPress={handleCloseModalSetup}
          isVisible={isModalSetup}
          propagateSwipe={true}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MyText color={COLOR.white}>Timer</MyText>
            <MyTextInput
              placeholder="Count by minute"
              keyboardType="numeric"
              long3
              onChangeText={(m) => {
                setTemp(Number(m) * 60);
              }}
              color={COLOR.black}
              style={{
                fontSize: 20,
                backgroundColor: COLOR.white,
              }}
            />

            <MyButton long3 color={COLOR.lightBlue} onPress={handleSetupTimer}>
              <MyText color={COLOR.white}>Save</MyText>
            </MyButton>

            <MyButton long3 onPress={handleCloseModalSetup}>
              <MyText color={COLOR.white}>Back</MyText>
            </MyButton>
          </View>
        </Modal>
      </View>
    </>
  );
}

export default SetupTimer;
