import React, { useContext, useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";

import COLOR from "../../../constants/colors";
import styles from "../styles";
import { useUser } from "../../../context/UserContext";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";
import MyFloatingButton from "../../../components/MyFloatingButton";

import { Entypo } from "@expo/vector-icons";
import { width } from "../../../constants/dimensions";
import Avatar from "./Avatar";
import InfoCard from "./InfoCard";
import MyBadges from "./MyBadges";
import MyChart from "./MyChart";
import LogoutBtn from "./LogoutBtn";

function BackgroundCardInfo({ navigation }) {
  return (
    <View
      style={{
        zIndex: 0,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <Image
        source={{
          uri: "https://i.ibb.co/t3X2GGx/profile-bg.png",
        }}
        style={{
          width: width,
          height: width * 0.7,
          resizeMode: "cover",
          borderRadius: 30,
          opacity: 0.4,
        }}
      />
    </View>
  );
}

export default BackgroundCardInfo;
