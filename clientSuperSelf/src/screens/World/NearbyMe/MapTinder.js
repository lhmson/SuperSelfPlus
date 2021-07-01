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
import ModalTinderMine from "./modalTinderMine";
const Pulse = require("react-native-pulse").default;
//#region  global
const WIDTH = Dimensions.get("window").width;

const MapTinder = ({ userLocation, listTinders }) => {
  const [isOpenTinderMine, setIsOpenTinderMine] = useState(true);
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
  const CardTinderMine = () => {
    return (
      <View
        style={{
          position: "absolute",
          left: 16,
          bottom: 100,
          width: WIDTH - 32,
          height: 220,
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: 10,
          elevation: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Image
            source={{
              uri: "https://i.pinimg.com/564x/7e/79/1d/7e791da660ab1d2c7b2f5c4039d4d54c.jpg",
            }}
            style={{
              height: 200,
              width: 200,
              resizeMode: "cover",
              borderRadius: 10,
              marginLeft: 10,
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View>
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
        {console.log("refresh map")}
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
      <ModalTinderMine
        isOpenTinderMine={isOpenTinderMine}
        setIsOpenTinderMine={setIsOpenTinderMine}
      ></ModalTinderMine>
    </View>
  );
};

export default MapTinder;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
