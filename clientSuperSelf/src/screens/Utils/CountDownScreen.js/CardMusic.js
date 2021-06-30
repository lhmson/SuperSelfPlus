import React, { useState } from "react";
import { View, Image, Dimensions } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

import ButtonControl from "./ButtonControl";

function CardMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <MyCard>
      <View
        style={{
          margin: -12,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonControl isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        <View style={{ marginLeft: 16 }}>
          <MyText size6 color={COLOR.grey}>
            Playing music
          </MyText>
          <MyText size5 b7>
            //TODO: add name of select song
          </MyText>
        </View>
      </View>
    </MyCard>
  );
}

export default CardMusic;
