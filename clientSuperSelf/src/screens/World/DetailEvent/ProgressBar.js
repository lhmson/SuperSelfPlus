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

function ProgressBar({ navigation, item, percent }) {
  const _height = 30;
  const _wParent = width - 32;
  const _wChild = percent? (_wParent * percent) / 100 : 0;
  return (
    <View
      style={{
        width: _wParent,
        height: _height,
        borderRadius: 30,
        backgroundColor: COLOR.lightGreen,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          backgroundColor: COLOR.green,
          borderRadius: 30,
          width: _wChild,
          top: 0,
          left: 0,
          height: _height,
        }}
      ></View>

      <MyText size5 color="white">
        {percent}%
      </MyText>
    </View>
  );
}

export default ProgressBar;
