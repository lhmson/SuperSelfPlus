import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, ImageBackground } from "react-native";
import styles from "../styles";
import COLOR from "../../../constants/colors";
import moment, { ISO_8601 } from "moment";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";
import ViewInfoEvent from "./ViewInfoEvent";

import { useUser } from "../../../context/UserContext";
import { width } from "../../../constants/dimensions";
import { dateCompare, getDateNoTime } from "../../../utils/datetime";
import { renderImageEventByTheme } from "../../../utils/habitThemes";

function EventCard({ navigation, route, item, personalHabit }) {
  const user = useUser();

  const ImageDemo = () => {
    return (
      <ImageBackground
        source={{
          uri:
            // item.eventInfo.imageUrl ??
            // "https://i.pinimg.com/564x/98/5c/4b/985c4beecb162508e539f514ac0ff0cf.jpg",
            renderImageEventByTheme(item.theme),
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
        {dateCompare(
          getDateNoTime(item.eventInfo.dateEnd),
          getDateNoTime(new Date())
        ) === -1 && (
          <MyButton color={COLOR.blue} style={{ width: 120, height: 30 }}>
            <MyText size6 color={COLOR.white} b6>
              FINISHED
            </MyText>
          </MyButton>
        )}
        {dateCompare(
          getDateNoTime(item.eventInfo.dateStart),
          getDateNoTime(new Date())
        ) === 1 && (
          <MyButton style={{ width: 120, height: 30 }}>
            <MyText size6 color={COLOR.white} b6>
              COMING
            </MyText>
          </MyButton>
        )}
        {item.eventInfo.listJoiners.indexOf(user.state.uid) !== -1 && (
          <MyButton color={COLOR.yellow} style={{ width: 120, height: 30 }}>
            <MyText size6 color={COLOR.white} b6>
              SIGNED UP
            </MyText>
          </MyButton>
        )}
      </ImageBackground>
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
      <ViewInfoEvent
        navigation={navigation}
        item={item}
        personalHabit={personalHabit}
      />
    </MyCard>
  );
}

export default EventCard;
