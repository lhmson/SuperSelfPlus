import React, { useState } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "../styles";
import { MaterialIcons } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import moment from "moment";

import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import Loading from "../../../components/Loading";
import MyTextInput from "../../../components/MyTextInput";
import MyCard from "../../../components/MyCard";
import MySwitch from "../../../components/MySwitch";
import MyFloatingButton from "../../../components/MyFloatingButton";

import * as apiHabit from "../../../api/habit";
import { useUser } from "../../../context/UserContext";

const HabitItem = ({ item, navigation }) => {
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
            navigation.navigate("Detail Habit", { item: item });
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
        <TouchableOpacity
          onPress={() => {
            alert("kind", item.personalHabitId.habitId.kind);
          }}
        >
          <View>
            <MaterialIcons
              name={
                item.personalHabitId.habitId.kind === "Run"
                  ? "run-circle"
                  : item.personalHabitId.habitId.kind === "Do"
                  ? "check-circle"
                  : "remove-circle"
              }
              size={24}
              color={COLOR.black} // handle history complete for today and turn green
            />
          </View>
        </TouchableOpacity>
      </View>
    </MyCard>
  );
};

export default HabitItem;
