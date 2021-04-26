import React, { useContext, useEffect, useState } from "react";
import { Image, View, Linking, Alert } from "react-native";
import Loading from "../../components/Loading/Loading";
import MyText from "../../components/MyText/MyText";
import styles from "./styles";
import COLOR from "../../constants/colors";
import { Container } from "./styles";
import { UserContext } from "../../context/UserContext";
// import { UserContext } from "../context/UserContext";
// import { UserFirebaseContext } from "../context/UserFirebaseContext";
// import { SettingContext } from "../context/SettingContext";
// import { SettingFirebaseContext } from "../context/SettingFirebaseContext";

const LoadingScreen = () => {
  const [_, setUser] = useContext(UserContext);
  //   const userFirebase = useContext(UserFirebaseContext);
  //   const [_setting, setSetting] = useContext(SettingContext);
  //   const settingFirebase = useContext(SettingFirebaseContext);
  //   const [cancel, setCancel] = useState(false);
  useEffect(() => {
    //     setCancel(false);
    setTimeout(async () => {
      //       const user = userFirebase.getCurrentUser();
      //       if (user) {
      //         const userInfo = await userFirebase.getUserInfo(user.uid);
      //         const settingInfo = await settingFirebase.getSettingInfo(user.uid);
      //         if (userInfo === undefined) {
      //           Alert.alert(
      //             "Our world being maintained",
      //             "There's an error in server, sorry for this event, wait for us to fix and come later",
      //             [
      //               {
      //                 text: "Cancel",
      //                 onPress: () => {
      //                   setCancel(true);
      //                 },
      //                 style: "cancel",
      //               },
      //               {
      //                 text: "Visit website",
      //                 onPress: () => {
      //                   Linking.openURL("https://facebook.com/");
      //                 },
      //               },
      //             ],
      //             { cancelable: false }
      //           );
      //         }
      setUser({
        isLoggedIn: true,
        //           email: userInfo.email,
        //           uid: user.uid,
        //           username: userInfo.username,
        //           gender: userInfo.gender,
        //           // birthday: userInfo.birthday,
        //           profilePhotoUrl: userInfo.profilePhotoUrl,
      });
      //         // init setting
      //         setSetting({
      //           theme: settingInfo.theme, // dark mode enable
      //           allowPush: settingInfo.allowPush,
      //           sound: settingInfo.sound,
      //           snow: settingInfo.snow,
      //           language: settingInfo.language,
      //         });
      //       } else {
      //         setUser((state) => ({ ...state, isLoggedIn: false })); //hihi
      //       }
    }, 2300);
    //   }, [cancel]);
  });
  return (
    <View style={styles.container}>
      <Image source={require("../../utils/resources/superself-logo.png")} />
      <Loading />
      <MyText b6 size3 color={COLOR.blue}>
        Enter the world of yours
      </MyText>
    </View>
  );
};

export default LoadingScreen;
