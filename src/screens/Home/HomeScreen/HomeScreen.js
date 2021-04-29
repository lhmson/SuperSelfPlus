import React, { useState } from "react";
import { View, Alert, Switch, ScrollView } from "react-native";
import MyText from "../../../components/MyText/MyText";
import COLOR from "../../../constants/colors";
import styles from "./styles";

function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <MyText b6>Home screen edit</MyText>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
