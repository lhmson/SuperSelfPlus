import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import { Image } from "react-native";
import MyText from "../../../components/MyText/index";
import * as Location from "expo-location";

const WIDTH = Dimensions.get("window").width;

const HeaderAddress = ({ pos, userLocation, location }) => {
  const [address, setAddress] = useState("GPS Loading...");
  useEffect(() => {
    (async () => {
      if (!location) return;
      let add = await Location.reverseGeocodeAsync({
        longitude: pos?.longitude,
        latitude: pos?.latitude,
      });
      add = add[0];
      let convertAddressStr =
        (add.street ? add.street + " - " : "") +
        (add.subregion ?? add.city) +
        " - " +
        add.region;
      setAddress(convertAddressStr);
    })();
  }, [userLocation, location]);
  return (
    <View
      style={{
        position: "absolute",
        top: 20,
        left: 0,
        right: 0,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: WIDTH * 0.9,
          paddingVertical: 8,
          paddingHorizontal: 8 * 2,
          borderRadius: 30,
          backgroundColor: "white",
        }}
      >
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/64/8d/26/648d26dceaa265dc6b9483bf419abe8a.gif",
          }}
          style={{
            width: 30,
            height: 30,
            marginRight: 8,
          }}
        />

        <View style={{ flex: 1 }}>
          <MyText size5>{address}</MyText>
        </View>
      </View>
    </View>
  );
};

export default HeaderAddress;
