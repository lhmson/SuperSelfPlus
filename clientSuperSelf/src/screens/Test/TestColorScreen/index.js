import React from "react";
import { View, ScrollView } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import styles from "./styles";

function TestColorScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View>
        <MyText color={COLOR.green}>Test green</MyText>
        <MyText color={COLOR.lightGreen}>Test lightGreen</MyText>
        <MyText color={COLOR.red}>Test red</MyText>
        <MyText color={COLOR.yellow}>Test yellow</MyText>
        <MyText color={COLOR.orange}>Test orange</MyText>
        <MyText color={COLOR.blue}>Test blue</MyText>
        <MyText color={COLOR.lightBlue}>Test lightBlue</MyText>
        <MyText color={COLOR.grey}>Test grey</MyText>
        <MyText color={COLOR.whiteSmoke}>Test whiteSmoke</MyText>
        <MyText color={COLOR.purple}>Test purple</MyText>
        <MyText color={COLOR.black}>Test black</MyText>

        <View style={{ backgroundColor: COLOR.green }}>
          <MyText>Test green</MyText>
        </View>
        <View style={{ backgroundColor: COLOR.lightGreen }}>
          <MyText>Test lightGreen</MyText>
        </View>
        <View style={{ backgroundColor: COLOR.red }}>
          <MyText>Test red</MyText>
        </View>
        <View style={{ backgroundColor: COLOR.yellow }}>
          <MyText>Test yellow</MyText>
        </View>
        <View style={{ backgroundColor: COLOR.orange }}>
          <MyText>Test orange</MyText>
        </View>
        <View style={{ backgroundColor: COLOR.blue }}>
          <MyText>Test blue</MyText>
        </View>
        <View style={{ backgroundColor: COLOR.lightBlue }}>
          <MyText>Test lightBlue</MyText>
        </View>
        <View style={{ backgroundColor: COLOR.grey }}>
          <MyText>Test grey</MyText>
        </View>
        <View style={{ backgroundColor: COLOR.whiteSmoke }}>
          <MyText>Test whiteSmoke</MyText>
        </View>
        <View style={{ backgroundColor: COLOR.purple }}>
          <MyText>Test purple</MyText>
        </View>
        <View style={{ backgroundColor: COLOR.black }}>
          <MyText color={COLOR.whiteSmoke}>Test black</MyText>
        </View>
      </View>
    </ScrollView>
  );
}

export default TestColorScreen;
