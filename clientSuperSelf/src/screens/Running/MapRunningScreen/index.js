import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "react-native";
import MyText from "../../../components/MyText/index";
import MyButton from "../../../components/MyButton/index";
import MyCard from "../../../components/MyCard/index";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";
import CountDown from "react-native-countdown-component";
import { getDistance, getPreciseDistance } from "geolib";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "@gorhom/bottom-sheet";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const _marginButton = (WIDTH - 350) / 4;

const MapRunningScreen = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState();
  const [roadRunCoordinate, setRoadRunCoordinate] = useState([]);
  const [location, setLocation] = useState(null);

  const DestinationHeader = ({ location }) => {
    const [address, setAddress] = useState("GPS Loading...");
    useEffect(() => {
      (async () => {
        if (!location) return;
        let add = await Location.reverseGeocodeAsync({
          longitude: location?.longitude,
          latitude: location?.latitude,
        });
        add = add[0];
        let convertAddressStr =
          (add.street ? add.street + " - " : "") +
          (add.subregion ?? add.city) +
          " - " +
          add.region;
        setAddress(convertAddressStr);
      })();
    });
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
  const DestinationFooter = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: WIDTH,
          paddingHorizontal: 8 * 2,
          borderRadius: 30,
          backgroundColor: COLOR.white,
        }}
      >
        <View>
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
                size={25}
                onFinish={() => alert("Finished")}
                digitStyle={{ backgroundColor: COLOR.white }}
                digitTxtStyle={{ color: COLOR.green }}
                timeLabelStyle={{ color: "transparent" }}
                timeToShow={["M", "S"]}
                running={false}
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
        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ width: _marginButton }}></View>
            <MyCard
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                source={ICON.shoe}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <MyText size5 b6>
                50
              </MyText>
            </MyCard>

            <View style={{ width: _marginButton }}></View>
            <MyCard
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                source={ICON.map}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <MyText size5 b6>
                3km
              </MyText>
            </MyCard>
            <View style={{ width: _marginButton }}></View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Rank");
              }}
            >
              <MyCard
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  source={ICON.goal}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
                <MyText size5 b6>
                  Rank
                </MyText>
              </MyCard>
            </TouchableOpacity>
            <View style={{ width: _marginButton }}></View>
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
      setUserLocation(coor);
      setRoadRunCoordinate([coor]);
      return;
    }

    if (
      getPreciseDistance(
        roadRunCoordinate[roadRunCoordinate.length - 1],
        coor
      ) >= 5
    ) {
      setUserLocation(coor);
      setRoadRunCoordinate([...roadRunCoordinate, coor]);
      return;
    }
  };

  // variables
  const snapPoints = useMemo(() => ["2%", "40%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

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

  if (location)
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.00122,
            longitudeDelta: 0.00121,
          }}
          showsUserLocation={true}
          mapType="standard"
          followsUserLocation={true}
          // customMapStyle={mapDarkStyle}
          showsTraffic={true}
          tintColor={COLOR.green}
          showsMyLocationButton={true}
          zoomEnabled={true}
          onUserLocationChange={(locationChangedResult) => {
            pushCoordinateIntoRoad(
              locationChangedResult.nativeEvent.coordinate
            );
          }}
        >
          {roadRunCoordinate[0] ? (
            <Marker coordinate={roadRunCoordinate[0] ?? null}>
              <Image
                source={ICON.startRun}
                style={{ height: 60, width: 60, resizeMode: "contain" }}
              />
            </Marker>
          ) : null}
          <Polyline
            coordinates={roadRunCoordinate}
            strokeColor={COLOR.green}
            strokeWidth={6}
          />
        </MapView>
        <DestinationHeader location={userLocation}></DestinationHeader>
        <BottomSheet
          // ref={bottomSheetRef}
          borderRadius={30}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={{ borderRadius: 30 }}
        >
          <DestinationFooter></DestinationFooter>
        </BottomSheet>
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
