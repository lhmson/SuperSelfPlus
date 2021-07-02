import React, { useContext, useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";

import COLOR from "../../../constants/colors";
import styles from "../styles";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

import { width } from "../../../constants/dimensions";

function MyBadges({ navigation }) {
  const dataBadges = [
    {
      iconBadges:
        "https://i.pinimg.com/564x/76/5e/a5/765ea5eab7bf44f786056452838111e5.jpg",
      title: "Nutrition Expert",
      description: "Hit all daily Goals",
    },
    {
      iconBadges:
        "https://i.pinimg.com/564x/67/bf/2e/67bf2e2c104278d349fa88fb5ea7e9a5.jpg",
      title: "Yoga Master",
      description: "Completed event",
    },
    {
      iconBadges:
        "https://i.pinimg.com/564x/f9/c8/f0/f9c8f0efa8583b52484988d80a33662b.jpg",
      title: "Walk enduring",
      description: "Walk 20.000 a day",
    },
    {
      iconBadges:
        "https://i.pinimg.com/564x/76/5e/a5/765ea5eab7bf44f786056452838111e5.jpg",
      title: "Nutrition Expert",
      description: "Hit all daily Goals",
    },
  ];
  const CardBadge = ({ iconBadges, title, description }) => {
    return (
      <MyCard>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: iconBadges }}
            style={{ width: 50, height: 50, resizeMode: "cover" }}
          ></Image>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginLeft: 8,
            }}
          >
            <MyText custom1 b7>
              {title}
            </MyText>
            <MyText size6 color="grey">
              {description}
            </MyText>
          </View>
        </View>
      </MyCard>
    );
  };
  return (
    <View>
      <MyText b7>My badges</MyText>
      <MyCard color={COLOR.whiteSmoke}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {dataBadges.map((item, index) => (
            <CardBadge
              key={index.toString()}
              title={item.title}
              description={item.description}
              iconBadges={item.iconBadges}
            />
          ))}
          <TouchableOpacity>
            <MyText color={COLOR.green} b5 size5>
              See more
            </MyText>
          </TouchableOpacity>
        </View>
      </MyCard>
    </View>
  );
}

export default MyBadges;
