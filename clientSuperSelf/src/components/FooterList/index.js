import React from "react";
import { View } from "react-native";
import { Dimensions } from "react-native";
import MyText from "../MyText";

function FooterList(props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MyText
        style={{
          marginTop: 16,
          marginBottom: Dimensions.get("screen").height / 5,
        }}
      >
        {props.title}
      </MyText>
    </View>
  );
}

export default FooterList;
