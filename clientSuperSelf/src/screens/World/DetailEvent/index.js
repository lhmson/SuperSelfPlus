import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import styled from "styled-components";
import { useIsFocused } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import moment, { ISO_8601 } from "moment";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

import { useUser } from "../../../context/UserContext";
import ICON from "../../../constants/icon";
import ICONWORLD from "../../../constants/imageWorld";
import Timeline from "react-native-timeline-flatlist";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function DetailEventScreen() {
  //#region
  const CardEvent = () => {
    const _margin = 8;

    const ImageDemo = () => {
      return (
        <ImageBackground
          source={{
            uri: "https://i.pinimg.com/564x/98/5c/4b/985c4beecb162508e539f514ac0ff0cf.jpg",
          }}
          style={{
            width: WIDTH - 32,
            height: WIDTH * 0.5,
            resizeMode: "cover",
            justifyContent: "flex-end",
            flexDirection: "row",
            paddingRight: 20,
            marginTop: 0,
          }}
          borderRadius={30}
          elevation={10}
        >
          <MyButton style={{ width: 120, height: 30, borderRadius: 40 }}>
            <MyText size6 color={COLOR.white}>
              Comming soon
            </MyText>
          </MyButton>
        </ImageBackground>
      );
    };

    const ViewInfoEvent = () => {
      const TimeLineGifts = () => {
        const { characters, pets, angels } = ICONWORLD;
        const Title = (title) => {
          return (
            <View>
              <MyText b7 custom1>
                {title}
              </MyText>
            </View>
          );
        };
        const Descripton = (images, content) => {
          return (
            <View style={{ width: "90%" }}>
              <MyCard style={{ flexDirection: "column" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  {images.map((image) => (
                    <Image
                      source={image}
                      style={{ width: 80, height: 80, resizeMode: "contain" }}
                    ></Image>
                  ))}
                </View>
                <MyText size6 color="gray">
                  {content}
                </MyText>
                {/* <View style={{ width: WIDTH * 0.4 }}>
                <MyText size6 color="gray">
                  {content}
                </MyText>
              </View> */}
              </MyCard>
            </View>
          );
        };
        const data = [
          {
            title: Title("Top 1"),
            description: Descripton(
              [characters[1], pets[3], angels[0]],
              "Nhân vật nữ ca sĩ KPOP + Thú cưng heo nghỉ dưỡng + Thiên sứ hắc áp"
            ),
          },
          {
            title: Title("Top 2"),
            description: Descripton(
              [characters[0], pets[0], characters[3]],
              "Nhân vật đại thị vệ + Thú cưng thỏ thợ ảnh + Nhân vật nữ vận động viên"
            ),
          },
          {
            title: Title("Top 3"),
            description: Descripton(
              [characters[4], characters[2], pets[2]],
              "Nhân vật thám hiểm + Nhân vật Amine phát thanh viên + Thú cưng heo dev"
            ),
          },
          {
            title: Title("Compeleted"),
            description: Descripton(
              [pets[4], pets[5]],
              "Thú cưng ong chăm chỉ + Thú cưng chó dạo phố"
            ),
          },
        ];
        return (
          <View style={{ width: WIDTH - 32, marginTop: 16 }}>
            <Timeline
              circleSize={20}
              circleColor={COLOR.green}
              lineColor={COLOR.green}
              data={data}
              innerCircle={"dot"}
              descriptionStyle={{ fontFamily: "Nunito_400Regular" }}
            />
          </View>
        );
      };
      const ProgressBar = ({ percent }) => {
        const _height = 30;
        const _wParent = WIDTH - 32;
        const _wChild = (_wParent * percent) / 100;
        return (
          <View
            style={{
              width: _wParent,
              height: _height,
              borderRadius: 30,
              backgroundColor: COLOR.lightGreen,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                position: "absolute",
                backgroundColor: COLOR.green,
                borderRadius: 30,
                width: _wChild,
                top: 0,
                left: 0,
                height: _height,
              }}
            ></View>

            <MyText size5 color="white">
              {percent}%
            </MyText>
          </View>
        );
      };
      return (
        <View style={{ padding: 8, justifyContent: "flex-start" }}>
          <MyText size5 b5>
            Cuộc đua vô cực - Trận chiến cuối cùng
          </MyText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Image
              source={{
                uri: "https://i.pinimg.com/564x/21/69/f4/2169f44bbeb03f495d4f24a9bb2ddb2a.jpg",
              }}
              style={{
                width: 30,
                height: 30,
                resizeMode: "center",
                marginRight: 8,
              }}
            ></Image>
            <MyText size5>21/06 - 27/06/2021</MyText>

            <Image
              source={{
                uri: "https://i.pinimg.com/564x/29/d9/bd/29d9bd7885eca021a310207d9c4fd850.jpg",
              }}
              style={{
                width: 30,
                height: 30,
                resizeMode: "center",
                marginRight: 8,
                marginLeft: 32,
              }}
            ></Image>
            <MyText size5>1.834</MyText>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Image
              source={{
                uri: "https://i.pinimg.com/564x/4f/89/61/4f896194e6fdb9acbbc667af58d1d77a.jpg",
              }}
              style={{
                width: 30,
                height: 30,
                resizeMode: "center",
                marginRight: 8,
              }}
            ></Image>
            <MyText size5>Huy hiệu Chiếc giày vô cực</MyText>
          </View>

          <MyText left size6 style={{ padding: 8 }}>
            Cuộc đua vô cực là cuộc đua dành cho những người thuộc Level 20 trở
            lên đầy đủ năng lực để thực hiện chạy bộ 10.000m tại nơi bạn sống.
            Điều kiện phải thực hiện đúng khẩu hiệu 5K bảo vệ sức khỏe khi chạy
            bộ nhé!
          </MyText>
          <ProgressBar percent={70}></ProgressBar>
          <TimeLineGifts></TimeLineGifts>
        </View>
      );
    };

    const ButtonFooter = () => {
      return (
        <View
          style={{
            flexDirection: "row",
            padding: 8,
            justifyContent: "center",
            width: WIDTH - 32,
            paddingTop: 0,
          }}
        >
          <MyButton
            style={{ width: WIDTH * 0.8, height: 50, borderRadius: 40 }}
            color={COLOR.lightGreen}
          >
            <MyText color={COLOR.white} b5>
              Join
            </MyText>
          </MyButton>
        </View>
      );
    };
    return (
      <MyCard
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: WIDTH - 20,
          borderColor: COLOR.green,
          borderSize: 5,
          padding: 0,
        }}
      >
        <ImageDemo></ImageDemo>
        <ViewInfoEvent></ViewInfoEvent>
        <ButtonFooter></ButtonFooter>
      </MyCard>
    );
  };
  //#endregion
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          marginTop: 0,
          width: WIDTH,
          alignItems: "center",
          justifyContent: "center",
          elevation: 40,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardEvent></CardEvent>
        </ScrollView>
      </View>
    </View>
  );
}

export default DetailEventScreen;
