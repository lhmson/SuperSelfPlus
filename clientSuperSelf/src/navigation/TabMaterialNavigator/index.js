import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import TestColorScreen from "../../screens/Test/TestColorScreen";
import TestTextScreen from "../../screens/Test/TestTextScreen";
import COLOR from "../../constants/colors";
import TestComponentScreen from "../../screens/Test/TestComponentScreen";
import FONT from "../../constants/font";
import ChartRunningScreen from "../../screens/Running/ChartRunningScreen/index";
import TestCalendarScreen from "../../screens/Test/TestCalendar";
import TestClockScreen from "../../screens/Test/TestClockCountDown/index";
const Tab = createMaterialBottomTabNavigator();

function TabMaterialNavigator() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: COLOR.green }}>
      <Tab.Screen name="Test component" component={TestComponentScreen} />
      <Tab.Screen name="Test color" component={TestColorScreen} />
      <Tab.Screen name="Test text" component={TestTextScreen} />
      <Tab.Screen name="Test chart" component={ChartRunningScreen} />
      <Tab.Screen name="Test calendar" component={TestCalendarScreen} />
      <Tab.Screen name="Test clock" component={TestClockScreen} />
    </Tab.Navigator>
  );
}

export default TabMaterialNavigator;
