import React, { useState } from "react";
import { View, Alert, Switch, ScrollView } from "react-native";
import MyText from "../../../components/MyText/MyText";
import COLOR from "../../../constants/colors";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";

import MyButton from "../../../components/MyButton/MyButton";
import MyCard from "../../../components/MyCard/MyCard";
import MySwitch from "../../../components/MySwitch/MySwitch";
import { DatePicker } from "native-base";
import Loading from "../../../components/Loading/Loading";
import MyTextInput from "../../../components/MyTextInput/MyTextInput";

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
          <MyButton color={COLOR.purple}>
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
      </View>
    </ScrollView>
  );
}

export default TestComponentScreen;
