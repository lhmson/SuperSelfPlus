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
        borderRadius: 40,
      }}
    >
      <Image
        source={{
          uri: "https://i.ibb.co/t3X2GGx/profile-bg.png",
        }}
        style={{
          width: width * 0.81,
          height: width * 0.7,
          resizeMode: "cover",
          borderRadius: 40,
          opacity: 0.6,
        }}
      />
    </View>
  );
}

export default BackgroundCardInfo;
