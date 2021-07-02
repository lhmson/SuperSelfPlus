import React, { useEffect, useRef, useState, useMemo } from "react";
import { View } from "react-native";
import COLOR from "../../../constants/colors";

import MyText from "../../../components/MyText";
import { useUser } from "../../../context/UserContext";

function Header({ navigation, event, listRank }) {
  const user = useUser();

  const numberRankOfMe = () => {
    const ranking = listRank.findIndex(
      (item) => item.user._id === user.state.uid
    );
    return ranking + 1;
  };
  return (
    <View style={{ marginTop: 32 }}>
      <MyText color={COLOR.green} b7 size4>
        {event?.title?.toUpperCase()}
      </MyText>
      <View style={{ flexDirection: "row", marginTop: 16 }}>
        <MyText color={COLOR.black} b3 size4>
          {`Your are on `}
        </MyText>
        <MyText color={COLOR.green} b7 size4>
          {numberRankOfMe()}
        </MyText>
        <MyText color={COLOR.black} b3 size4>
          {` place `}
        </MyText>
      </View>
      <MyText color={COLOR.black} b3 size4>
        among all joiners in this event
      </MyText>
    </View>
  );
}

export default Header;
