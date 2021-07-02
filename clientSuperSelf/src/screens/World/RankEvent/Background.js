import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import COLOR from "../../../constants/colors";
import { width, height } from "../../../constants/dimensions";

import { useUser } from "../../../context/UserContext";
import ProfileModal from "../../Profile/ProfileModal";
import Header from "./Header";
import Dashboard from "./Dashboard";

function Background({ navigation }) {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: width,
        height: height,
      }}
    >
      <View>
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/12/4d/e3/124de3d1b5e12f1d8fcec1685e634361.gif",
          }}
          style={{ width: width, height: width * 0.8, resizeMode: "contain" }}
        ></Image>
      </View>

      <View style={{ position: "absolute", bottom: 100, left: 8 }}>
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/41/dc/fc/41dcfccb7cdf1fc8b13020cb57c882ae.gif",
          }}
          style={{
            width: width,
            height: width * 0.4,
            resizeMode: "contain",
            opacity: 0.6,
          }}
        ></Image>
      </View>
      <View style={{ position: "absolute", top: 50, right: 16 }}>
        <Image
          source={require("../../../utils/resources/cupGreen.jpg")}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            opacity: 0.6,
          }}
        ></Image>
      </View>
      <View style={{ position: "absolute", top: 150, left: -32 }}>
        <Image
          source={require("../../../utils/resources/badgesGreen.jpg")}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            opacity: 0.6,
          }}
        ></Image>
      </View>
      <View style={{ position: "absolute", top: 230, right: 8 }}>
        <Image
          source={require("../../../utils/resources/hatGreen.jpg")}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            opacity: 0.6,
          }}
        ></Image>
      </View>
      <View style={{ position: "absolute", top: 400, left: 54 }}>
        <Image
          source={require("../../../utils/resources/badgesGreen.jpg")}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            opacity: 0.6,
          }}
        ></Image>
      </View>
    </View>
  );
}

export default Background;
