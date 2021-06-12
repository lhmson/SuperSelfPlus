import React, { useContext, useEffect, useState } from "react";
import { Image, View, Linking, Alert } from "react-native";
import Loading from "../../components/Loading";
import MyText from "../../components/MyText";
import styles from "./styles";
import COLOR from "../../constants/colors";
import { Container } from "./styles";
import { useUser } from "../../context/UserContext";
// import { SettingContext } from "../context/SettingContext";
// import { SettingFirebaseContext } from "../context/SettingFirebaseContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

const LoadingScreen = () => {
  const user = useUser();
  const { updateUser } = user;
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    setCancel(false);
    setTimeout(async () => {
      let data = null;
      try {
        data = JSON.parse(await AsyncStorage.getItem("superself_token"));
        // alert(JSON.stringify(data));
      } catch (error) {
        alert("Cannot not get storage");
        console.log("Error in storage", error);
      }
      if (data) {
        // const userInfo = await User.getUserInfo(user.uid);
        const userInfo = data.result;
        if (userInfo === undefined) {
          Alert.alert(
            "Our world being maintained",
            "There's an error in server, sorry for this event, wait for us to fix and come later",
            [
              {
                text: "Cancel",
                onPress: () => {
                  setCancel(true);
                },
                style: "cancel",
              },
              {
                text: "Visit website",
                onPress: () => {
                  Linking.openURL("https://facebook.com/");
                },
              },
            ],
            { cancelable: false }
          );
        }
        updateUser({
          isLoggedIn: true,
          email: userInfo.email,
          uid: userInfo.uid,
          username: userInfo.username,
          createdAt: userInfo.createdAt,
        });
      } else {
        updateUser((state) => ({ ...state, isLoggedIn: false }));
      }
    }, 2300);
  }, [cancel]);

  return (
    <View style={styles.container}>
      <Image source={require("../../utils/resources/superself-logo.png")} />
      <Loading />
      <MyText b6 size3 color={COLOR.yellow}>
        Enter the world of yours
      </MyText>
    </View>
  );
};

export default LoadingScreen;
