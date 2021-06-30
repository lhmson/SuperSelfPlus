import React, { useState } from "react";
import { View, Image } from "react-native";
import styles from "../styles";
import { MaterialIcons } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import moment from "moment";

import { TouchableOpacity } from "@gorhom/bottom-sheet";

import MyText from "../../../components/MyText";
import MyCard from "../../../components/MyCard";

import * as apiHabit from "../../../api/habit";
import { useUser } from "../../../context/UserContext";
import iconsUrl from "../../../utils/resources/iconsUrl";

const HabitItem = ({ item, navigation, theme, action }) => {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <MyCard
        style={{
          backgroundColor: COLOR.white,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (action === "Add") {
              navigation.navigate("Add Habit", {
                suggestItem: item,
                suggestTheme: theme,
              });
            } else if (action === "Edit") {
              navigation.navigate("Edit Habit", {
                suggestItem: item,
                suggestTheme: theme,
              });
            }
          }}
        >
          {/* <Image
            source={{ uri: iconsUrl[0].url }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          /> */}

          <MyText size4>{item.title}</MyText>
          <MyText size5 color={COLOR.black}>
            {item.description}
          </MyText>
        </TouchableOpacity>
      </MyCard>
    </View>
  );
};

export default HabitItem;
