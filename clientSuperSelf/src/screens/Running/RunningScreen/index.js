import React, { useState, useEffect, useContext } from "react";
import { View, Platform } from "react-native";
import MyText from "../../../components/MyText/index";
import MyCard from "../../../components/MyCard/index";
import COLOR from "../../../constants/colors";
import styles from "./styles";
import { Pedometer } from "expo-sensors";
import * as Location from "expo-location";
import { updateRunDate } from "../../../api/run";
import { useUser } from "../.../../../../context/UserContext";

let pastStepCount = 0;

function RunningScreen() {
  //Init Pedometer expo
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [currentStepCount, setCurrentStepCount] = useState(0);
  //Init Location expo
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const [user, setUser] = useContext(UserContext);
  const user = useUser();
  const { username, email, uid, isLoggedIn, avatarUrl } = user.state;

  let _subscription = null;

  useEffect(() => {
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
          Location : {position?.coords?.latitude} {position?.coords?.longitude}{" "}
        </MyText>
      </MyCard>
    </View>
  );

  function _subscribePedometer() {
    // _subscription = Pedometer.watchStepCount((result) => {
    //   console.log(result.steps);
    //   setCurrentStepCount(result.steps);
    // });

    Pedometer.isAvailableAsync().then(
      (result) => {
        setIsPedometerAvailable(String(result));
      },
      (error) => {
        setIsPedometerAvailable("Could not get isPedometerAvailable: " + error);
      }
    );

    Pedometer.watchStepCount((result) => {
      updateRunDate(uid, { steps: result.steps });
      setCurrentStepCount(result.steps);
    });
  }
}

export default RunningScreen;
