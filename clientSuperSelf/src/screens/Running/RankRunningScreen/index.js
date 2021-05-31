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
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";
import CountDown from "react-native-countdown-component";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const RankRunningScreen = () => {
  const HeaderMyRanking = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: -50,
            left: 0,
            right: 0,
            height: 220,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLOR.red,
            opacity: 0.5,
            borderRadius: 30,
          }}
        ></View>

        <View
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            height: 120,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            borderRadius: 30,
            flexDirection: "row",
            padding: 8,
          }}
        >
          <Image
            source={{
              uri: "https://i.pinimg.com/564x/cc/f4/b7/ccf4b79965234c849d095b8130baf460.jpg",
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
            }}
          />
          <Image
            source={ICON.medal}
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              marginTop: 50,
              marginLeft: -30,
            }}
          />

          <View style={{ flexDirection: "column" }}>
            <MyText size4 b5 color={COLOR.lightGreen}>
              Phạm Sanh
            </MyText>
            <MyText size3 b5 color={COLOR.whiteSmoke}>
              176253
            </MyText>
          </View>

          <View style={{ marginLeft: 50 }}>
            <MyText size1 b4 color={COLOR.green}>
              No.4
            </MyText>
          </View>
        </View>
      </View>
    );
  };

  const CardRankUser = ({ No, colorNo }) => {
    return (
      <View
        style={{
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            height: 100,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLOR.red,
            opacity: 0.5,
            borderRadius: 30,
            margin: 8,
          }}
        ></View>

        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 120,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            borderRadius: 30,
            flexDirection: "row",
            padding: 8,
          }}
        >
          <MyText size1 color={colorNo} style={{ marginRight: 16 }}>
            {No}
          </MyText>
          <Image
            source={{
              uri: "https://i.pinimg.com/564x/cc/f4/b7/ccf4b79965234c849d095b8130baf460.jpg",
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
            }}
          />
          <Image
            source={ICON.medal}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              marginTop: 50,
              marginLeft: -30,
            }}
          />

          <View style={{ flexDirection: "column" }}>
            <MyText size5 b5 color={COLOR.lightGreen}>
              Phạm Sanh
            </MyText>
            <MyText size5 b3 color={COLOR.white}>
              Vua chạy tuần
            </MyText>
          </View>

          <View
            style={{
              marginLeft: 50,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={ICON.shoeRanking}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                marginRight: 8,
              }}
            />
            <MyText size b4 color={COLOR.white}>
              18293
            </MyText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: "https://i.pinimg.com/564x/a5/6e/60/a56e6086513ebec5e5ef816fbc785df3.jpg",
        }}
      >
        <View style={{ flex: 1 }}>
          <HeaderMyRanking></HeaderMyRanking>
          <ScrollView
            style={{
              marginTop: 200,
              flex: 1,
              backgroundColor: "transparent",
            }}
          >
            <CardRankUser No={1} colorNo={COLOR.green}></CardRankUser>
            <CardRankUser No={2} colorNo={COLOR.orange}></CardRankUser>
            <CardRankUser No={3} colorNo={COLOR.yellow}></CardRankUser>
            <CardRankUser No={4} colorNo={COLOR.purple}></CardRankUser>
            <CardRankUser No={5} colorNo={COLOR.white}></CardRankUser>
            <CardRankUser No={6} colorNo={COLOR.white}></CardRankUser>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default RankRunningScreen;
