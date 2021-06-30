import React from "react";
import { View, Image } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";

function Title({ item }) {
  return (
    <View style={{ padding: 32 }}>
      <MyText color={COLOR.black} b6 size3 center>
        Measure time for {item.habitId.title}
      </MyText>
    </View>
  );
}

export default Title;
