import React, { useState } from "react";
import { View, Alert, Image, Switch, ScrollView } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";

import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";
import MySwitch from "../../../components/MySwitch";
import { DatePicker, DeckSwiper, Fab, Icon } from "native-base";
import Loading from "../../../components/Loading";
import MyTextInput from "../../../components/MyTextInput";

import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import MyFloatingButton from "../../../components/MyFloatingButton";

function TestComponentScreen() {
  // handle input
  const [username, setUsername] = useState();

  // switch handle
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  // handle alert
  const handlePress = () => {
    Alert.alert(
      "This is a test",
      `My name is ${username}`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Do this",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

  // handle action button
  const [isActiveFloatingButton, setIsActiveFloatingButton] = useState(false);

  //#region handle bottom sheet

  const renderContent = () => (
    <View
      style={{
        backgroundColor: COLOR.grey,
        padding: 16,
        height: 450,
      }}
    >
      <MyText>Swipe down to close</MyText>
    </View>
  );

  const sheetRef = React.useRef(null);

  //#endregion

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <MyCard style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <Loading />
            <Loading noText color={COLOR.orange} size="small" />
          </View>

          {/* put component in view to make it width to the max of view */}
          <View>
            <MyText b6>Home screen edit</MyText>
            <MyButton onPress={handlePress}>
              <MyText>test</MyText>
            </MyButton>
            <MyTextInput
              placeholder="USERNAME"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(username) => setUsername(username)}
              value={username}
            />
          </View>

          {/* icon button */}
          <MyButton
            color={COLOR.purple}
            onPress={() => sheetRef.current.snapTo(0)}
          >
            <Entypo name="eye" size={24} color="black" />
          </MyButton>
          <MyTextInput
            borderColor={COLOR.green}
            placeholder="USERNAME"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(username) => setUsername(username)}
            value={username}
          />

          <MySwitch onValueChange={toggleSwitch} value={isEnabled} />

          {/* <DatePicker /> */}
        </MyCard>

        <MyFloatingButton
          active={isActiveFloatingButton}
          onPress={() => {
            setIsActiveFloatingButton((prev) => !prev);
          }}
        >
          <Entypo name="thumbs-up" size={24} color={COLOR.white} />
          {/* optional */}
          <MyButton style={{ backgroundColor: COLOR.lightGreen }}>
            <Entypo name="thumbs-up" size={24} color={COLOR.white} />
          </MyButton>
          <MyButton style={{ backgroundColor: COLOR.blue }}>
            <Entypo name="thumbs-up" size={24} color={COLOR.white} />
          </MyButton>
          <MyButton disabled style={{ backgroundColor: COLOR.red }}>
            <Entypo name="thumbs-up" size={24} color={COLOR.white} />
          </MyButton>
        </MyFloatingButton>
      </View>

      {/* put outside view to show */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={["50%", "30%", 0]}
        borderRadius={20}
        renderContent={renderContent}
        initialSnap={2} // index of start point
      />
    </ScrollView>
  );
}

export default TestComponentScreen;
