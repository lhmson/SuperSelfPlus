import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";

import { useIsFocused } from "@react-navigation/native";
import COLOR from "../../../constants/colors";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

import { useUser } from "../../../context/UserContext";
import ICON from "../../../constants/icon";
import ICONWORLD from "../../../constants/imageWorld";

import { Audio } from "expo-av";
import { height, width } from "../../../constants/dimensions";

function WorldScreen({ navigation }) {
  const [soundEffect, setSoundEffect] = React.useState();
  const isFocused = useIsFocused();
  //#region sound BG
  const [soundBackground, setSoundBackground] = React.useState();
  async function playBGSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../utils/resources/sound/soundBGWorld.mp3")
    );
    sound.setIsLoopingAsync(true);
    setSoundBackground(sound);
    await sound.replayAsync();
  }

  useEffect(() => {
    if (isFocused) playBGSound();
  }, [isFocused]);

  useEffect(() => {
    return soundBackground
      ? () => {
          console.log("Unloading Sound");
          soundBackground.unloadAsync();
        }
      : undefined;
  }, [soundBackground, isFocused]);
  //#endregion

  const UICharacter = () => {
    const W = width;
    const H = width * 1.75;
    const { characters, pets, decorations, angels } = ICONWORLD;

    const Character = ({ codeCharacter }) => {
      return (
        <View
          style={{
            position: "absolute",
            top: W * 0.38,
            left: W * 0.25,
            alignItems: "center",
          }}
        >
          <MyText color="white" b7 size5>
            Level 12 - Bella
          </MyText>
          <Image
            source={characters[codeCharacter ?? 0]}
            style={{
              width: W * 0.5,
              height: W * 0.9,
              resizeMode: "contain",
              marginTop: -W * 0.1,
            }}
          ></Image>
        </View>
      );
    };

    const Pet = ({ codePet }) => {
      return (
        <View
          style={{
            position: "absolute",
            top: W * 0.86,
            left: W * 0.68,
            alignItems: "center",
          }}
        >
          <MyText b5 size6 color="white">
            Rabbit Photographer
          </MyText>
          <Image
            source={pets[codePet ?? 0]}
            style={{ width: W * 0.2, height: W * 0.2, resizeMode: "contain" }}
          ></Image>
        </View>
      );
    };

    const Decorations = () => {
      return (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            alignItems: "center",
          }}
        >
          <Image
            source={decorations[0]}
            style={{
              width: W * 0.5,
              height: W * 0.27,
              resizeMode: "stretch",
            }}
          ></Image>
        </View>
      );
    };

    const Angel = () => {
      return (
        <View
          style={{
            position: "absolute",
            top: W * 0.3,
            left: 8,
            alignItems: "center",
          }}
        >
          <Image
            source={angels[0]}
            style={{
              width: W * 0.3,
              height: W * 0.4,
              resizeMode: "stretch",
            }}
          ></Image>
          <MyText size6 color="white" b3>
            Guardian angel
          </MyText>
        </View>
      );
    };

    const EventButton = () => {
      return (
        <TouchableOpacity
          style={{ position: "absolute", top: W * 1.4, right: 16 }}
          onPress={() => {
            navigation.navigate("Event");
          }}
        >
          <Image
            source={ICONWORLD.event}
            style={{ width: 80, height: 80, resizeMode: "contain" }}
          ></Image>
        </TouchableOpacity>
      );
    };

    return (
      <ImageBackground
        source={ICONWORLD.gifBG}
        resizeMode="stretch"
        style={{ width: W, height: H }}
      >
        <Character codeCharacter={1}></Character>
        <Pet></Pet>
        <Decorations></Decorations>
        <Angel></Angel>
        <EventButton></EventButton>
      </ImageBackground>
    );
  };

  const UIElementsFloat = () => {
    const Shop = () => {
      return (
        <TouchableOpacity
          style={{
            position: "absolute",
            top: height * 0.7,
            left: 8,
            zIndex: 2,
          }}
          onPress={() => {}}
        >
          <Image
            source={ICONWORLD.shop}
            style={{ width: 100, height: 80, resizeMode: "contain" }}
          ></Image>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{ zIndex: 1, position: "absolute", top: 0, left: 0 }}>
        <Shop></Shop>
      </View>
    );
  };
  //#endregion
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: width,
          alignItems: "center",
          justifyContent: "center",
          elevation: 40,
          backgroundColor: "white",
        }}
      >
        <UIElementsFloat></UIElementsFloat>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            zIndex: 0,
          }}
        >
          <UICharacter></UICharacter>
        </ScrollView>
      </View>
    </View>
  );
}

export default WorldScreen;
