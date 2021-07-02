import React, { useState, useEffect } from "react";
import { View, Image, Dimensions } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

import { Audio } from "expo-av";

import ButtonControl from "./ButtonControl";

function CardMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  //#endregion

  const [sound, setSound] = React.useState();

  async function playSound() {
    if (!sound) {
      const { sound } = await Audio.Sound.createAsync(
        // require("../../../utils/resources/sound/soundBGWorld.mp3")
        {
          uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        }
      );
      setSound(sound);
      await sound.playAsync();
    }
    console.log("Playing Sound");
    await sound.playAsync();
  }

  async function pauseSound() {
    console.log("Pause Sound");
    if (sound) await sound.pauseAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

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
        <ButtonControl
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          playMusic={playSound}
          pauseMusic={pauseSound}
        />
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
