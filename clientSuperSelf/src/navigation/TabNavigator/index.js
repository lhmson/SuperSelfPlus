import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";
import COLOR from "../../constants/colors";
import FONT from "../../constants/font";
import ActionButton from "react-native-circular-action-menu";

import {
  HomeStackNavigator,
  RunningStackNavigator,
  SettingStackNavigator,
  WorldStackNavigator,
} from "../StackNavigator";

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
        iconName = "city";
        break;
      case "Setting":
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
  // const [midBtnSize, setMidBtnSize] = useState(100);
  // const toggleMidBtnSize = () => {
  //   midBtnSize === 100 ? setMidBtnSize(200) : setMidBtnSize(100);
  // };

  const setTabBarVisible = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = ["Home 1"]; // set name screens for tab hidden
    if (hideOnScreens.indexOf(routeName) > -1) return false;
    return true;
  };

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
              borderRadius: 15,
              margin: 10,
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
              tabBarBadge: 1,
            })}
          />
          <Tab.Screen name="Running" component={RunningStackNavigator} />
          <Tab.Screen name="World" component={WorldStackNavigator} />
          <Tab.Screen name="Setting" component={SettingStackNavigator} />
        </Tab.Navigator>
      </View>

      {/* <MidButtonView
        style={{
          width: midBtnSize,
          height: midBtnSize - 20,
          marginLeft: -midBtnSize / 2,
        }}
      >
        <MidActionButton
          style={styles.midButton}
          navigation={navigation}
          pressButton={() => {
            toggleMidBtnSize();
          }}
        />
      </MidButtonView> */}
    </>
  );
};

// const MidActionButton = (props) => {
//   const { navigation, pressButton } = props;
//   return (
//     <ActionButton
//       buttonColor={COLOR.green}
//       size={50}
//       style={styles.actionButton}
//       degrees={320}
//       onPress={pressButton}
//       onOverlayPress={pressButton}
//       icon={
//         <FontAwesome5
//           name="rocket"
//           style={{ color: COLOR.white, fontSize: 20 }}
//         />
//       }
//     >
//       <ActionButton.Item buttonColor="#transparent">
//         <View></View>
//       </ActionButton.Item>

//       <ActionButton.Item
//         buttonColor={COLOR.red}
//         size={60}
//         title="To do"
//         onPress={() => {
//           pressButton();
//           navigation.navigate("Add Todo");
//         }}
//         endDegree={0}
//       >
//         <FontAwesome5 name="clipboard-list" size={30} color={COLOR.white} />
//       </ActionButton.Item>

//       <ActionButton.Item
//         buttonColor={COLOR.yellow}
//         size={60}
//         title="My Challenge"
//         onPress={() => {
//           pressButton();
//           // navigation.replace("Challenge");
//           navigation.navigate("My Challenge");
//         }}
//         endDegree={0}
//       >
//         <FontAwesome5 name="address-card" size={30} color={COLOR.white} />
//       </ActionButton.Item>

//       <ActionButton.Item
//         buttonColor={COLOR.lightBlue}
//         size={60}
//         title="Message"
//         onPress={() => {
//           pressButton();
//           navigation.navigate("Message");
//         }}
//         endDegree={0}
//       >
//         <MaterialIcons name="message" size={30} color={COLOR.white} />
//       </ActionButton.Item>

//       <ActionButton.Item buttonColor="#transparent">
//         <View></View>
//       </ActionButton.Item>
//     </ActionButton>
//   );
// };

// const MidButtonView = styled.View`
//   ${"" /* border-width: 1px; */}
//   border-color: rgba(0, 0, 0, 0.2);
//   align-items: center;
//   justify-content: center;
//   ${"" /* width: 200px; */}
//   height: 200px;
//   position: absolute;
//   bottom: 45px;
//   left: 50%;
//   margin-left: -100px;
//   ${"" /* background-color: ${COLOR.primary}; */}
//   border-radius: 50px;
// `;

// const styles = StyleSheet.create({
//   actionButtonIcon: {},
//   actionButton: {},
//   midButton: {},
// });

export default BottomTabNavigator;
