import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import TestColorScreen from "../../screens/Test/TestColorScreen/TestColorScreen";
import TestTextScreen from "../../screens/Test/TestTextScreen/TestTextScreen";
import COLOR from "../../constants/colors";
import TestComponentScreen from "../../screens/Test/TestComponentScreen/TestComponentScreen";
import FONT from "../../constants/font";

const Tab = createMaterialBottomTabNavigator();

function TabMaterialNavigator() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: COLOR.green }}>
      <Tab.Screen name="Test component" component={TestComponentScreen} />
      <Tab.Screen name="Test color" component={TestColorScreen} />
      <Tab.Screen name="Test text" component={TestTextScreen} />
    </Tab.Navigator>
  );
}

export default TabMaterialNavigator;
