import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../../../components/Loading/Loading";
import MyText from "../../../components/MyText/MyText";
import styles from "./styles";

function TestTextScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Loading />
        <MyText b1>Test b1</MyText>
        <MyText b2>Test b2</MyText>
        <MyText b3>Test b3</MyText>
        <MyText b4>Test b4</MyText>
        <MyText b5>Test b5</MyText>
        <MyText b6>Test b6</MyText>
        <MyText b7>Test b7</MyText>

        <MyText b1i>Test b1i</MyText>
        <MyText b2i>Test b2i</MyText>
        <MyText b3i>Test b3i</MyText>
        <MyText b4i>Test b4i</MyText>
        <MyText b5i>Test b5i</MyText>
        <MyText b6i>Test b6i</MyText>
        <MyText b6i>Test b7i</MyText>

        <MyText size1>Test size1</MyText>
        <MyText size2>Test size2</MyText>
        <MyText size3>Test size3</MyText>
        <MyText size4>Test size4</MyText>
        <MyText size5>Test size5</MyText>

        <MyText>Test</MyText>
        <MyText center>Test center</MyText>
        <MyText right>Test right</MyText>
      </View>
    </ScrollView>
  );
}

export default TestTextScreen;
