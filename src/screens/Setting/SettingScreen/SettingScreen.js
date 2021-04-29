import React, { useContext } from "react";
import { View, Alert } from "react-native";
import MyButton from "../../../components/MyButton/MyButton";
import MyText from "../../../components/MyText/MyText";
import COLOR from "../../../constants/colors";
import styles from "./styles";

import User from "../../../api/Users";
import { UserContext } from "../../../context/UserContext";

function SettingScreen() {
  const [user, setUser] = useContext(UserContext);

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
            const loggedOut = await User.logOut();
            if (loggedOut) {
              setUser((state) => ({ ...state, isLoggedIn: false }));
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <MyText b6>Setting screen</MyText>
      <MyButton onPress={handleLogOut}>
        <MyText b5>Logout</MyText>
      </MyButton>
    </View>
  );
}

export default SettingScreen;
