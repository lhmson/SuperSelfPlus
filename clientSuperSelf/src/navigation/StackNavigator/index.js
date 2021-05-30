import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import generateQuotes from "../../utils/quotes/generateQuotes";
import MyText from "../../components/MyText";
import COLOR from "../../constants/colors";
import FONT from "../../constants/font";

import HomeScreen from "../../screens/Home/HomeScreen";
import AboutScreen from "../../screens/AboutScreen";
import RunningScreen from "../../screens/Running/RunningScreen";
import WorldScreen from "../../screens/World/WorldScreen";
import SettingScreen from "../../screens/Setting/SettingScreen";
import TabMaterialNavigator from "../TabMaterialNavigator";
import HomeOneScreen from "../../screens/Home/HomeOneScreen.js";
import MapRunningScreen from "../../screens/Running/MapRunningScreen/index";
import RankRunningScreen from "../../screens/Running/RankRunningScreen/index";

const Stack = createStackNavigator();

const LogoTitle = ({ toggleDrawer }) => {
  return (
    <TouchableOpacity style={{ padding: 12 }} onPress={toggleDrawer}>
      {/* <Image
        style={{ width: 50, height: 50 }}
        source={require("../../utils/resources/superself-icon.png")}
      /> */}
      <FontAwesome5 name="list-alt" size={32} color={COLOR.yellow} />
    </TouchableOpacity>
  );
};

const screenOptionStyle = (props) => {
  const { toggleDrawer } = props.navigation; // <-- drawer's navigation (not from stack)

  const handleNotifications = () => {};

  return {
    headerStyle: {
      backgroundColor: COLOR.green,
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
    headerTitleStyle: {
      fontFamily: FONT.Nunito_700,
      fontSize: 28,
    },
    headerRight: () => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            padding: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            handleNotifications();
          }}
        >
          <MyText b5 color={COLOR.yellow}>
            1
          </MyText>
          <Ionicons name="notifications" size={32} color={COLOR.yellow} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 12, justifyContent: "center" }}
          onPress={() => {
            generateQuotes();
          }}
        >
          <MaterialIcons name="menu-book" size={32} color={COLOR.yellow} />
        </TouchableOpacity>

        <LogoTitle toggleDrawer={toggleDrawer} />
      </View>
    ),
    //headerStatusBarHeight: 30,
  };
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Home 1" component={HomeOneScreen} />
    </Stack.Navigator>
  );
};

const RunningStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="Running" component={MapRunningScreen} />
      <Stack.Screen name="Rank" component={RankRunningScreen} />
    </Stack.Navigator>
  );
};

const WorldStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="World" component={WorldScreen} />
    </Stack.Navigator>
  );
};

const AboutStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};

const SettingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
};

const TestStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="Test" component={TabMaterialNavigator} />
    </Stack.Navigator>
  );
};

export {
  HomeStackNavigator,
  RunningStackNavigator,
  WorldStackNavigator,
  AboutStackNavigator,
  SettingStackNavigator,
  TestStackNavigator,
};
