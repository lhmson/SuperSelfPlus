import React from "react";
import { ActivityIndicator, View } from "react-native";
import COLOR from "../../constants/colors";
import MyText from "../MyText";
import styles from "./styles";

// props: size (large, small) color noText

const Loading = (props) => {
  const color = props.color ?? COLOR.blue;
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator size={props.size ?? "large"} color={color} />
      {props.noText || (
        <MyText b5 center color={color}>
          Loading
        </MyText>
      )}
    </View>
  );
};

export default Loading;
