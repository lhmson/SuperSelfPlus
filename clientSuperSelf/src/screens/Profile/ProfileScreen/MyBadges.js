import React, { useEffect, useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";

import COLOR from "../../../constants/colors";
import styles from "../styles";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";

import { width } from "../../../constants/dimensions";
import { limitNameLength } from "../../../utils/limitNameLength";

import * as apiHabit from "../../../api/habit";
import { useUser } from "../../../context/UserContext";
import { renderColor } from "../../../utils/habitThemes";

function MyBadges({ navigation }) {
  const user = useUser();
  const [listBadges, setListBadges] = useState([]);

  useEffect(() => {
    apiHabit
      .getUserHabits(user.state.uid)
      .then((res) => {
        setListBadges(res.data.slice(0, 3));
      })
      .catch((error) => {
        alert("Error when getting user habits");
        console.log("Error when get habits of user", error.message);
      });
  }, []);

  const CardBadge = ({ iconBadges, title, description, backgroundColor }) => {
    return (
      <MyCard color={backgroundColor}>
        <View
          style={{
            width: width - 120,
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
            <MyText custom1 b7>
              {limitNameLength(title, 18)}
            </MyText>

            <MyText size6>{limitNameLength(description, 25)}</MyText>
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
