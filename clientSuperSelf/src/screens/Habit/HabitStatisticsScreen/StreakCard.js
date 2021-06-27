import React, { useEffect } from "react";
import { View, ScrollView, Image } from "react-native";
import styles from "../styles";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";

import MyText from "../../../components/MyText";
import MyCard from "../../../components/MyCard";

import { width } from "../../../constants/dimensions";

const _marginText = 8;

const StreakCard = ({ navigation, route, streak }) => {
  return (
    <View style={{ padding: 16 }}>
      <MyCard style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <View style={{ flexDirection: "column", width: "60%" }}>
          <MyText size5>Current steak</MyText>
          <MyText size2 b6>
            {streak?.currentStreak} days
          </MyText>
          <View style={{ height: _marginText * 3 }}></View>
          <MyText size5>Longest streak</MyText>
          <MyText size4 b4>
            {streak?.longestStreak} days
          </MyText>
        </View>

        <View
          style={{
            width: "40%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={ICON.cup}
            style={{
              width: width * 0.3,
              height: width * 0.3,
              resizeMode: "contain",
            }}
          ></Image>
        </View>
      </MyCard>
    </View>
  );
};

export default StreakCard;
