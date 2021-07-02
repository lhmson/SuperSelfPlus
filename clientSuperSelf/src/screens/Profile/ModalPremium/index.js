import React, { useEffect, useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";

import COLOR from "../../../constants/colors";
import styles from "../styles";

import { useUser } from "../../../context/UserContext";
import { useIsFocused } from "@react-navigation/native";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";
import SkeletonSample from "../../../components/SkeletonSample";
import MyFloatingButton from "../../../components/MyFloatingButton";

import { Entypo } from "@expo/vector-icons";
import { height, width } from "../../../constants/dimensions";
import Modal from "react-native-modal";
import * as apiUser from "../../../api/user";

function PremiumModal({ isVisible, setIsVisible }) {
  const user = useUser();

  useEffect(() => {}, []);

  const Main = () => {
    return (
      <View
        style={{
          width: width - 64,
          backgroundColor: "white",
          height: 600,
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/bd/3b/6e/bd3b6e558f224705a18b4fd745150b07.jpg",
          }}
          style={{
            width: width - 80,
            height: width * 0.5,
            resizeMode: "contain",
          }}
        ></Image>

        <View style={{ marginTop: -32, alignItems: "center" }}>
          <MyText size4 b5>
            Go premium
          </MyText>
          <MyText size4 b5>
            Get unlimited feature
          </MyText>
          <MyText size4 b5>
            when you
          </MyText>
        </View>
      </View>
    );
  };

  return (
    <>
      <Modal
        isVisible={isVisible}
        style={{
          alignSelf: "center",
          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            borderRadius: 40,
            backgroundColor: "white",
            padding: 16,
          }}
        >
          <Main></Main>
        </View>
      </Modal>
    </>
  );
}

export default PremiumModal;
