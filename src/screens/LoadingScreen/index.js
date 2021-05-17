import React, { useContext, useEffect, useState } from "react";
import { Image, View, Linking, Alert } from "react-native";
import Loading from "../../components/Loading";
import MyText from "../../components/MyText";
import styles from "./styles";
import COLOR from "../../constants/colors";
import { Container } from "./styles";
import { UserContext } from "../../context/UserContext";
import User from "../../api/Users";
// import { SettingContext } from "../context/SettingContext";
// import { SettingFirebaseContext } from "../context/SettingFirebaseContext";

const LoadingScreen = () => {
  const [_, setUser] = useContext(UserContext);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    setCancel(false);
    setTimeout(async () => {
      const user = User.getCurrentUser();
      if (user) {
        const userInfo = await User.getUserInfo(user.uid);
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
        setUser({
          isLoggedIn: true,
          email: userInfo.email,
          uid: user.uid,
          username: userInfo.username,
          // gender: userInfo.gender,
          // birthday: userInfo.birthday,
          // profilePhotoUrl: userInfo.profilePhotoUrl,
        });
      } else {
        setUser((state) => ({ ...state, isLoggedIn: false })); //hihi
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
