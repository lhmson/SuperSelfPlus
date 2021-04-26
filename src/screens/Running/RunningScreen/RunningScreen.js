import React from "react";
import { View } from "react-native";
import MyText from "../../../components/MyText/MyText";
import styles from "./styles";

function RunningScreen() {
  return (
    <View style={styles.container}>
      <MyText b6>Running screen</MyText>
    </View>
  );
}

export default RunningScreen;
