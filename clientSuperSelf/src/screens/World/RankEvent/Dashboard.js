import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, ScrollView } from "react-native";
import COLOR from "../../../constants/colors";
import { width, height } from "../../../constants/dimensions";

import RankCard from "./RankCard";

function Dashboard({ navigation, listRank, event }) {
  //   console.log(listRank);
  return (
    <View
      style={{
        width: width - 32,
        height: height * 0.55,
        padding: 32,
        marginTop: 16,
        paddingTop: 16,
      }}
    >
      <ScrollView>
        {listRank?.map((rank, index) => (
          <RankCard
            key={index.toString()}
            avatar={rank?.user?.avatarUrl}
            username={rank?.user?.username}
            score={rank?.score}
            index={index}
            userId={rank?.user._id}
            event={event}
          />
        ))}
        <View style={{ height: 64 }}></View>
      </ScrollView>
    </View>
  );
}

export default Dashboard;
