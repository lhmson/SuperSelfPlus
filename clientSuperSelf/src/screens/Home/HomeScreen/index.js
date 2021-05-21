import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import MyButton from "../../../components/MyButton";
import { UserContext } from "../../../context/UserContext";

function HomeScreen({ navigation }) {
  const user = useContext(UserContext);
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <MyText b6>Home screen edit</MyText>
        <MyButton onPress={() => navigation.navigate("Home 1")}>
          <MyText>View</MyText>
        </MyButton>
        <MyText>{JSON.stringify(user)}</MyText>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
