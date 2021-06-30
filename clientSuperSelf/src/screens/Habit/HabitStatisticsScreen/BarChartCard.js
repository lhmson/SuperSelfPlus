import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import styles from "../styles";
import COLOR from "../../../constants/colors";
import { VictoryChart, VictoryBar, VictoryTheme } from "victory-native";

import MyText from "../../../components/MyText";
import MyCard from "../../../components/MyCard";

import { width } from "../../../constants/dimensions";

import { renderColor } from "../../../utils/habitThemes";

const BarChartCard = ({ navigation, route, chartProgressData, item }) => {
  if (!item.habitId.target) {
    return <View></View>;
  }

  return (
    <View style={{ padding: 16 }}>
      <MyCard>
        <View style={{ position: "absolute", top: 10, left: 30 }}>
          <MyText size5>{item.habitId.target?.targetUnit ?? "units"}</MyText>
        </View>
        <ScrollView horizontal>
          <VictoryChart
            width={width * 0.85}
            domainPadding={{ x: 20 }}
            maxDomain={{ y: item.habitId.target?.targetNumber }}
            theme={VictoryTheme.material}
          >
            <VictoryBar
              animate={{
                duration: 2000,
                onLoad: { duration: 5000 },
              }}
              barWidth={10}
              barRatio={0.5}
              style={{
                data: {
                  fill:
                    renderColor(item.habitId.theme) === COLOR.white
                      ? COLOR.green
                      : renderColor(item.habitId.theme),
                },
              }}
              data={chartProgressData}
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

export default BarChartCard;
