import React, { useContext, useState } from "react";
import { View, Alert } from "react-native";
import MyButton from "../../../components/MyButton";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import styles from "../styles";
import { useUser } from "../../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../../components/Loading";
import MyCard from "../../../components/MyCard";

function LogoutBtn() {
  const user = useUser();
  const { updateUser } = user;

  const [loading, setLoading] = useState(false);

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
            setLoading(true);
            try {
              await AsyncStorage.removeItem("superself_token").then(() =>
                updateUser({ isLoggedIn: false })
              );
            } catch (error) {
              alert("Error log out");
              console.log("Error log out", error.message);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <MyButton onPress={handleLogOut} color={COLOR.green}>
      {loading ? (
        <Loading size="small" noText />
      ) : (
        <MyText b5 color="white">
          Logout
        </MyText>
      )}
    </MyButton>
  );
}

export default LogoutBtn;
