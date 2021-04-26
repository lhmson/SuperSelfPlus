import React from "react";
import { View, ScrollView, SafeAreaView, Image, Linking } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";

import { AboutStackNavigator } from "../StackNavigator/StackNavigator";
import TabNavigator from "../TabNavigator/TabNavigator";
import COLOR from "../../constants/colors";
import FONT from "../../constants/font";
import TabMaterialNavigator from "../TabMaterialNavigator/TabMaterialNavigtor";

const Drawer = createDrawerNavigator();

const screenOptionStyle = {};

const CustomDrawer = (props) => {
  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View style={styles.drawerHeader}>
          <Image
            source={require("../../utils/resources/superself-logo.png")}
            style={styles.drawerImage}
          />
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Contact"
          labelStyle={{ fontFamily: FONT.Nunito_600 }}
          onPress={() => Linking.openURL("https://facebook.com/")}
          icon={({ focused, size }) => (
            <FontAwesome
              name="phone-square"
              size={24}
              style={{ color: focused ? COLOR.blue : COLOR.black }}
            />
          )}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName="Home"
      drawerType="back"
      drawerStyle={{ width: "50%", backgroundColor: COLOR.whiteSmoke }}
      drawerContent={(props) => CustomDrawer(props)}
      drawerContentOptions={{
        labelStyle: {
          fontFamily: FONT.Nunito_600,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="home"
              size={24}
              style={{ color: focused ? COLOR.blue : COLOR.black }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutStackNavigator}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="info-circle"
              size={24}
              style={{ color: focused ? COLOR.blue : COLOR.black }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="How to"
        component={AboutStackNavigator}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="question-circle"
              size={24}
              style={{ color: focused ? COLOR.blue : COLOR.black }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Test"
        component={TabMaterialNavigator}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="search"
              size={24}
              style={{ color: focused ? COLOR.blue : COLOR.black }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
