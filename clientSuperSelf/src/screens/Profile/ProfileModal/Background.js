import React, { useContext, useState } from "react";
import { View, ScrollView, Image } from "react-native";

import COLOR from "../../../constants/colors";

import { width } from "../../../constants/dimensions";

function Background({ navigation }) {
  return (
    <View
      style={{
        zIndex: 0,
        position: "absolute",
        top: 0,
        left: -12,
      }}
    >
      <Image
        source={{
          uri: "https://i.ibb.co/NT162SF/profile-back.png",
        }}
        style={{
          width: width * 0.85 + 10,
          height: width * 0.3,
          resizeMode: "cover",
          borderRadius: 40,
        }}
      ></Image>
    </View>
  );
}

export default Background;
