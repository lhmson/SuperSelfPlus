import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import TestColorScreen from "../../screens/Test/TestColorScreen/TestColorScreen";
import TestTextScreen from "../../screens/Test/TestTextScreen/TestTextScreen";
import COLOR from "../../constants/colors";

const Tab = createMaterialBottomTabNavigator();

function TabMaterialNavigator() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: COLOR.lightBlue }}>
      <Tab.Screen name="Test color" component={TestColorScreen} />
      <Tab.Screen name="Test text" component={TestTextScreen} />
    </Tab.Navigator>
  );
}

export default TabMaterialNavigator;
