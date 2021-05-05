import React from "react";
import { View } from "react-native";
import MyText from "../../../components/MyText/MyText";
import MyCard from "../../../components/MyCard/MyCard";
import COLOR from "../../../constants/colors";
import styles from "./styles";
import { Pedometer } from "expo-sensors";

function RunningScreen() {
  const [isPedometerAvailable, setIsPedometerAvailable] = React.useState(
    "checking"
  );
  const [pastStepCount, setPastStepCount] = React.useState(0);
  const [currentStepCount, setCurrentStepCount] = React.useState(0);

  React.useEffect(() => {
    _subscribe();
  }, []);

  return (
    <View style={styles.container}>
      <MyText b6>Running Screen</MyText>
      <MyCard>
        <MyText>Pedometer : {currentStepCount} </MyText>
      </MyCard>
    </View>
  );

  function _subscribe() {
    _subscription = Pedometer.watchStepCount((result) => {
      setCurrentStepCount(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        setIsPedometerAvailable(String(result));
      },
      (error) => {
        setIsPedometerAvailable("Could not get isPedometerAvailable: " + error);
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      (result) => {
        setPastStepCount(result.steps);
      },
      (error) => {
        setPastStepCount("Could not get stepCount: " + error);
      }
    );
  }
}

export default RunningScreen;
