import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "react-native";
import { getPreciseDistance } from "geolib";
import * as Location from "expo-location";

import HeaderAddress from "./HeaderAddress";
import MapViewRun from "./MapViewRun";
import InfoBottomSheet from "./InfoBottomSheet";
//#region  global
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
//#endregion
const MapRunningScreen = ({ navigation }) => {
  //#region hook
  const [userLocation, setUserLocation] = useState();
  const [roadRunCoordinate, setRoadRunCoordinate] = useState([]);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("Not Run"); // Not Run & Run
  const [countSteps, setCountSteps] = useState(0);
  const [countDistance, setCountDistance] = useState(0);
  //#endregion

  //#region sub function
  const pushCoordinateIntoRoad = (coor) => {
    if (status !== "Run") return;
    //start run
    if (roadRunCoordinate.length === 0) {
      setUserLocation(coor);
      setRoadRunCoordinate([coor]);
      return;
    }

    let preDistance = getPreciseDistance(
      roadRunCoordinate[roadRunCoordinate.length - 1],
      coor
    );
    if (preDistance >= 5 && preDistance <= 50) {
      setCountDistance(countDistance + preDistance);
      setCountSteps(countSteps + Math.floor(Math.random() * 7) + 7);
      setUserLocation(coor);
      setRoadRunCoordinate([...roadRunCoordinate, coor]);
      return;
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  //#endregion

  if (location)
    return (
      <View style={styles.container}>
        <MapViewRun
          location={location}
          pushCoordinateIntoRoad={pushCoordinateIntoRoad}
          roadRunCoordinate={roadRunCoordinate}
        ></MapViewRun>
        <HeaderAddress
          pos={userLocation ?? location?.coords}
          userLocation={userLocation}
          location={location}
        ></HeaderAddress>
        <InfoBottomSheet
          countDistance={countDistance}
          countSteps={countSteps}
          status={status}
          setStatus={setStatus}
          setRoadRunCoordinate={setRoadRunCoordinate}
          setCountDistance={setCountDistance}
          setCountSteps={setCountSteps}
        ></InfoBottomSheet>
      </View>
    );
  return (
    <View style={{ ...styles.container, backgroundColor: "#12C06A" }}>
      <Image
        source={{
          uri: "https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif",
        }}
        style={{
          width: WIDTH,
          height: WIDTH / 2,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapRunningScreen;
