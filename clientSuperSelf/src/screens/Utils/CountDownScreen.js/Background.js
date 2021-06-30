import React from "react";
import { View, Image, Dimensions } from "react-native";
import COLOR from "../../../constants/colors";
import { width } from "../../../constants/dimensions";

function Background() {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        backgroundColor: COLOR.white,
        width: width,
      }}
    >
      <View style={{ position: "absolute", top: 0, left: 0 }}>
        <Image
          source={require("../../../utils/resources/planet.png")}
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
            marginTop: 16,
          }}
        />

        <Image
          source={require("../../../utils/resources/planet.png")}
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
            marginTop: 16,
            marginLeft: width * 0.7,
          }}
        />
      </View>
      <View style={{ position: "absolute", top: 400, right: 0 }}>
        <Image
          source={require("../../../utils/resources/timer.png")}
          style={{
            width: 300,
            height: 100,
            resizeMode: "contain",
          }}
        ></Image>
      </View>

      <Image
        source={require("../../../utils/resources/backgroundTimer.png")}
        style={{
          marginTop: 150,
          width: width,
          height: 700,
          resizeMode: "cover",
          opacity: 0.6,
        }}
      ></Image>
      {/* </View>  */}
    </View>
  );
}

export default Background;
