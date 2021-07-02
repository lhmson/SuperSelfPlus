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
import COLOR from "../../../constants/colors";
import moment, { ISO_8601 } from "moment";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

import { useUser } from "../../../context/UserContext";
import { width } from "../../../constants/dimensions";

function ProgressBar({ navigation, item, percent }) {
  const _height = 30;
  const _wParent = width - 32;
  const _wChild = percent ? (_wParent * percent) / 100 : 0;
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
