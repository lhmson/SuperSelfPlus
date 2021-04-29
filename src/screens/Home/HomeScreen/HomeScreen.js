import React, { useState } from "react";
import { View, Alert, Switch, ScrollView } from "react-native";
import MyText from "../../../components/MyText/MyText";
import COLOR from "../../../constants/colors";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";

import MyButton from "../../../components/MyButton/MyButton";
import MyCard from "../../../components/MyCard/MyCard";
import MySwitch from "../../../components/MySwitch/MySwitch";
import { DatePicker } from "native-base";
import Loading from "../../../components/Loading/Loading";
import MyTextInput from "../../../components/MyTextInput/MyTextInput";

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
