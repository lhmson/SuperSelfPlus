import React from "react";
import { View } from "react-native";
import MyText from "../../../components/MyText/MyText";
import styles from "./styles";

function SettingScreen() {
  return (
    <View style={styles.container}>
      <MyText b6>Setting screen</MyText>
    </View>
  );
}

export default SettingScreen;
