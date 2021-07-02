import React, { useEffect, useRef, useState } from "react";
import { View, Image, Dimensions } from "react-native";
import COLOR from "../../../constants/colors";
import { Entypo, AntDesign } from "@expo/vector-icons";

import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";
import MyFloatingButton from "../../../components/MyFloatingButton";
import { useUser } from "../../../context/UserContext";

import ConfettiCannon from "react-native-confetti-cannon";

import Title from "./Title";
import Background from "./Background";
import Clock from "./Clock";
import CardMusic from "./CardMusic";
import SetupTimer from "./SetupTimer";

function CountDownScreen({ navigation, route }) {
  const { item } = route.params;
  const user = useUser();

  const [timer, setTimer] = useState(25 * 60);
  const [keyTimer, setKeyTimer] = useState(0);

  const confettiViewRef = useRef();
  const [confetti, setConfetti] = useState(false);

  const [isModalSetup, setIsModalSetup] = useState(false);

  const openModalSetup = () => {
    setIsModalSetup(true);
  };

  useEffect(() => {
    setIsModalSetup(true);
  }, []);

  useEffect(() => {
    if (confetti) {
      confettiViewRef.current.start();
    }
  }, [confetti]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 16,
      }}
    >
      <Background />
      <Title item={item} />
      <Clock setConfetti={setConfetti} keyTimer={keyTimer} timer={timer} />
      <CardMusic />

      <ConfettiCannon
        count={200}
        origin={{ x: 0, y: 0 }}
        fadeOut={true}
        autoStart={false}
        ref={confettiViewRef}
        onAnimationEnd={() => setConfetti(false)}
      />

      <SetupTimer
        timer={timer}
        setTimer={setTimer}
        setKeyTimer={setKeyTimer}
        isModalSetup={isModalSetup}
        setIsModalSetup={setIsModalSetup}
      />

      <MyFloatingButton position="bottomRight" onPress={() => openModalSetup()}>
        <Entypo name="edit" size={24} color={COLOR.white} />
      </MyFloatingButton>
    </View>
  );
}

export default CountDownScreen;
