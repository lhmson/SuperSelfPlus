import React, { useState, useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useUser } from "../../../context/UserContext";
import ProfileModal from "../../Profile/ProfileModal";
const Pulse = require("react-native-pulse").default;
//#region  global
const WIDTH = Dimensions.get("window").width;

const MapTinder = ({ navigation, userLocation, listTinders }) => {
  const user = useUser();
  const idUser = user.state.uid;
  const [isOpenTinderMine, setIsOpenTinderMine] = useState(false);
  const [selectIdUser, setSelectIdUser] = useState(idUser);
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

  const Buttons = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setIsOpenTinderMine(false);
            navigation.navigate("Message");
          }}
          style={{ marginRight: 16 }}
        >
          <AntDesign name="message1" size={30} color={COLOR.green} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsOpenTinderMine(false);
          }}
        >
          <FontAwesome name="close" size={30} color={COLOR.grey} />
        </TouchableOpacity>
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
          ? listTinders?.map((user, index) => (
              <Marker
                coordinate={{
                  latitude: user.latitude,
                  longitude: user.longitude,
                }}
                key={index.toString()}
                icon={
                  idUser === user.userId
                    ? require("../../../utils/resources/superself-icon.png")
                    : require("../../../utils/resources/people.png")
                }
                title={user.name}
                description={user.hashtag}
                onPress={() => {
                  setSelectIdUser(user.userId);
                  setIsOpenTinderMine(true);
                }}
              >
                {/* <CardUserTinder user={user}></CardUserTinder> */}
              </Marker>
            ))
          : null}
      </MapView>
      <ProfileModal
        isVisible={isOpenTinderMine}
        setIsVisible={setIsOpenTinderMine}
        userId={selectIdUser}
        Buttons={Buttons}
      ></ProfileModal>
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
