import React from "react";
import { View } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import styles from "./styles";

function RunningScreen() {
  return (
    <View style={styles.container}>
      <MyText b6>Running Screen</MyText>
    </View>
  );
}

export default RunningScreen;
