import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { StatusBar } from "react-native";
import LoadingScreen from "../../screens/LoadingScreen";
import OnboardingScreen from "../../screens/OnboardingScreen";
import AuthStackNavigator from "../AuthStackNavigator";
import DrawerNavigator from "../DrawerNavigator";
import { useUser } from "../../context/UserContext";

const AppStackNavigator = () => {
  const AppStack = createStackNavigator();
  const user = useUser();

  const { isLoggedIn } = user.state;

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <AppStack.Navigator headerMode="none">
        {isLoggedIn === null ? (
          <AppStack.Screen name="Loading" component={LoadingScreen} />
        ) : isLoggedIn ? (
          <AppStack.Screen name="Main" component={DrawerNavigator} />
        ) : (
          <>
            <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
            <AppStack.Screen name="Auth" component={AuthStackNavigator} />
          </>
        )}
      </AppStack.Navigator>
    </>
  );
};

export default AppStackNavigator;
