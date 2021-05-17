import React from "react";
import { View } from "react-native";
import MyText from "../../components/MyText";
import styles from "./styles";

function AboutScreen() {
  return (
    <View style={styles.container}>
      <MyText b6>About screen</MyText>
    </View>
  );
}

export default AboutScreen;
