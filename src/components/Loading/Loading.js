import React from "react";
import { ActivityIndicator, View } from "react-native";
import COLOR from "../../constants/colors";
import MyText from "../MyText/MyText";
import styles from "./styles";

const Loading = () => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" color={COLOR.lightBlue} />
      <MyText b5 center color={COLOR.lightBlue}>
        Loading
      </MyText>
    </View>
  );
};

export default Loading;
