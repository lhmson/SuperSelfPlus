import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import COLOR from "../../../constants/colors";

import MyText from "../../../components/MyText";
import MyCard from "../../../components/MyCard";

import ICON from "../../../constants/icon";
import { useUser } from "../../../context/UserContext";

function RankCard({
  navigation,
  avatar,
  username,
  score,
  userId,
  event,
  index,
}) {
  const user = useUser();
  let _iconTop = "";
  if (index == 0) _iconTop = ICON.Top1;
  if (index == 1) _iconTop = ICON.Top2;
  if (index == 2) _iconTop = ICON.Top3;

  const isMySelf = () => {
    return userId === user.state.uid;
  };
  return (
    <TouchableOpacity
      onPress={() => {
        setIsOpenModalProfile(true);
      }}
    >
      <MyCard color={isMySelf() ? COLOR.yellow : COLOR.orange}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: avatar,
            }}
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",
              borderRadius: 50,
              marginRight: 16,
            }}
          ></Image>
          <MyText color={COLOR.white} size5 b4>{`${username}  `}</MyText>
          <MyText color={COLOR.white} size5 b7>
            {`${score} ${event.kind === "Run" ? "km" : ""}`}
          </MyText>
        </View>
        {index <= 2 ? (
          <View style={{ position: "absolute", right: 8, top: 0 }}>
            <Image
              source={_iconTop}
              style={{ width: 30, height: 40, resizeMode: "contain" }}
            ></Image>
          </View>
        ) : null}
      </MyCard>
    </TouchableOpacity>
  );
}

export default RankCard;
