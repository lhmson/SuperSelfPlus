import React from "react";
import { View, Image, Dimensions } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import { useUser } from "../../../context/UserContext";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";
import Title from "./Title";
import Background from "./Background";
import Clock from "./Clock";
import CardMusic from "./CardMusic";

function CountDownScreen({ navigation, route }) {
  const { item } = route.params;
  console.log(item);
  const user = useUser();

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
      <Clock />
      <CardMusic />
    </View>
  );
}

export default CountDownScreen;
