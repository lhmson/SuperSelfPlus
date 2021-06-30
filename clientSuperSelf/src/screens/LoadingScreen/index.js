import React, { useContext, useEffect, useState } from "react";
import { Image, View, Linking, Alert } from "react-native";
import Loading from "../../components/Loading";
import MyText from "../../components/MyText";
import styles from "./styles";
import COLOR from "../../constants/colors";
import { Container } from "./styles";
import { useUser } from "../../context/UserContext";
import * as apiUser from "../../api/user";

import AsyncStorage from "@react-native-async-storage/async-storage";

const LoadingScreen = () => {
  const user = useUser();
  const { updateUser } = user;
  const [cancel, setCancel] = useState(false);

  const [currentUser, setCurrentUser] = useState();

  const alertUser = () => {
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
            Linking.openURL("https://www.facebook.com/superselfapp");
          },
        },
      ],
      { cancelable: false }
    );
  };

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
          alertUser();
        }
        //TODO: get only userid
        const uid = userInfo.uid;
        apiUser
          .getUser(uid)
          .then((res) => {
            setCurrentUser(res.data);
            updateUser({
              isLoggedIn: true,
              email: res.data.email,
              uid,
              username: res.data.username,
              createdAt: res.data.createdAt,
              // userInfo: res.data.userInfo,
              avatarUrl: res.data.avatarUrl,
              role: res.data.role,
            });
          })
          .catch((error) => {
            alertUser();
            console.log("Error when getting user", error);
          });

        // updateUser({
        //   isLoggedIn: true,
        //   email: userInfo.email,
        //   uid: userInfo.uid,
        //   username: userInfo.username,
        //   createdAt: userInfo.createdAt,
        //   // userInfo: userInfo.userInfo,
        //   avatarUrl: userInfo.avatarUrl,
        //   role: userInfo.role,
        // });
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
