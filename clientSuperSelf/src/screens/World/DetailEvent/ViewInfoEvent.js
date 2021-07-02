import React, { useEffect } from "react";
import { View, Image } from "react-native";
import styles from "../styles";
import COLOR from "../../../constants/colors";
import moment, { ISO_8601 } from "moment";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

import { useUser } from "../../../context/UserContext";
import { width } from "../../../constants/dimensions";

import ProgressBar from "./ProgressBar";

function ViewInfoEvent({ navigation, item, personalHabit }) {
  const user = useUser();

  return (
    <View style={{ padding: 8, justifyContent: "flex-start" }}>
      <MyText size4 b5 style={{ padding: 8 }}>
        {item?.title}
      </MyText>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Image
          source={{
            uri:
              item.imageUrl ??
              "https://i.pinimg.com/564x/21/69/f4/2169f44bbeb03f495d4f24a9bb2ddb2a.jpg",
          }}
          style={{
            width: 30,
            height: 30,
            resizeMode: "center",
            marginRight: 8,
          }}
        />
        <MyText size5>
          <MyText size5>{`${moment(item.eventInfo.dateStart).format(
            "DD/MM/YY"
          )} - ${moment(item.eventInfo.dateEnd).format("DD/MM/YY")}`}</MyText>
        </MyText>

        <Image
          source={{
            uri: "https://i.pinimg.com/564x/29/d9/bd/29d9bd7885eca021a310207d9c4fd850.jpg",
          }}
          style={{
            width: 30,
            height: 30,
            resizeMode: "center",
            marginRight: 8,
            marginLeft: 32,
          }}
        />
        <MyText size5>{item.eventInfo.listJoiners.length}</MyText>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/4f/89/61/4f896194e6fdb9acbbc667af58d1d77a.jpg",
          }}
          style={{
            width: 30,
            height: 30,
            resizeMode: "center",
            marginRight: 8,
          }}
        />
        <View style={{ width: width * 0.8 }}>
          <MyText size5>
            {item.eventInfo.achievement ??
              `Best ${item.title.toUpperCase()} prize`}
          </MyText>
        </View>
      </View>
      <MyText left size5 style={{ padding: 8 }}>
        {item.description
          ? item.description
          : "Join the event to reach the goal of a better self and show everyone who you are"}
      </MyText>
      {/* TODO: bind progress of self during event */}
      <ProgressBar percent={0} />
      <MyButton
        onPress={() => {
          navigation.navigate("Rank Event", { item: "" });
        }}
      >
        <MyText color={COLOR.white}>Go to Ranking</MyText>
      </MyButton>
      {item.eventInfo.listJoiners.indexOf(user.state.uid) === -1 ? (
        <MyButton color={COLOR.lightGreen} onPress={() => {}}>
          <MyText color={COLOR.white} b5>
            Join
          </MyText>
        </MyButton>
      ) : (
        <MyButton
          color={COLOR.lightGreen}
          onPress={() => {
            navigation.navigate("Habit Stats", { item: personalHabit });
          }}
        >
          <MyText color={COLOR.white} b5>
            Visit my progress
          </MyText>
        </MyButton>
      )}
    </View>
  );
}

export default ViewInfoEvent;
