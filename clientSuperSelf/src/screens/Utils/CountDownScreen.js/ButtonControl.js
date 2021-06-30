import React from "react";
import { View, Image, Dimensions } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

function ButtonControl({ isPlaying, setIsPlaying }) {
  const ImagePause = () => {
    return (
      <Image
        source={require("../../../utils/resources/pngwing.com.png")}
        style={{ width: 30, height: 30, resizeMode: "contain" }}
      ></Image>
    );
  };

  const ViewRectangle = () => {
    return (
      <View
        style={{
          width: 0,
          height: 0,
          backgroundColor: "transparent",
          borderStyle: "solid",
          borderLeftWidth: 20,
          borderTopWidth: 10,
          borderBottomWidth: 10,
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "white",
        }}
      ></View>
    );
  };

  return (
    <MyButton
      color={isPlaying ? COLOR.orange : COLOR.green}
      onPress={() => {
        setIsPlaying((prev) => !prev);
      }}
      style={{ width: 50, height: 50 }}
    >
      {isPlaying ? <ImagePause /> : <ViewRectangle />}
    </MyButton>
  );
}

export default ButtonControl;
