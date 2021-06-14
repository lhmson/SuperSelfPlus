import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SignInScreen from "../../screens/Auth/SignInScreen";
import SignUpScreen from "../../screens/Auth/SignUpScreen";

const AuthStackNavigator = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
