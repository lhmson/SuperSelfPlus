import React from "react";
import { View } from "react-native";

import COLOR from "../../../constants/colors";

import MyButton from "../../../components/MyButton";
import { FontAwesome } from "@expo/vector-icons";

function ButtonControl({ isPlaying, setIsPlaying, playMusic, pauseMusic }) {
  const ImagePause = () => {
    return <FontAwesome name="pause" size={16} color={COLOR.white} />;
  };

  const ImagePlay = () => {
    return <FontAwesome name="play" size={16} color={COLOR.white} />;
  };

  return (
    <MyButton
      color={isPlaying ? COLOR.orange : COLOR.green}
      onPress={() => {
        setIsPlaying((prev) => !prev);
        if (!isPlaying) playMusic();
        else pauseMusic();
      }}
      style={{ width: 50, height: 50 }}
    >
      {isPlaying ? <ImagePause /> : <ImagePlay />}
    </MyButton>
  );
}

export default ButtonControl;
