import React, { useContext, useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";

import { width } from "../../../constants/dimensions";

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
