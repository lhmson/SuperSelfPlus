import React, { useState } from "react";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components";
import COLOR from "../../constants/colors";
import FONT from "../../constants/font";

import {
  HomeStackNavigator,
  RunningStackNavigator,
  ProfileStackNavigator,
  WorldStackNavigator,
} from "../StackNavigator";
import { useHabits } from "../../context/HabitContext";

const Tab = createBottomTabNavigator();

const screenOptionStyle = (route) => ({
  tabBarIcon: ({ focused }) => {
    let iconName = "home";
    switch (route.name) {
      case "Home":
        iconName = "home";
        break;
      case "Running":
        iconName = "running";
        break;
      case "World":
        iconName = "font-awesome-flag";
        break;
      case "Profile":
        iconName = "user-cog";
        break;
      default:
        iconName = "chess";
    }

    return (
      <FontAwesome5
        name={iconName}
        size={24}
        color={focused ? COLOR.orange : COLOR.black}
      />
    );
  },
});

const BottomTabNavigator = ({ navigation }) => {
  const setTabBarVisible = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = [
      "Add Habit",
      "Edit Habit",
      "Suggestion",
      "Countdown",
    ]; // set name screens for tab hidden
    if (hideOnScreens.indexOf(routeName) > -1) {
      return false;
    }
    return true;
  };

  const habits = useHabits();

  return (
    <>
      <View style={{ flex: 1, zIndex: -1, backgroundColor: COLOR.whiteSmoke }}>
        <Tab.Navigator
          screenOptions={({ route }) => screenOptionStyle(route)}
          tabBarOptions={{
            activeTintColor: COLOR.orange,
            inactiveTintColor: COLOR.grey,
            labelStyle: {
              fontFamily: FONT.Nunito_700,
              fontSize: 14,
            },
            style: {
              height: 80,
              // elevation: 0,
              // borderRadius: 15,
              // margin: 10,
            },
            tabStyle: {
              margin: 10,
            },
            keyboardHidesTabBar: true,
            // showLabel: false
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackNavigator}
            options={({ route }) => ({
              tabBarVisible: setTabBarVisible(route), // set tab hidden for child screen
              tabBarBadge: habits.state.numberTodos,
            })}
          />
          <Tab.Screen
            name="Running"
            component={RunningStackNavigator}
            options={({ route }) => ({
              tabBarVisible: setTabBarVisible(route), // set tab hidden for child screen
            })}
          />
          <Tab.Screen
            name="World"
            component={WorldStackNavigator}
            options={({ route }) => ({
              tabBarVisible: setTabBarVisible(route), // set tab hidden for child screen
            })}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStackNavigator}
            options={({ route }) => ({
              tabBarVisible: setTabBarVisible(route), // set tab hidden for child screen
            })}
          />
        </Tab.Navigator>
      </View>

      {/* <AddToDoButton onPress={() => navigation.navigate("Add Habit")}>
        <FontAwesome5 name="plus" size={24} color={COLOR.yellow} />
      </AddToDoButton> */}
    </>
  );
};

// const AddToDoButton = styled.TouchableOpacity`
//   border-width: 1px;
//   border-color: rgba(0, 0, 0, 0.2);
//   align-items: center;
//   justify-content: center;
//   width: 70px;
//   height: 70px;
//   position: absolute;
//   bottom: 45px;
//   left: 50%;
//   margin-left: -35px;
//   background-color: ${COLOR.red};
//   border-radius: 100px;
// `;

export default BottomTabNavigator;
