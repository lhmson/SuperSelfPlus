import React, { useEffect, useRef, useState, useMemo } from "react";
import { View } from "react-native";
import { width, height } from "../../../constants/dimensions";

import MyText from "../../../components/MyText";
import SkeletonSample from "../../../components/SkeletonSample";
import ICON from "../../../constants/icon";
import { useUser } from "../../../context/UserContext";

import * as apiEvent from "../../../api/event";

import ProfileModal from "../../Profile/ProfileModal";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Background from "./Background";
import Buttons from "./Buttons";

function RankEventScreen({ navigation, route }) {
  const { item } = route.params;
  const user = useUser();
  const [isOpenModalProfile, setIsOpenModalProfile] = useState(false);
  const [listRank, setListRank] = useState([]);

  useEffect(() => {
    apiEvent
      .getHabitRanking(item._id)
      .then((res) => setListRank(res.data))
      .catch((error) => {
        console.log("Error when get habit ranking", error);
        alert("Error when get habit ranking");
      });
  }, []);

  return (
    <View style={{ padding: 16, backgroundColor: "white", height: height }}>
      <ProfileModal
        isVisible={isOpenModalProfile}
        setIsVisible={setIsOpenModalProfile}
        Buttons={Buttons}
      />
      <Background />
      <Header event={item} listRank={listRank} />
      <Dashboard listRank={listRank} event={item} />
    </View>
  );
}

export default RankEventScreen;
