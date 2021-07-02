import React, { useContext, useState } from "react";
import { View } from "react-native";

import COLOR from "../../../constants/colors";
import styles from "../styles";
import { useUser } from "../../../context/UserContext";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

import { width } from "../../../constants/dimensions";

function InfoCard({ navigation, username, userInfo, role, description }) {
  return (
    <View
      style={{
        flexDirection: "column",
        marginTop: 32,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <MyText size4 b6>
            {username}
          </MyText>
          {/* //TODO: setup member premium basic for mobile */}
          <MyText custom1 b4 color={COLOR.green}>
            {role} Member
          </MyText>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <MyText color={COLOR.black} custom1 b2i>
          {description}
        </MyText>

        {/* <CardInfo title="WEIGHT" number={65} unit="kg" />
        <CardInfo title="HEIGHT" number={167} unit="cm" />
        <CardInfo title="AGE" number={21} unit="yo" /> */}
      </View>
    </View>
  );
}

export default InfoCard;
