import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import styles from "../styles";
import styled from "styled-components";
import { useIsFocused } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import moment, { ISO_8601 } from "moment";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

import EventCard from "./EventCard";

import { useUser } from "../../../context/UserContext";
import * as apiHabit from "../../../api/habit";
import { width } from "../../../constants/dimensions";
import { dateCompare, getDateNoTime } from "../../../utils/datetime";

function DetailEventScreen({ navigation, route }) {
  const { item, personalHabit } = route.params;
  // console.log("item", item);

  // const [personalHabit, setPersonalHabit] = useState();

  // useEffect(() => {
  //   if (item.eventInfo.listJoiners.indexOf(user.state.uid) !== -1) {
  //     apiHabit
  //       .getAHabitOfMe(item._id)
  //       .then((res) => {
  //         setPersonalHabit(res.data);
  //         console.log(res.data);
  //       })
  //       .catch((error) => {
  //         console.log(
  //           "Error when getting personal habit at detail event",
  //           error
  //         );
  //         alert("Error when getting personal habit at detail event");
  //       });
  //   }
  // }, [item]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          marginTop: 0,
          width: width,
          alignItems: "center",
          justifyContent: "center",
          elevation: 40,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EventCard
            navigation={navigation}
            item={item}
            personalHabit={personalHabit}
          />
        </ScrollView>
      </View>
    </View>
  );
}

export default DetailEventScreen;
