import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
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

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function WorldScreen() {
  const [loading, setLoading] = useState(true);
  const [selectMenu, setSelectMenu] = useState(1);

  //#region
  const HeaderButton = () => {
    const _margin = 20;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "stretch",
          width: WIDTH - 32,
          padding: 8,
        }}
      >
        <MyButton
          long6
          style={{
            backgroundColor: selectMenu === 1 ? COLOR.green : COLOR.whiteSmoke,
            height: 40,
            borderRadius: 40,
          }}
          onPress={() => {
            setSelectMenu(1);
          }}
        >
          <MyText b6 size5 color={selectMenu === 1 ? COLOR.white : COLOR.black}>
            All
          </MyText>
        </MyButton>
        <View style={{ width: _margin }}></View>
        <MyButton
          long6
          style={{
            backgroundColor: selectMenu === 2 ? COLOR.green : COLOR.whiteSmoke,
            height: 40,
            borderRadius: 40,
          }}
          onPress={() => {
            setSelectMenu(2);
          }}
        >
          <MyText b6 size5 color={selectMenu === 2 ? COLOR.white : COLOR.black}>
            New
          </MyText>
        </MyButton>
        <View style={{ width: _margin }}></View>
        <MyButton
          long6
          style={{
            backgroundColor: selectMenu === 3 ? COLOR.green : COLOR.whiteSmoke,
            height: 40,
            borderRadius: 40,
          }}
          onPress={() => {
            setSelectMenu(3);
          }}
        >
          <MyText b6 size5 color={selectMenu === 3 ? COLOR.white : COLOR.black}>
            Joined
          </MyText>
        </MyButton>
      </View>
    );
  };
  const CardEvent = () => {
    const _margin = 8;

    const ImageDemo = () => {
      return (
        <ImageBackground
          source={{
            uri: "https://i.pinimg.com/564x/98/5c/4b/985c4beecb162508e539f514ac0ff0cf.jpg",
          }}
          style={{
            width: WIDTH,
            height: WIDTH * 0.5,
            resizeMode: "cover",
            justifyContent: "flex-end",
            flexDirection: "row",
            paddingRight: 40,
          }}
        >
          <MyButton style={{ width: 120, height: 30, borderRadius: 40 }}>
            <MyText size6 color={COLOR.white}>
              Comming soon
            </MyText>
          </MyButton>
        </ImageBackground>
      );
    };

    const ViewInfoEvent = () => {
      return (
        <View style={{ padding: 8, justifyContent: "flex-start" }}>
          <MyText custom1 b5>
            Cuộc đua vô cực - Trận chiến cuối cùng
          </MyText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Image
              source={{
                uri: "https://i.pinimg.com/564x/21/69/f4/2169f44bbeb03f495d4f24a9bb2ddb2a.jpg",
              }}
              style={{
                width: 30,
                height: 30,
                resizeMode: "center",
                marginRight: 8,
              }}
            ></Image>
            <MyText size5>21/06 - 27/06/2021</MyText>

            <Image
              source={{
                uri: "https://i.pinimg.com/564x/29/d9/bd/29d9bd7885eca021a310207d9c4fd850.jpg",
              }}
              style={{
                width: 30,
                height: 30,
                resizeMode: "center",
                marginRight: 8,
                marginLeft: 32,
              }}
            ></Image>
            <MyText size5>1.834</MyText>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Image
              source={{
                uri: "https://i.pinimg.com/564x/4f/89/61/4f896194e6fdb9acbbc667af58d1d77a.jpg",
              }}
              style={{
                width: 30,
                height: 30,
                resizeMode: "center",
                marginRight: 8,
              }}
            ></Image>
            <MyText size5>Huy hiệu Chiếc giày vô cực</MyText>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Image
              source={ICON.cup}
              style={{
                width: 30,
                height: 30,
                resizeMode: "center",
                marginRight: 8,
              }}
            ></Image>
            <MyText size5>Đua bước chân - Vinh danh Siêu Anh hùng</MyText>
          </View>
        </View>
      );
    };

    const ButtonFooter = () => {
      return (
        <View
          style={{
            flexDirection: "row",
            padding: 8,
            justifyContent: "space-between",
            width: WIDTH - 32,
            paddingTop: 0,
            marginTop: -16,
          }}
        >
          <MyButton
            style={{ width: WIDTH * 0.3, height: 50, borderRadius: 40 }}
            color={COLOR.white}
          >
            <MyText color={COLOR.orange} b5>
              Detail
            </MyText>
          </MyButton>
          <MyButton
            style={{ width: WIDTH * 0.5, height: 50, borderRadius: 40 }}
            color={COLOR.lightGreen}
          >
            <MyText color={COLOR.white} b5>
              Join
            </MyText>
          </MyButton>
        </View>
      );
    };
    return (
      <View style={{ flexDirection: "column", width: "100%" }}>
        <ImageDemo></ImageDemo>
        <ViewInfoEvent></ViewInfoEvent>
        <ButtonFooter></ButtonFooter>
      </View>
    );
  };
  //#endregion
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          marginTop: 16,
          width: WIDTH,
          padding: 16,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
          elevation: 40,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <HeaderButton></HeaderButton>
          <CardEvent></CardEvent>
          <CardEvent></CardEvent>
          <CardEvent></CardEvent>

          <View
            style={{
              height: 50,
              alignItems: "center",
              marginTop: 50,
              width: WIDTH - 32,
            }}
          >
            <MyText>searching...</MyText>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default WorldScreen;
