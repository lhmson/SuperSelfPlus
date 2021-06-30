import React, { useEffect } from "react";
import { View, ScrollView, Alert, Image } from "react-native";
import styles from "../styles";
import COLOR from "../../../constants/colors";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";

import MyText from "../../../components/MyText";
import MyCard from "../../../components/MyCard";

import { width } from "../../../constants/dimensions";

const LineChartCard = ({
  navigation,
  route,
  numberOfDates,
  streak,
  chartStreakData,
}) => {
  return (
    <View style={{ padding: 16 }}>
      <MyCard>
        <View style={{ position: "absolute", top: 10, left: 30 }}>
          <MyText size5>streak</MyText>
        </View>
        <ScrollView horizontal>
          <VictoryChart
            width={width * 0.85}
            // domainPadding={{ x: 20 }}
            minDomain={{ x: 0, y: 0 }}
            maxDomain={{ x: numberOfDates + 1, y: streak?.longestStreak + 1 }}
            theme={VictoryTheme.material}
          >
            <VictoryLine
              animate={{
                duration: 2000,
                onLoad: { duration: 5000 },
              }}
              interpolation="natural"
              style={{
                data: { stroke: COLOR.green },
                parent: { border: "3px solid #000" },
              }}
              data={chartStreakData}
            />
          </VictoryChart>
        </ScrollView>
        <View style={{ position: "absolute", bottom: 10, right: 30 }}>
          <MyText size5>day</MyText>
        </View>
      </MyCard>
    </View>
  );
};

export default LineChartCard;
