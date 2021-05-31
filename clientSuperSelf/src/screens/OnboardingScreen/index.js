import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import Onboarding from "react-native-onboarding-swiper";
import styles from "./styles";
import COLOR from "../../constants/colors";
import MyText from "../../components/MyText";

const Dots = ({ selected }) => {
  const backgroundColor = selected ? COLOR.black : COLOR.grey;

  return (
    <View
      style={[styles.dots, { backgroundColor, width: selected ? 16 : 8 }]}
    />
  );
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
              Mind your brain
            </MyText>
          ),
          subtitle: <MyText size5>Fill your life with good habits 👍</MyText>,
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
              Train your health
            </MyText>
          ),
          subtitle: (
            <MyText size5>Put your little steps into the large world 👟</MyText>
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
              Smell your success
            </MyText>
          ),
          subtitle: <MyText size5>Let yourself be the glowing star 🌟</MyText>,
        },
      ]}
    />
  );
};

export default OnboardingScreen;
