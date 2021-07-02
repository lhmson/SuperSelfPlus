import React, { useEffect, useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";

import COLOR from "../../../constants/colors";
import styles from "../styles";

import { useUser } from "../../../context/UserContext";

import MyText from "../../../components/MyText";

import { FontAwesome } from "@expo/vector-icons";
import { height, width } from "../../../constants/dimensions";
import Modal from "react-native-modal";
import * as apiUser from "../../../api/user";

function PremiumModal({ isVisible, setIsVisible }) {
  const user = useUser();

  useEffect(() => {}, []);

  const BillButtons = () => {
    return (
      <View style={{ marginTop: 20, width: "100%" }}>
        <View
          style={{
            width: "100%",
            height: 80,
            borderRadius: 10,
            elevation: 5,
            borderColor: COLOR.green,
            backgroundColor: "white",
            flexDirection: "column",
            justifyContent: "center",
            borderWidth: 1,
            padding: 8,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              elevation: 5,
              backgroundColor: COLOR.green,
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 32,
            }}
          >
            <MyText size5 b5 color="white">
              $4.99
            </MyText>
            <MyText size6 b3 color="white">
              $4.99/month, billed yearly $60
            </MyText>

            <View
              style={{
                position: "absolute",
                top: -20,
                right: 8,
                width: 120,
                height: 40,
                backgroundColor: COLOR.lightGreen,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MyText size6 b3 color="white">
                SAVE 30%
              </MyText>
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            height: 80,
            borderRadius: 10,
            elevation: 5,
            backgroundColor: COLOR.whiteSmoke,
            flexDirection: "column",
            justifyContent: "center",
            padding: 8,
            opacity: 0.6,
            marginTop: 16,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 32,
            }}
          >
            <MyText size5 b5>
              $5.99
            </MyText>
            <MyText size6 b3>
              Billed monthly $5.99
            </MyText>
          </View>
        </View>
      </View>
    );
  };

  const ButtonGoPremium = () => {
    return (
      <View
        style={{
          width: "60%",
          height: 60,
          backgroundColor: COLOR.green,
          elevation: 5,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 30,
          marginTop: 16,
        }}
      >
        <MyText size5 color="white" b5>
          Go Premium
        </MyText>
      </View>
    );
  };

  const Fotter = () => {
    return (
      <View
        style={{
          width: "95%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <MyText center size6 color="grey">
          Subscription billed as one payment. Recurring billing. Cancel anytime
          for any reason
        </MyText>
        <MyText center size6 color="grey" b7>
          Terms - Privacy Policy
        </MyText>
      </View>
    );
  };
  const Main = () => {
    return (
      <View
        style={{
          width: width - 64,
          backgroundColor: "white",
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
          <MyText size6 b2i color="grey">
            When you upgrade your membership in our app,
          </MyText>
          <MyText size6 b2i color="grey">
            you will get more amazing features!
          </MyText>
        </View>
        <BillButtons></BillButtons>
        <ButtonGoPremium></ButtonGoPremium>
        <Fotter></Fotter>
      </View>
    );
  };
  const CloseButton = () => {
    return (
      <View style={{ position: "absolute", top: 16, right: 16 }}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(false);
          }}
        >
          <FontAwesome name="close" size={24} color={COLOR.grey} />
        </TouchableOpacity>
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
          <CloseButton></CloseButton>
        </View>
      </Modal>
    </>
  );
}

export default PremiumModal;
