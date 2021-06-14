import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Nunito_200ExtraLight,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light,
  Nunito_300Light_Italic,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black,
  Nunito_900Black_Italic,
} from "@expo-google-fonts/nunito";
import AppLoading from "expo-app-loading";
import * as ScreenOrientation from "expo-screen-orientation";
import { useKeepAwake } from "expo-keep-awake";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/Home/HomeScreen";
import Main from "./src/navigation/Main";
import COLOR from "./src/constants/colors";
import { UserProvider } from "./src/context/UserContext";
import { HabitProvider } from "./src/context/HabitContext";
import Toast from "react-native-toast-message";

export default function App() {
  LogBox.ignoreLogs([
    "Setting a timer",
    "VirtualizedLists should never be nested",
    "Animated: `useNativeDriver` was not specified.",
  ]);
  useKeepAwake(); // this keeps the screen awake for as long as the owner component is mounted

  let [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light,
    Nunito_300Light_Italic,
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_600SemiBold,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black,
    Nunito_900Black_Italic,
  });

  useEffect(() => {
    lockOrientation();
  }, []);

  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={styles.container}>
          {!fontsLoaded ? (
            <AppLoading />
          ) : (
            <>
              <UserProvider>
                <HabitProvider>
                  <Main />
                </HabitProvider>
              </UserProvider>
              <Toast ref={(ref) => Toast.setRef(ref)} />
            </>
          )}
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.lightGreen,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
