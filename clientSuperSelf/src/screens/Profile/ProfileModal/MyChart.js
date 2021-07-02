import React, { useContext, useState } from "react";
import { View, ScrollView } from "react-native";

import COLOR from "../../../constants/colors";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis,
} from "victory-native";
import { habitThemes } from "../../../utils/habitThemes";

function MyChart({ navigation, numberOfHabitsByThemes }) {
  return (
    <MyCard style={{ justifyContent: "center", flexDirection: "column" }}>
      <VictoryChart
        polar
        theme={VictoryTheme.material}
        animate={{
          duration: 2000,
          easing: "circleIn",
        }}
      >
        {numberOfHabitsByThemes.map((item, i) => {
          return (
            <VictoryPolarAxis
              dependentAxis
              key={i}
              label={item.x}
              labelPlacement="perpendicular"
              style={{
                tickLabels: { fill: "none" },
                axis: { stroke: COLOR.lightGreen },
                axisLabel: { color: COLOR.green },
              }}
              axisValue={item.x}
            />
          );
        })}
        <VictoryBar
          style={{ data: { fill: COLOR.green, width: 25 } }}
          data={numberOfHabitsByThemes}
        />
      </VictoryChart>
      <MyText size5 b6i color="grey">
        User behavior assessment table
      </MyText>
    </MyCard>
  );
}

export default MyChart;
