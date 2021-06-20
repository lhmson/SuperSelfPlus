import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import styles from "../styles";
import { MaterialIcons } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import moment from "moment";

import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";

import MyText from "../../../components/MyText";
import MyCard from "../../../components/MyCard";

import * as apiHabit from "../../../api/habit";
import { useUser } from "../../../context/UserContext";
import Icon from "../../../constants/icon";
import CheckButton from "./CheckButton";

const HabitItem = ({ item, navigation, setIsUpdate }) => {
  return (
    <MyCard
      style={{
        backgroundColor: item.personalHabitId.habitId.color,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={{ uri: item.personalHabitId.habitId.icon }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Habit Stats", { item: item.personalHabitId });
          }}
          style={{ flex: 1, marginHorizontal: 15 }}
        >
          <MyText size4>{item.personalHabitId.habitId.title}</MyText>
          <MyText size5 color={COLOR.black}>
            {item.personalHabitId.habitId.description}
          </MyText>

          {/* <MyText color={COLOR.black}>
            Due:{" "}
            {item.dueTime
              ? moment(item.dueTime).format("MMM Do YYYY hh:mm a")
              : "today"}
          </MyText> */}
        </TouchableOpacity>
        <CheckButton item={item} setIsUpdate={setIsUpdate} />
      </View>
      {item.personalHabitId.habitId.eventInfo && (
        <TouchableOpacity onPress={() => {}} style={[styles.iconEventItem, {}]}>
          <Image source={Icon.eventLabel} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      )}
    </MyCard>
  );
};

export default HabitItem;
