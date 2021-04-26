import React from "react";
import { View } from "react-native";
import MyText from "../../../components/MyText/MyText";
import styles from "./styles";

function WorldScreen() {
  return (
    <View style={styles.container}>
      <MyText b6>World screen</MyText>
    </View>
  );
}

export default WorldScreen;
