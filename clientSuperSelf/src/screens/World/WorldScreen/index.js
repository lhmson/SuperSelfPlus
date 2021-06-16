import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import styled from "styled-components";
import { useIsFocused } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import moment, { ISO_8601 } from "moment";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

import { useUser } from "../../../context/UserContext";
import ICON from "../../../constants/icon";
import ICONWORLD from "../../../constants/imageWorld";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function WorldScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [selectMenu, setSelectMenu] = useState(1);

  //#region
  const UICharacter = () => {
    const W = WIDTH;
    const H = WIDTH * 1.75;
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
        <View style={{ position: "absolute", top: W * 1.4, right: 16 }}>
          <MyButton
            style={{
              backgroundColor: COLOR.green,
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("Event");
            }}
          >
            <MyText size5 b9 color={COLOR.white}>
              Go to Event!
            </MyText>
          </MyButton>
        </View>
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
  //#endregion
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: WIDTH,
          alignItems: "center",
          justifyContent: "center",
          elevation: 40,
          backgroundColor: "white",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <UICharacter></UICharacter>
        </ScrollView>
      </View>
    </View>
  );
}

export default WorldScreen;
