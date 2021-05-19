import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import MyButton from "../../../components/MyButton";

function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <MyText b6>Home screen edit</MyText>
        <MyButton onPress={() => navigation.navigate("Home 1")}>
          <MyText>View</MyText>
        </MyButton>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
