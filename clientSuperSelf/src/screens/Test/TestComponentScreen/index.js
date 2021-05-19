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
  const [active, setActive] = useState(false);

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

        <Fab
          active={active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: COLOR.orange }}
          position="bottomRight"
          onPress={() => setActive((prev) => !prev)}
        >
          <Icon name="share" />
          <MyButton style={{ backgroundColor: COLOR.lightGreen }}>
            <Icon name="logo-whatsapp" />
          </MyButton>
          <MyButton style={{ backgroundColor: COLOR.blue }}>
            <Icon name="logo-facebook" />
          </MyButton>
          <MyButton disabled style={{ backgroundColor: COLOR.red }}>
            <Icon name="mail" />
          </MyButton>
        </Fab>
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
