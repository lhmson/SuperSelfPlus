import React, { useContext } from "react";
import { View, Alert } from "react-native";
import MyButton from "../../../components/MyButton";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import styles from "./styles";

import { useUser } from "../../../context/UserContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileScreen() {
  // const [user, setUser] = useContext(UserContext);
  const user = useUser();
  const { updateUser } = user;

  const handleLogOut = async () => {
    Alert.alert(
      "Confirm your action",
      "You wanna logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            // const loggedOut = await User.logOut();
            // if (loggedOut) {
            //   setUser((state) => ({ ...state, isLoggedIn: false }));
            // }
            try {
              await AsyncStorage.removeItem("superself_token").then(() =>
                updateUser({ isLoggedIn: false })
              );
            } catch (error) {
              alert("Error log out");
              console.log("Error log out", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <MyText b6>Profile screen</MyText>
      <MyButton onPress={handleLogOut}>
        <MyText b5>Logout</MyText>
      </MyButton>
    </View>
  );
}

export default ProfileScreen;
