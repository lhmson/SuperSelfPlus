import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import styles from "../styles";
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
import Timeline from "react-native-timeline-flatlist";
import { width } from "../../../constants/dimensions";
import { dateCompare } from "../../../utils/datetime";
import TimeLineGifts from "./TimeLineGifts";
import ProgressBar from "./ProgressBar";

function ViewInfoEvent({ navigation, item }) {
  const user = useUser();

  return (
    <View style={{ padding: 8, justifyContent: "flex-start" }}>
      <MyText size4 b5 style={{ padding: 8 }}>
        {item?.title}
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
            uri:
              item.imageUrl ??
              "https://i.pinimg.com/564x/21/69/f4/2169f44bbeb03f495d4f24a9bb2ddb2a.jpg",
          }}
          style={{
            width: 30,
            height: 30,
            resizeMode: "center",
            marginRight: 8,
          }}
        />
        <MyText size5>
          <MyText size5>{`${moment(item.eventInfo.dateStart).format(
            "DD/MM/YY"
          )} - ${moment(item.eventInfo.dateEnd).format("DD/MM/YY")}`}</MyText>
        </MyText>

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
        <MyText size5>{item.eventInfo.listJoiners.length}</MyText>
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
        />
        <MyText size5>
          {item.eventInfo.achievement ??
            `Best ${item.title.toUpperCase()} prize`}
        </MyText>
      </View>
      <MyText left size5 style={{ padding: 8 }}>
        {item.description
          ? item.description
          : "Join the event to reach the goal of a better self and show everyone who you are"}
      </MyText>
      {/* TODO: bind progress of self during event */}
      <ProgressBar percent={0} />
      <TimeLineGifts />
    </View>
  );
}

export default ViewInfoEvent;
