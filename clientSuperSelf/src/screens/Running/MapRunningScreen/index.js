import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Image, TouchableOpacity } from "react-native";
import MyText from "../../../components/MyText/index";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const MapRunningScreen = () => {
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

  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <DestinationHeader></DestinationHeader>
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
