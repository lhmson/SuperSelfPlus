import React, { useContext, useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import COLOR from "../../../constants/colors";
import { useUser } from "../../../context/UserContext";
import { logoUrl } from "../../../utils/logo";

function Avatar({ navigation, avatarUrl }) {
  const user = useUser();

  return (
    <View
      style={{
        zIndex: 100,
        position: "absolute",
        top: -50,
        left: 16,
        backgroundColor: COLOR.whiteSmoke,
        borderRadius: 50,
      }}
    >
      <Image
        source={{
          uri: avatarUrl ?? logoUrl,
        }}
        style={{
          width: 100,
          height: 100,
          resizeMode: "cover",
          borderRadius: 50,
        }}
      />
    </View>
  );
}

export default Avatar;
