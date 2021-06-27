import React, { useEffect } from "react";
import { View, ScrollView, Image } from "react-native";
import styles from "../styles";
import COLOR from "../../../constants/colors";
import moment from "moment";

import MyText from "../../../components/MyText";

import { width } from "../../../constants/dimensions";

const _marginText = 8;

const HeaderInfo = ({
  navigation,
  route,
  item,
  numberOfDates,
  completedItems,
}) => {
  const ProgressBar = ({ percent }) => {
    const _height = 30;
    const _wParent = width * 0.7;
    const _wChild = percent ? (_wParent * percent) / 100 : 0;
    return (
      <View
        style={{
          width: _wParent,
          height: _height,
          borderRadius: 30,
          backgroundColor: COLOR.grey,
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
      </View>
    );
  };

  return (
    <View
      style={{
        padding: 8,
        paddingTop: 16,
        width: width,
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          width: 70,
        }}
      >
        <Image
          source={{
            uri: item.habitId.icon,
          }}
          style={{
            width: 70,
            height: 70,
            resizeMode: "contain",
            borderRadius: 100,
          }}
        ></Image>
      </View>
      <View
        style={{
          width: width * 0.8,
          flexDirection: "column",
          marginLeft: 16,
        }}
      >
        {/* <View style={{ height: _marginText / 2 }}></View> */}
        <MyText size3 b7>
          {item.habitId.title}
        </MyText>
        <MyText size5>{item.habitId.description}</MyText>
        <View style={{ height: _marginText }}></View>
        <MyText b4 color={COLOR.orange}>
          {`${completedItems?.length}/${numberOfDates} days`}
        </MyText>
        <ProgressBar percent={(completedItems?.length / numberOfDates) * 100} />

        <View
          style={{
            marginTop: _marginText,
            flexDirection: "row",
            justifyContent: "space-between",
            width: width * 0.6,
          }}
        >
          <View style={{ alignItems: "flex-start", flexDirection: "column" }}>
            <MyText size5 b2>
              Target
            </MyText>
            <MyText>
              {item.habitId.target
                ? `${item.habitId.target?.targetNumber} ${item.habitId.target?.targetUnit}`
                : "Complete"}
            </MyText>
          </View>

          <View style={{ alignItems: "flex-start", flexDirection: "column" }}>
            <MyText size5 b2>
              Reminder
            </MyText>
            <MyText>
              {item.reminder
                ? moment(item.reminder).format("HH:mm a")
                : "No setup"}
            </MyText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderInfo;
