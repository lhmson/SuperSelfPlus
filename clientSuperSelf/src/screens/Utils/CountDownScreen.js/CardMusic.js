import React, { useState, useEffect } from "react";
import { View, Image, Dimensions } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

import { Audio } from "expo-av";
import { useIsFocused } from "@react-navigation/native";

import ButtonControl from "./ButtonControl";

function CardMusic() {
  const [isPlaying, setIsPlaying] = useState(false);

  const [soundEffect, setSoundEffect] = React.useState();
  const isFocused = useIsFocused();
  //#region sound BG

  async function playBGSound() {
    if (isPlaying) {
      const { sound } = await Audio.Sound.createAsync(
        require("../../../utils/resources/sound/soundBGWorld.mp3")
      );
      sound.setIsLoopingAsync(true);
      setSoundEffect(sound);
      await sound.replayAsync();
    }
  }

  useEffect(() => {
    //TODO: play correct sound
    if (isPlaying) playBGSound();
    return soundEffect
      ? () => {
          console.log("Unloading Sound");
          soundEffect.unloadAsync();
        }
      : undefined;
  }, [soundEffect, isPlaying]);

  //#endregion

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
