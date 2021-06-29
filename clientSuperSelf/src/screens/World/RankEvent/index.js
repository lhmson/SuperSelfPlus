import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, ScrollView, FlatList, Image } from "react-native";
import styles from "../styles";
import COLOR from "../../../constants/colors";
import { width, height } from "../../../constants/dimensions";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";
import SkeletonSample from "../../../components/SkeletonSample";
import ICON from "../../../constants/icon";
import { useUser } from "../../../context/UserContext";

function RankEventScreen({ navigation }) {
  const user = useUser();

  useEffect(() => {}, []);
  const HeaderTitle = () => {
    return (
      <View style={{ marginTop: 32 }}>
        <MyText color={COLOR.green} b7 size5>
          The Amazing Run 2021
        </MyText>
        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <MyText color={COLOR.black} b3 size4>
            {`Your are on `}
          </MyText>
          <MyText color={COLOR.green} b7 size4>
            {`1st `}
          </MyText>
          <MyText color={COLOR.black} b3 size4>
            {`place `}
          </MyText>
        </View>
        <MyText color={COLOR.black} b3 size4>
          among all joiners in this event
        </MyText>
      </View>
    );
  };

  const CardRank = ({ uri, name, number, index }) => {
    let _iconTop = "";
    if (index == 0) _iconTop = ICON.Top1;
    if (index == 1) _iconTop = ICON.Top2;
    if (index == 2) _iconTop = ICON.Top3;
    return (
      <MyCard color={COLOR.green}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: uri,
            }}
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",
              borderRadius: 50,
              marginRight: 16,
            }}
          ></Image>
          <MyText color={COLOR.white} size5 b4>{`${name}  `}</MyText>
          <MyText color={COLOR.white} size5 b7>
            {`${number} km`}
          </MyText>
        </View>
        {index <= 2 ? (
          <View style={{ position: "absolute", right: 8, top: 0 }}>
            <Image
              source={_iconTop}
              style={{ width: 30, height: 40, resizeMode: "contain" }}
            ></Image>
          </View>
        ) : null}
      </MyCard>
    );
  };
  const Dashboard = () => {
    const dataRank = [
      {
        uri: "https://i.pinimg.com/564x/aa/18/a9/aa18a9a63f2a6316b4c9d8406f97f55e.jpg",
        name: "Phạm Sanh",
        number: "85",
      },
      {
        uri: "https://i.pinimg.com/564x/1c/1c/90/1c1c90b3a8e5e1df2f523cb73c074943.jpg",
        name: "Kim Thảo",
        number: "60",
      },
      {
        uri: "https://i.pinimg.com/564x/bd/c6/af/bdc6af8a03707891940896adf71bc7b8.jpg",
        name: "Huy Tiến",
        number: "55",
      },
      {
        uri: "https://i.pinimg.com/564x/b0/62/f3/b062f3c78bb4969f5146359188ee6e05.jpg",
        name: "Tiến Nghĩa",
        number: "50",
      },
      {
        uri: "https://i.pinimg.com/564x/aa/18/a9/aa18a9a63f2a6316b4c9d8406f97f55e.jpg",
        name: "Thành Trung",
        number: "49",
      },
      {
        uri: "https://i.pinimg.com/564x/aa/18/a9/aa18a9a63f2a6316b4c9d8406f97f55e.jpg",
        name: "Công Hậu",
        number: "44",
      },
    ];
    return (
      <View
        style={{
          width: width - 32,
          height: height * 0.55,
          padding: 32,
          marginTop: 16,
          paddingTop: 16,
        }}
      >
        <ScrollView>
          {dataRank?.map((rank, index) => (
            <CardRank
              key={index.toString()}
              uri={rank.uri}
              name={rank.name}
              number={rank.number}
              index={index}
            ></CardRank>
          ))}
          <View style={{ height: 64 }}></View>
        </ScrollView>
      </View>
    );
  };
  const BackGround = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: width,
          height: height,
        }}
      >
        <View>
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/12/4d/e3/124de3d1b5e12f1d8fcec1685e634361.gif",
            }}
            style={{ width: width, height: width * 0.8, resizeMode: "contain" }}
          ></Image>
        </View>

        <View style={{ position: "absolute", bottom: 100, left: 8 }}>
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/41/dc/fc/41dcfccb7cdf1fc8b13020cb57c882ae.gif",
            }}
            style={{
              width: width,
              height: width * 0.4,
              resizeMode: "contain",
              opacity: 0.6,
            }}
          ></Image>
        </View>
        <View style={{ position: "absolute", top: 50, right: 16 }}>
          <Image
            source={require("../../../utils/resources/cupGreen.jpg")}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
              opacity: 0.6,
            }}
          ></Image>
        </View>
        <View style={{ position: "absolute", top: 150, left: -32 }}>
          <Image
            source={require("../../../utils/resources/badgesGreen.jpg")}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
              opacity: 0.6,
            }}
          ></Image>
        </View>
        <View style={{ position: "absolute", top: 230, right: 8 }}>
          <Image
            source={require("../../../utils/resources/hatGreen.jpg")}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
              opacity: 0.6,
            }}
          ></Image>
        </View>
        <View style={{ position: "absolute", top: 400, left: 54 }}>
          <Image
            source={require("../../../utils/resources/badgesGreen.jpg")}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
              opacity: 0.6,
            }}
          ></Image>
        </View>
      </View>
    );
  };
  return (
    <View style={{ padding: 16, backgroundColor: "white", height: height }}>
      <BackGround></BackGround>
      <HeaderTitle></HeaderTitle>
      <Dashboard></Dashboard>
    </View>
  );
}

export default RankEventScreen;
