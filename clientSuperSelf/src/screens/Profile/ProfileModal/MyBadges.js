import React, { useEffect, useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";

import COLOR from "../../../constants/colors";
import styles from "../styles";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

import * as apiHabit from "../../../api/habit";
import { renderColor } from "../../../utils/habitThemes";
import { limitNameLength } from "../../../utils/limitNameLength";

function MyBadges({ navigation, userId }) {
  const [listBadges, setListBadges] = useState([]);

  useEffect(() => {
    apiHabit
      .getUserHabits(userId)
      .then((res) => {
        setListBadges(res.data.slice(0, 3));
      })
      .catch((error) => {
        alert("Error when getting user habits");
        console.log("Error when get habits of user", error);
      });
  }, []);

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
          />
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginLeft: 8,
            }}
          >
            <MyText size6 b7>
              {limitNameLength(title, 18)}
            </MyText>

            <MyText size6>{limitNameLength(description, 18)}</MyText>
          </View>
        </View>
      </MyCard>
    );
  };
  return (
    <View>
      {listBadges.length !== 0 && (
        <>
          <MyText b7 size3>
            My top habits
          </MyText>
          <MyCard color={COLOR.white}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {listBadges?.map((item, index) => (
                <CardBadge
                  key={index.toString()}
                  title={item.title}
                  description={item.description}
                  iconBadges={item.icon}
                  backgroundColor={renderColor(item.theme)}
                />
              ))}
              {/* <TouchableOpacity>
            <MyText color={COLOR.green} b5 size5>
              See more
            </MyText>
          </TouchableOpacity> */}
            </View>
          </MyCard>
        </>
      )}
    </View>
  );
}

export default MyBadges;
