import React, { useState, useEffect } from "react";
import { View, Platform } from "react-native";
import MyText from "../../../components/MyText/MyText";
import MyCard from "../../../components/MyCard/MyCard";
import COLOR from "../../../constants/colors";
import styles from "./styles";
import { Pedometer } from "expo-sensors";
import * as Location from "expo-location";

function RunningScreen() {
  //Init Pedometer expo
  const [isPedometerAvailable, setIsPedometerAvailable] = React.useState(
    "checking"
  );
  const [pastStepCount, setPastStepCount] = React.useState(0);
  const [currentStepCount, setCurrentStepCount] = React.useState(0);

  //Init Location expo
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  React.useEffect(() => {
    _subscribePedometer();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let position = "Waiting..";
  if (errorMsg) {
    position = errorMsg;
  } else if (location) {
    position = location;
  }

  return (
    <View style={styles.container}>
      <MyText b6>Running Screen</MyText>
      <MyCard style={{ flexDirection: "column" }}>
        <MyText>Pedometer : {currentStepCount} </MyText>
        <MyText>
          Location : {position.coords.latitude} {position.coords.longitude}{" "}
        </MyText>
      </MyCard>
    </View>
  );

  function _subscribePedometer() {
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
