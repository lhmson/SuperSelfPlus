import React, { useContext } from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "../../screens/LoadingScreen";
import OnboardingScreen from "../../screens/OnboardingScreen";
import AuthStackNavigator from "../AuthStackNavigator";
import DrawerNavigator from "../DrawerNavigator";
import { UserContext } from "../../context/UserContext";

const AppStackNavigator = () => {
  const AppStack = createStackNavigator();
  const [user] = useContext(UserContext);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <AppStack.Navigator headerMode="none">
        {user.isLoggedIn === null ? (
          <AppStack.Screen name="Loading" component={LoadingScreen} />
        ) : user.isLoggedIn ? (
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
