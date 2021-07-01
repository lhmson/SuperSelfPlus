import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Image } from "react-native";
import * as Location from "expo-location";
import MapTinder from "./MapTinder";
import * as apiTinder from "../../../api/tinder.js";
import { useUser } from "../../../context/UserContext";
//#region  global
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
//#endregion
const NearbyMeScreen = ({ navigation }) => {
  //#region hook
  const [userLocation, setUserLocation] = useState();
  //#endregion
  const user = useUser();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
      console.log("kk", location);
      await apiTinder.updateLocation(user.state.uid, {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);
  //#endregion

  if (userLocation)
    return (
      <View style={styles.container}>
        <MapTinder userLocation={userLocation}></MapTinder>
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

export default NearbyMeScreen;
