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
import { width } from "../../../constants/dimensions";

function EventCard({ item, navigation }) {
  const ImageDemo = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Detail Event");
        }}
      >
        <ImageBackground
          source={{
            uri: "https://i.pinimg.com/564x/98/5c/4b/985c4beecb162508e539f514ac0ff0cf.jpg",
          }}
          style={{
            width: width - 32,
            height: width * 0.5,
            resizeMode: "cover",
            justifyContent: "flex-end",
            flexDirection: "row",
            paddingRight: 20,
          }}
          borderRadius={30}
        >
          <MyButton style={{ width: 120, height: 30 }}>
            <MyText size6 color={COLOR.white}>
              Coming soon
            </MyText>
          </MyButton>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const ViewInfoEvent = () => {
    return (
      <View
        style={{
          padding: 8,
          justifyContent: "flex-start",
          alignSelf: "flex-start",
        }}
      >
        <MyText size5 b5>
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
          width: width - 32,
          paddingTop: 0,
          marginTop: -16,
        }}
      >
        <MyButton
          style={{ width: width * 0.3, height: 50 }}
          color={COLOR.white}
          onPress={() => {
            navigation.navigate("Detail Event", { item: item });
          }}
        >
          <MyText color={COLOR.orange} b5>
            Detail
          </MyText>
        </MyButton>
        <MyButton
          style={{ width: width * 0.5, height: 50 }}
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
    <MyCard
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: width - 20,
        // borderRadius: 30,
        borderColor: COLOR.green,
        borderSize: 5,
        padding: 0,
      }}
    >
      <ImageDemo />
      <ViewInfoEvent />
      <ButtonFooter />
    </MyCard>
  );
}

export default EventCard;
