import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import Onboarding from "react-native-onboarding-swiper";
import styles from "./styles";
import COLOR from "../../constants/colors";
import MyText from "../../components/MyText/MyText";

const Dots = ({ selected }) => {
  const backgroundColor = selected ? COLOR.black : COLOR.grey;

  return <View style={[styles.dots, { backgroundColor }]} />;
};

const Skip = ({ ...props }) => (
  <TouchableOpacity style={styles.actionButton} {...props}>
    <MyText>Skip</MyText>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={styles.actionButton} {...props}>
    <MyText>Next</MyText>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={styles.actionButton} {...props}>
    <MyText>Done</MyText>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.navigate("Auth")}
      onDone={() => navigation.replace("Auth")}
      pages={[
        {
          backgroundColor: COLOR.red,
          image: (
            <Image
              source={require("../../utils/resources/onboarding/onboarding-img1.png")}
            />
          ),
          title: (
            <MyText b4 size2>
              Connect to the World
            </MyText>
          ),
          subtitle: <MyText size5>A New Way To Connect With The World</MyText>,
        },
        {
          backgroundColor: COLOR.yellow,
          image: (
            <Image
              source={require("../../utils/resources/onboarding/onboarding-img2.png")}
            />
          ),
          title: (
            <MyText b4 size2>
              Share Your Favorites
            </MyText>
          ),
          subtitle: (
            <MyText size5>
              Share Your Thoughts With Similar Kind of People
            </MyText>
          ),
        },
        {
          backgroundColor: COLOR.green,
          image: (
            <Image
              source={require("../../utils/resources/onboarding/onboarding-img3.png")}
            />
          ),
          title: (
            <MyText b4 size2>
              Become The Star
            </MyText>
          ),
          subtitle: <MyText size5>Let The Spot Light Capture You</MyText>,
        },
      ]}
    />
  );
};

export default OnboardingScreen;
