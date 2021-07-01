import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Dimensions, StyleSheet } from "react-native";
import { Image } from "react-native";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";
import { View } from "react-native";
import MyChart from "../../Profile/ProfileScreen/MyChart";
import MyText from "../../../components/MyText";
//#region  global
const WIDTH = Dimensions.get("window").width;

const MapTinder = ({ userLocation, listTinders }) => {
  // const arrUsers = [
  //   {
  //     latitude: 13.0825967,
  //     longitude: 109.2700144,
  //     color: COLOR.lightGreen,
  //     icon: "https://i.pinimg.com/564x/1b/dc/94/1bdc94067f77895fe37d8956bd61f036.jpg",
  //     hashtag: "Finding real lover",
  //   },
  //   {
  //     latitude: 13.0829967,
  //     longitude: 109.2706544,
  //     color: COLOR.orange,
  //     icon: "https://i.pinimg.com/236x/30/38/a1/3038a1c83d1b87126e15ec725e7abc5f.jpg",
  //     hashtag: "PT gymer",
  //   },
  //   {
  //     latitude: 13.081892062,
  //     longitude: 109.27108923,
  //     color: COLOR.purple,
  //     icon: "https://i.pinimg.com/564x/e1/d8/2f/e1d82f18dd6c0140d650b1ba85c3c4ad.jpg",
  //     hashtag: "Find partner run together",
  //   },
  // ];
  const CardUserTinder = ({ user }) => {
    return (
      <View style={{ width: 500, height: 200, flexDirection: "row" }}>
        <View
          style={{
            height: 70,
            width: 70,
            elevation: 30,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: user.color ?? COLOR.lightGreen,
            borderRadius: 50,
          }}
        >
          <Image
            source={{
              uri:
                user.avatarUrl ??
                "https://i.pinimg.com/564x/b2/c5/d5/b2c5d51cd8db75f5082387d79a5a01fb.jpg",
            }}
            style={{
              height: 60,
              width: 60,
              resizeMode: "cover",
              borderRadius: 50,
            }}
          />
        </View>
        <View
          style={{
            width: 180,
            height: 60,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: user.color ?? COLOR.lightGreen,
            borderRadius: 20,
            padding: 8,
          }}
        >
          <MyText size6 b7>
            {user.name ?? "No name"}
          </MyText>
          <MyText size6 b3i>
            {user.hashtag ?? "#FindGymPartner"}
          </MyText>
        </View>
      </View>
    );
  };
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: userLocation.coords?.latitude,
        longitude: userLocation.coords?.longitude,
        latitudeDelta: 0.00122,
        longitudeDelta: 0.00121,
      }}
      showsUserLocation={true}
      mapType="standard"
      followsUserLocation={true}
      showsTraffic={true}
      tintColor={COLOR.green}
      showsMyLocationButton={true}
      zoomEnabled={true}
      // onUserLocationChange={(locationChangedResult) => {
      //   pushCoordinateIntoRoad(locationChangedResult.nativeEvent.coordinate);
      // }}
    >
      {/* {console.log("refresh map")} */}
      {listTinders?.length > 0
        ? listTinders.map((user, index) => (
            <Marker
              coordinate={{
                latitude: user.latitude,
                longitude: user.longitude,
              }}
              key={index.toString()}
              icon={{ uri: user.avatarUrl }}
              title={user.name}
              description={user.description.substring(0, 20)}
            >
              {/* <CardUserTinder user={user}></CardUserTinder> */}
            </Marker>
          ))
        : null}
    </MapView>
  );
};

export default MapTinder;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
