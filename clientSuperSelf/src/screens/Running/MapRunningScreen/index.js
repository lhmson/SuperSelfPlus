import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Image, TouchableOpacity } from "react-native";
import MyText from "../../../components/MyText/index";
import MyButton from "../../../components/MyButton/index";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";
import CountDown from "react-native-countdown-component";

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
          backgroundColor: "white",
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
                digitStyle={{ backgroundColor: COLOR.whiteSmoke }}
                digitTxtStyle={{ color: "#1CC625" }}
                timeToShow={["M", "S"]}
                timeLabels={{ m: "Minutes", s: "Seconds" }}
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
            <MyButton size5 onPress={() => {}} color={COLOR.red}>
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
              <MyText size4>50 steps</MyText>
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
              <MyText size4>12 Km</MyText>
            </View>

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
              <MyText size4>100 steps</MyText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <DestinationHeader></DestinationHeader>
      <DestinationFooter></DestinationFooter>
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
