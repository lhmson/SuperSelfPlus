import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import styles from "../styles";
import { Entypo } from "@expo/vector-icons";
import MyButton from "../../../components/MyButton";
import { useUser } from "../../../context/UserContext";

import * as api from "../../../api/post";

function HabitsScreen({ navigation }) {
  const user = useUser();

  useEffect(() => {}, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <MyText b6>Habit screen</MyText>
        <MyButton onPress={() => navigation.navigate("Add Habit")}>
          <MyText>Add habit</MyText>
        </MyButton>
      </View>
    </ScrollView>
  );
}

export default HabitsScreen;
