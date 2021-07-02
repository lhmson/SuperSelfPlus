import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";

import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import MyButton from "../../../components/MyButton";

import ButtonControl from "./ButtonControl";

function Clock({ setConfetti, timer, keyTimer }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const convertSecondstoMS = (second) => {
    let h = Math.floor(second / (60 * 60));
    let m = Math.floor((second % (60 * 60)) / 60);
    let s = Math.floor(second % 60);
    if (h > 0) return h + "h" + m + "m" + s + "s";
    return m + "m " + s + "s";
  };

  return (
    <View style={{ alignItems: "center" }}>
      <CountdownCircleTimer
        key={keyTimer}
        isPlaying={isPlaying}
        strokeLinecap="round"
        duration={timer}
        trailStrokeWidth={20}
        colors={[[COLOR.green, 1]]}
        onComplete={() => {
          setConfetti(true);
          setIsPlaying(false);
          //TODO: music
        }}
        size={250}
        trailColor={COLOR.lightGreen}
      >
        {({ remainingTime, animatedColor }) => (
          <View
            style={{
              width: 180,
              height: 180,
              borderRadius: 100,
              backgroundColor: "white",
              elevation: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MyText color={COLOR.green} b7 size4>
              {convertSecondstoMS(remainingTime)}
            </MyText>
          </View>
        )}
      </CountdownCircleTimer>
      <ButtonControl isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </View>
  );
}

export default Clock;
