import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Image, TouchableOpacity } from "react-native";
import MyText from "../../../components/MyText/index";
import MyButton from "../../../components/MyButton/index";
import MyCard from "../../../components/MyCard/index";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const PedometerScreen = ({ navigation }) => {
  const HeaderInfo = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: WIDTH,
        }}
      >
        <MyCard style={{ flexDirection: "row" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Image
              source={{
                uri: "https://i.pinimg.com/564x/aa/18/a9/aa18a9a63f2a6316b4c9d8406f97f55e.jpg",
              }}
              style={{
                width: 100,
                height: 100,
                resizeMode: "cover",
                borderRadius: 50,
              }}
            ></Image>
            <View
              style={{
                position: "absolute",
                top: -5,
                left: -5,
                height: 110,
                width: 110,
              }}
            >
              <Image
                source={ICON.rainbow}
                style={{ width: 110, height: 110, resizeMode: "contain" }}
              ></Image>
            </View>
          </View>
          <View style={{ marginLeft: 16 }}>
            <MyText size4 b7 color={COLOR.green}>
              Hi! Bella
            </MyText>
            <View style={{ height: 10 }}></View>
            <MyText size5 b4 color={COLOR.green}>
              Welcome to Pedometer!
            </MyText>
          </View>
          <View style={{ marginLeft: -50, marginRight: 20, marginTop: -50 }}>
            <Image
              source={ICON.highDegrees}
              style={{ width: 50, height: 50, resizeMode: "cover" }}
            ></Image>
          </View>
        </MyCard>
      </View>
    );
  };

  const PedometerInfo = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: WIDTH,
        }}
      >
        <ImageBackground
          source={{
            uri: "https://i.pinimg.com/originals/11/21/0f/11210f3927a5c230f28ec52b609192a2.gif",
          }}
          style={{
            width: 700,
            height: 500,
            resizeMode: "stretch",
            marginTop: -50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MyText size2 b6 color={COLOR.orange}>
            10023
          </MyText>
          <Image
            source={ICON.shoeRanking}
            style={{ width: 80, height: 80, resizeMode: "contain" }}
          ></Image>
        </ImageBackground>
      </View>
    );
  };

  const CardHeartBeat = () => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <MyCard style={{ width: (WIDTH - 32) / 2 }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={ICON.goalRunning}
              style={{
                width: 100,
                resizeMode: "contain",
                height: 100,
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <MyText custom1 b5>
                120
              </MyText>
            </View>
          </View>
        </MyCard>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderInfo></HeaderInfo>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            backgroundColor: "white",
          }}
        >
          <PedometerInfo></PedometerInfo>
          <CardHeartBeat></CardHeartBeat>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default PedometerScreen;
