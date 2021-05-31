import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryStack,
  VictoryArea,
  VictoryGroup,
  VictoryPolarAxis,
  VictoryLegend,
} from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

const ChartBar = () => {
  return (
    <VictoryChart width={350} theme={VictoryTheme.material}>
      <VictoryBar data={data} x="quarter" y="earnings" />
    </VictoryChart>
  );
};

const ChartColBar = () => {
  return (
    <VictoryStack colorScale={["tomato", "orange", "gold"]}>
      <VictoryBar
        data={[
          { x: "a", y: 2 },
          { x: "b", y: 3 },
          { x: "c", y: 5 },
        ]}
      />
      <VictoryBar
        data={[
          { x: "a", y: 1 },
          { x: "b", y: 4 },
          { x: "c", y: 5 },
        ]}
      />
      <VictoryBar
        data={[
          { x: "a", y: 3 },
          { x: "b", y: 2 },
          { x: "c", y: 6 },
        ]}
      />
    </VictoryStack>
  );
};

const ChartArea = () => {
  return (
    <VictoryStack>
      <VictoryArea
        data={[
          { x: "a", y: 2 },
          { x: "b", y: 3 },
          { x: "c", y: 5 },
        ]}
      />
      <VictoryArea
        data={[
          { x: "a", y: 1 },
          { x: "b", y: 4 },
          { x: "c", y: 5 },
        ]}
      />
      <VictoryArea
        data={[
          { x: "a", y: 3 },
          { x: "b", y: 2 },
          { x: "c", y: 6 },
        ]}
      />
    </VictoryStack>
  );
};

const ChartGroupBar = () => {
  return (
    <VictoryChart>
      <VictoryGroup offset={20} colorScale={"qualitative"}>
        <VictoryBar
          data={[
            { x: 1, y: 1 },
            { x: 2, y: 2 },
            { x: 3, y: 5 },
          ]}
        />
        <VictoryBar
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 1 },
            { x: 3, y: 7 },
          ]}
        />
        <VictoryBar
          data={[
            { x: 1, y: 3 },
            { x: 2, y: 4 },
            { x: 3, y: 9 },
          ]}
        />
      </VictoryGroup>
    </VictoryChart>
  );
};

const ChartAngle = () => {
  return (
    <VictoryChart
      polar
      theme={VictoryTheme.material}
      startAngle={90}
      endAngle={450}
    >
      <VictoryPolarAxis
        tickValues={[0, 45, 90, 135, 180, 225, 270, 315]}
        labelPlacement="vertical"
      />
      <VictoryBar
        style={{ data: { fill: "tomato", width: 30 } }}
        data={[
          { x: 0, y: 2 },
          { x: 60, y: 3 },
          { x: 120, y: 5 },
          { x: 180, y: 4 },
          { x: 240, y: 4 },
          { x: 300, y: 4 },
        ]}
      />
    </VictoryChart>
  );
};

const ChartLengend = () => {
  return (
    <VictoryChart domain={[0, 10]}>
      <VictoryLegend
        x={125}
        y={50}
        title="Legend"
        centerTitle
        orientation="horizontal"
        gutter={20}
        style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
        data={[
          { name: "One", symbol: { fill: "tomato", type: "star" } },
          { name: "Two", symbol: { fill: "orange" } },
          { name: "Three", symbol: { fill: "gold" } },
        ]}
      />
      <VictoryBar
        data={[
          { x: 2, y: 6, fill: "tomato" },
          { x: 4, y: 4, fill: "orange" },
          { x: 6, y: 2, fill: "gold" },
          { x: 8, y: 4, fill: "tomato" },
        ]}
      />
    </VictoryChart>
  );
};

const ChartRunningScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ChartLengend></ChartLengend>
        <ChartAngle></ChartAngle>
        <ChartBar></ChartBar>
        <ChartArea></ChartArea>
        <ChartColBar></ChartColBar>
        <ChartGroupBar></ChartGroupBar>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});

export default ChartRunningScreen;
