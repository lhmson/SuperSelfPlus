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
import ViewInfoEvent from "./ViewInfoEvent";

import { useUser } from "../../../context/UserContext";
import * as apiHabit from "../../../api/habit";
import { width } from "../../../constants/dimensions";
import { dateCompare } from "../../../utils/datetime";

function DetailEventScreen({ navigation, route }) {
  const { item, personalHabit } = route.params;
  // console.log("item", item);
  const user = useUser();

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

  //#region
  const CardEvent = () => {
    const ImageDemo = () => {
      return (
        <ImageBackground
          source={{
            uri:
              item.eventInfo.imageUrl ??
              "https://i.pinimg.com/564x/98/5c/4b/985c4beecb162508e539f514ac0ff0cf.jpg",
          }}
          style={{
            width: width - 32,
            height: width * 0.5,
            resizeMode: "cover",
            justifyContent: "flex-end",
            flexDirection: "row",
            paddingRight: 20,
            marginTop: 0,
          }}
          borderRadius={30}
          elevation={10}
        >
          {dateCompare(item.eventInfo.dateStart, new Date()) === 1 && (
            <MyButton style={{ width: 120, height: 30 }}>
              <MyText size6 color={COLOR.white}>
                COMING SOON
              </MyText>
            </MyButton>
          )}
          {item.eventInfo.listJoiners.indexOf(user.state.uid) !== -1 && (
            <MyButton color={COLOR.yellow} style={{ width: 120, height: 30 }}>
              <MyText size6 b6>
                SIGNED UP
              </MyText>
            </MyButton>
          )}
        </ImageBackground>
      );
    };

    const ButtonFooter = () => {
      return (
        <View
          style={{
            flexDirection: "row",
            padding: 8,
            justifyContent: "center",
            width: width - 32,
            paddingTop: 0,
          }}
        >
          {item.eventInfo.listJoiners.indexOf(user.state.uid) === -1 ? (
            <MyButton
              style={{ width: width * 0.5, height: 50 }}
              color={COLOR.lightGreen}
              onPress={() => {}}
            >
              <MyText color={COLOR.white} b5>
                Join
              </MyText>
            </MyButton>
          ) : (
            <MyButton
              style={{ width: width * 0.5, height: 50 }}
              color={COLOR.lightGreen}
              onPress={() => {
                navigation.navigate("Habit Stats", { item: personalHabit });
              }}
            >
              <MyText color={COLOR.white} b5>
                Visit
              </MyText>
            </MyButton>
          )}
        </View>
      );
    };
    return (
      <MyCard
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: width - 20,
          borderColor: COLOR.green,
          borderSize: 5,
          padding: 0,
        }}
      >
        <ImageDemo />
        <ViewInfoEvent navigation={navigation} item={item} />
        <ButtonFooter />
      </MyCard>
    );
  };
  //#endregion
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
          <CardEvent></CardEvent>
        </ScrollView>
      </View>
    </View>
  );
}

export default DetailEventScreen;
