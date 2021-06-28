import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import styles from "../styles";
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
import { width } from "../../../constants/dimensions";
import { dateCompare } from "../../../utils/datetime";

function TimeLineGifts({ navigation, item }) {
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

  const Description = (images, content) => {
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
            {images.map((image, index) => (
              <Image
                key={index.toString()}
                source={image}
                style={{ width: 80, height: 80, resizeMode: "contain" }}
              />
            ))}
          </View>
          {/* <MyText size6 color="gray">
              {content}
            </MyText> */}
        </MyCard>
      </View>
    );
  };

  const data = [
    {
      title: Title("Top 1"),
      description: Description(
        [characters[1], pets[3], angels[0]],
        "Nhân vật nữ ca sĩ KPOP + Thú cưng heo nghỉ dưỡng + Thiên sứ hắc áp"
      ),
    },
    {
      title: Title("Top 2"),
      description: Description(
        [characters[0], pets[0], characters[3]],
        "Nhân vật đại thị vệ + Thú cưng thỏ thợ ảnh + Nhân vật nữ vận động viên"
      ),
    },
    {
      title: Title("Top 3"),
      description: Description(
        [characters[4], characters[2], pets[2]],
        "Nhân vật thám hiểm + Nhân vật Amine phát thanh viên + Thú cưng heo dev"
      ),
    },
    {
      title: Title("Compeleted"),
      description: Description(
        [pets[4], pets[5]],
        "Thú cưng ong chăm chỉ + Thú cưng chó dạo phố"
      ),
    },
  ];
  return (
    <View style={{ width: width - 32, marginTop: 16 }}>
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
}

export default TimeLineGifts;
