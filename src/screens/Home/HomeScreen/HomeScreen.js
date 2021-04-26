import React from "react";
import { View } from "react-native";
import MyText from "../../../components/MyText/MyText";
import styles from "./styles";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <MyText b6>Home screen</MyText>
    </View>
  );
}

export default HomeScreen;
