import React from "react";
import { View, Image, ScrollView } from "react-native";
import MyText from "../../components/MyText";
import { height, width } from "../../constants/dimensions";
import styles from "./styles";
import Swiper from "react-native-swiper";
import COLOR from "../../constants/colors";

function AboutScreen() {
  const CardAboutHabit = () => {
    const ImageTitle = ({ url, title }) => {
      return (
        <View
          style={{
            borderRadius: 30,
            justifyContent: "center",
            padding: 4,
            backgroundColor: "white",
            elevation: 5,
            width: 130,
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Image
            source={{ uri: url ?? "https://i.ibb.co/7ksNDsV/Habit.jpg" }}
            style={{
              width: 110,
              height: 160,
              resizeMode: "cover",
              borderRadius: 30,
            }}
          />
          <MyText size6 b6 color="grey">
            {title ?? "Habits"}
          </MyText>
        </View>
      );
    };
    const Intro = () => {
      return (
        <View>
          <Image
            source={require("../../utils/resources/superself-icon.png")}
            style={{
              width: 50,
              height: 50,
              resizeMode: "center",
              alignSelf: "center",
            }}
          />

          <MyText size5 color="grey" center b3>
            Welcome to
          </MyText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MyText size5 color={COLOR.green} b5>
              {"Super Self "}
            </MyText>
            <MyText size5 color="grey" center b3>
              Application
            </MyText>
          </View>
          <MyText size6 color="grey" center b3i>
            Lê Hoàng Minh Sơn - Phạm Liên Sanh
          </MyText>
        </View>
      );
    };
    return (
      <View
        style={{
          width: width - 64,
          height: height * 0.8,
          borderRadius: 30,
          elevation: 5,
          padding: 16,
          backgroundColor: "white",
          alignSelf: "center",
          paddingBottom: 32,
        }}
      >
        <ScrollView>
          <Intro></Intro>
          <View
            style={{ width: "100%", flexDirection: "row", paddingBottom: 32 }}
          >
            <View
              style={{
                width: "50%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ImageTitle></ImageTitle>
              <ImageTitle
                url="https://i.ibb.co/55RKQkk/run.jpg"
                title="Run"
              ></ImageTitle>
              <ImageTitle
                url="https://i.ibb.co/1XJ2JXP/ultil.jpg"
                title="Utils"
              ></ImageTitle>
              <ImageTitle
                url="https://i.ibb.co/p1xxP9W/profile.jpg"
                title="Profile"
              ></ImageTitle>
            </View>

            <View
              style={{
                width: "50%",
                flexDirection: "column",
                paddingTop: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ImageTitle
                url="https://i.ibb.co/QfwZpMz/event.jpg"
                title="Event"
              ></ImageTitle>
              <ImageTitle
                url="https://i.ibb.co/tJ6CjwG/connect.jpg"
                title="Nearby me"
              ></ImageTitle>
              <ImageTitle
                url="https://i.ibb.co/m8m12CT/ranking.jpg"
                title="Ranking"
              ></ImageTitle>
              <ImageTitle
                url="https://i.ibb.co/x5wMF3f/statistic-run.jpg"
                title="Statistic"
              ></ImageTitle>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
  const SwiperAbout = () => {
    const Dot = () => {
      return (
        <View
          style={{
            backgroundColor: COLOR.grey,
            width: 16,
            height: 16,
            borderRadius: 15,
            margin: 8,
          }}
        />
      );
    };

    const ActiveDot = () => {
      return (
        <View
          style={{
            backgroundColor: COLOR.green,
            width: 16,
            height: 16,
            borderRadius: 15,
            margin: 8,
          }}
        />
      );
    };

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Swiper
          showsPagination={true}
          width={width - 32}
          loop={true}
          dot={<Dot></Dot>}
          activeDot={<ActiveDot></ActiveDot>}
          style={{ borderRadius: 30 }}
        >
          <CardAboutHabit></CardAboutHabit>
          <CardAboutHabit></CardAboutHabit>
          <CardAboutHabit></CardAboutHabit>
        </Swiper>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <SwiperAbout></SwiperAbout>
    </View>
  );
}

export default AboutScreen;
