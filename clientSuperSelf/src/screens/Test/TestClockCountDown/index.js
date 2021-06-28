import React from "react";
import { View, Image, Dimensions } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import { useUser } from "../../../context/UserContext";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function TestClockScreen() {
  const user = useUser();
  const convertSecondstoMS = (second) => {
    let h = Math.floor(second / (60 * 60));
    let m = Math.floor((second % (60 * 60)) / 60);
    let s = Math.floor(second % 60);
    if (h > 0) return h + "h" + m + "m" + s + "s";
    return m + "m" + s + "s";
  };
  const TitleHabit = () => {
    return (
      <View style={{ padding: 32 }}>
        <MyText color={COLOR.black} b7 size3 center>
          Welcome to Yoga 21 days at home
        </MyText>
      </View>
    );
  };
  const Clock = () => {
    const [isPlaying, setIsPlaying] = React.useState(true);
    const ButtonPauseAndContinue = () => {
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
          color={COLOR.green}
          onPress={() => setIsPlaying((prev) => !prev)}
          style={{ width: 50, height: 50, marginTop: 32 }}
        >
          {isPlaying ? (
            <ImagePause></ImagePause>
          ) : (
            <ViewRectangle></ViewRectangle>
          )}
        </MyButton>
      );
    };
    return (
      <View style={{ alignItems: "center" }}>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          strokeLinecap="round"
          duration={120}
          trailStrokeWidth={20}
          colors={[[COLOR.green, 1]]}
          onComplete={() => [true]}
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
        <ButtonPauseAndContinue></ButtonPauseAndContinue>
      </View>
    );
  };
  const BackGround = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: COLOR.white,
          width: WIDTH,
        }}
      >
        <View style={{ position: "absolute", top: 0, left: 0 }}>
          <Image
            source={require("../../../utils/resources/planet.png")}
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
              marginTop: 16,
            }}
          ></Image>

          <Image
            source={require("../../../utils/resources/planet.png")}
            style={{
              width: 50,
              height: 50,
              resizeMode: "contain",
              marginTop: 16,
              marginLeft: WIDTH * 0.7,
            }}
          ></Image>
        </View>
        <View style={{ position: "absolute", top: 400, right: 0 }}>
          <Image
            source={require("../../../utils/resources/timer.png")}
            style={{
              width: 300,
              height: 100,
              resizeMode: "contain",
            }}
          ></Image>
        </View>
        {/* <View style={{ position: "absolute", top: 0, left: 0 }}> */}
        <Image
          source={require("../../../utils/resources/backgroundTimer.png")}
          style={{
            marginTop: 150,
            width: WIDTH,
            height: 700,
            resizeMode: "cover",
            opacity: 0.6,
          }}
        ></Image>
        {/* </View>  */}
      </View>
    );
  };
  const CardMusic = () => {
    const [isPlayMusic, setIsPlayMusic] = React.useState(false);
    const ButtonPauseAndContinueMusic = () => {
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
          color={COLOR.green}
          onPress={() => {
            setIsPlayMusic(!isPlayMusic);
          }}
          style={{ width: 50, height: 50 }}
        >
          {isPlayMusic ? (
            <ImagePause></ImagePause>
          ) : (
            <ViewRectangle></ViewRectangle>
          )}
        </MyButton>
      );
    };
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
          <ButtonPauseAndContinueMusic></ButtonPauseAndContinueMusic>
          <View style={{ marginLeft: 16 }}>
            <MyText size5 b7>
              Nhạc thiền Yoga không lời
            </MyText>
            <MyText size6 color="grey">
              Yoga Music
            </MyText>
          </View>
        </View>
      </MyCard>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 16,
      }}
    >
      <BackGround></BackGround>
      <TitleHabit></TitleHabit>
      <Clock></Clock>
      <CardMusic></CardMusic>
    </View>
  );
}

export default TestClockScreen;
