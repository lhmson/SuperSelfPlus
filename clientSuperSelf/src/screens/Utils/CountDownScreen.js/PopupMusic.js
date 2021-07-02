import React, { useState } from "react";
import { View, Dimensions, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import MyCard from "../../../components/MyCard/index";
import MyButton from "../../../components/MyButton/index";
import MyText from "../../../components/MyText/index";
import MyTextInput from "../../../components/MyTextInput/index";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";
import { updateRunDate, updateRunHabitProgress } from "../../../api/run";
import { useUser } from "../../../context/UserContext";
import { scaleFontSize } from "../../../constants/dimensions";
import dataMusic from "../dataMusic";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const formatStr = (str, number) => {
  if (str.length > number) return str.substring(0, number - 1) + "...";
  return str;
};
function PopupMusic({
  isOpenPopup,
  setIsOpenPopup,
  setUrlMusic,
  playNewSound,
  setKindMusic,
  setNameMusic,
  setTime,
}) {
  const user = useUser();

  const CardMusicItem = ({ music }) => {
    return (
      <MyCard>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: WIDTH * 0.65,
          }}
          onPress={async () => {
            setUrlMusic(music.uri);
            setIsOpenPopup(false);
            setKindMusic(music.kind);
            setNameMusic(music.name);
            setTime(music.totalTime);
            await playNewSound(music.uri);
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{
                uri: "https://i.pinimg.com/564x/24/b8/3f/24b83fde3d4393135498f4eb60587d81.jpg",
              }}
              style={{
                width: 40,
                height: 40,
                resizeMode: "cover",
                borderRadius: 50,
              }}
            ></Image>

            <View style={{ flexDirection: "column", marginLeft: 8 }}>
              <MyText size6 b5>
                {formatStr(music.name, 22)}
              </MyText>
              <MyText size6 b3i>
                {formatStr(music.kind, 22)}
              </MyText>
            </View>
          </View>

          <View>
            <MyText size6>1:30:21</MyText>
          </View>
        </TouchableOpacity>
      </MyCard>
    );
  };

  const MainModal = () => {
    let txtSearch = "";
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MyText size5 b7 color={COLOR.green}>
          MUSIC
        </MyText>

        <MyTextInput
          placeholder="search....."
          // keyboardType=""
          size6
          long1
          onChangeText={(txt) => {
            txtSearch = txt;
          }}
        ></MyTextInput>
        {dataMusic.map((music, index) => (
          <CardMusicItem key={index.toString()} music={music}></CardMusicItem>
        ))}
      </View>
    );
  };

  const ButtonFooter = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          width: "100%",
        }}
      >
        <MyButton
          color={COLOR.green}
          onPress={() => {
            setIsOpenPopup(false);
          }}
        >
          <MyText color={COLOR.white} b4 size6>
            Cancel
          </MyText>
        </MyButton>
      </View>
    );
  };

  const Confeti = () => {
    return (
      <View style={{ zIndex: 101 }}>
        <Image
          source={require("../../../utils/resources/IconRunning/confeti.gif")}
          style={{ marginTop: -300, resizeMode: "contain", zIndex: 101 }}
        ></Image>
      </View>
    );
  };
  return (
    <View style={{ zIndex: 100 }}>
      <Modal isVisible={isOpenPopup}>
        <MyCard style={{ flexDirection: "column" }}>
          <MainModal></MainModal>
          <ButtonFooter></ButtonFooter>
          {/* <Confeti></Confeti> */}
        </MyCard>
      </Modal>
    </View>
  );
}

export default PopupMusic;
