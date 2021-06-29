import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import generateQuotes from "../../utils/quotes/generateQuotes";
import MyText from "../../components/MyText";
import COLOR from "../../constants/colors";
import FONT from "../../constants/font";

import HomeScreen from "../../screens/Home/HomeScreen";
import AboutScreen from "../../screens/AboutScreen";
import RunningScreen from "../../screens/Running/RunningScreen";
import WorldScreen from "../../screens/World/WorldScreen";
import ProfileScreen from "../../screens/Profile/ProfileScreen";
import TabMaterialNavigator from "../TabMaterialNavigator";
import HabitsScreen from "../../screens/Habit/HabitsScreen";
import DetailHabitScreen from "../../screens/Habit/DetailHabitScreen";
import AddHabitScreen from "../../screens/Habit/AddHabitScreen";
import MapRunningScreen from "../../screens/Running/MapRunningScreen/index";
import RankRunningScreen from "../../screens/Running/RankRunningScreen/index";
import RunningHomeScreen from "../../screens/Running/RunningHome/index";
import ChartRunningScreen from "../../screens/Running/ChartRunningScreen";
import PedometerScreen from "../../screens/Running/PedometerScreen/index";
import HabitStatisticsScreen from "../../screens/Habit/HabitStatisticsScreen";
import RecommendedHabitScreen from "../../screens/Habit/RecommendedHabitScreen";
import SettingScreen from "../../screens/Setting/SettingScreen";
import EventScreen from "../../screens/World/EventsScreen/index";
import DetailEventScreen from "../../screens/World/DetailEvent/index";
import EditUserScreen from "../../screens/Profile/EditUserScreen.js";
import RankEventScreen from "../../screens/World/RankEvent/index";

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
      fontSize: 24,
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
            padding: 8,
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
          style={{ padding: 8, justifyContent: "center" }}
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
      <Stack.Screen name="Home" component={HabitsScreen} />
      {/* <Stack.Screen name="Habits" component={HabitsScreen} /> */}
      <Stack.Screen name="Add Habit" component={AddHabitScreen} />
      <Stack.Screen name="Edit Habit" component={DetailHabitScreen} />
      <Stack.Screen name="Habit Stats" component={HabitStatisticsScreen} />
      <Stack.Screen name="Suggestion" component={RecommendedHabitScreen} />
    </Stack.Navigator>
  );
};

const RunningStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="Running Home" component={RunningHomeScreen} />
      <Stack.Screen name="Goal Running" component={MapRunningScreen} />
      <Stack.Screen name="Rank" component={RankRunningScreen} />
      <Stack.Screen name="Run Charts" component={ChartRunningScreen} />
      <Stack.Screen name="Pedometer" component={PedometerScreen} />
    </Stack.Navigator>
  );
};

const WorldStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="Event" component={EventScreen} />
      <Stack.Screen name="Detail Event" component={DetailEventScreen} />
      <Stack.Screen name="Rank Event" component={RankEventScreen} />
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

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={(props) => screenOptionStyle(props)}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Edit User" component={EditUserScreen} />
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
  ProfileStackNavigator,
  TestStackNavigator,
};
