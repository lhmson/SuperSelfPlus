import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, Image, TouchableOpacity } from "react-native";

function Buttons({ navigation }) {
  return (
    <View
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setIsOpenModalProfile(false);
        }}
        style={{ marginRight: 16 }}
      >
        <Image
          source={require("../../../utils/resources/message.png")}
          style={{ width: 30, height: 30 }}
        ></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsOpenModalProfile(false);
        }}
      >
        <Image
          source={require("../../../utils/resources/close.png")}
          style={{ width: 30, height: 30 }}
        ></Image>
      </TouchableOpacity>
    </View>
  );
}

export default Buttons;
