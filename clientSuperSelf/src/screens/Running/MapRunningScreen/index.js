import React, { useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Image, TouchableOpacity } from "react-native";
import MyText from "../../../components/MyText/index";
import MyButton from "../../../components/MyButton/index";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";
import CountDown from "react-native-countdown-component";
import { getDistance, getPreciseDistance } from "geolib";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const MapRunningScreen = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState();
  const [roadRunCoordinate, setRoadRunCoordinate] = useState([]);

  const DestinationHeader = () => {
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
            <MyText size5>Trường ĐH Công nghệ Thông tin</MyText>
          </View>

          <MyText size5>10 mins</MyText>
        </View>
      </View>
    );
  };
  const DestinationFooter = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: HEIGHT / 2.5,
          height: HEIGHT,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: WIDTH,
          paddingVertical: 8,
          paddingHorizontal: 8 * 2,
          borderRadius: 30,
          backgroundColor: COLOR.white,
          opacity: 0.9,
        }}
      >
        <View style={{ flex: 0.2 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ marginRight: 24 }}>
              <CountDown
                until={60 * 10 + 30}
                size={30}
                onFinish={() => alert("Finished")}
                digitStyle={{ backgroundColor: COLOR.white }}
                digitTxtStyle={{ color: COLOR.green }}
                timeToShow={["M", "S"]}
              />
            </View>
            <MyButton
              size5
              onPress={() => {}}
              color={COLOR.green}
              style={{ marginRight: 24 }}
            >
              <MyText b5 color={COLOR.white}>
                RUN
              </MyText>
            </MyButton>
            <MyButton size5 onPress={() => {}} color={COLOR.green}>
              <MyText b5 color={COLOR.white}>
                STOP
              </MyText>
            </MyButton>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginRight: 24,
              }}
            >
              <Image
                source={ICON.shoe}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
              <MyText size4>50</MyText>
            </View>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginRight: 24,
              }}
            >
              <Image
                source={ICON.map}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
              <MyText size4>1km</MyText>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Rank")}>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  source={ICON.goal}
                  style={{
                    width: 80,
                    height: 80,
                  }}
                />
                <MyText size4>Rank</MyText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const mapDarkStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#212121",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#181818",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1b1b1b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2c2c2c",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8a8a8a",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          color: "#373737",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#3c3c3c",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [
        {
          color: "#4e4e4e",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3d3d3d",
        },
      ],
    },
  ];

  const pushCoordinateIntoRoad = (coor) => {
    //start run
    if (roadRunCoordinate.length === 0) {
      setRoadRunCoordinate([coor]);
      return;
    }

    if (
      getPreciseDistance(
        roadRunCoordinate[roadRunCoordinate.length - 1],
        coor
      ) >= 5
    ) {
      setRoadRunCoordinate([...roadRunCoordinate, coor]);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        mapType="standard"
        followsUserLocation={true}
        // customMapStyle={mapDarkStyle}
        showsTraffic={true}
        tintColor={COLOR.green}
        showsMyLocationButton={true}
        zoomEnabled={true}
        onUserLocationChange={(locationChangedResult) => {
          setUserLocation(locationChangedResult.nativeEvent.coordinate);
          pushCoordinateIntoRoad(locationChangedResult.nativeEvent.coordinate);
        }}
      >
        <Marker coordinate={roadRunCoordinate[0] ?? null}>
          <Image
            source={ICON.startRun}
            style={{ height: 60, width: 60, resizeMode: "contain" }}
          />
        </Marker>
        <Polyline
          coordinates={roadRunCoordinate}
          strokeColor={COLOR.green}
          strokeWidth={6}
        />
      </MapView>
      <DestinationHeader></DestinationHeader>
      <DestinationFooter></DestinationFooter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
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
