import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import MyButton from "../../../components/MyButton";
import MySwitch from "../../../components/MySwitch";
import MyCard from "../../../components/MyCard";
import { useUser } from "../../../context/UserContext";

import LiveChat from "react-native-livechat";

import * as api from "../../../api/post";
import { width } from "../../../constants/dimensions";
import { shareApp } from "../../../utils/share";
import { Linking } from "react-native";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SettingScreen({ navigation }) {
  // const user = useContext(UserContext);
  const user = useUser();
  const { updateUser } = user;

  const [loading, setLoading] = useState(false);
  // const [posts, setPosts] = useState();

  useEffect(() => {}, []);

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

  const OptionCard = ({ content, isToggle, action }) => {
    const [toggle, setToggle] = useState(true);
    return (
      <View style={{ marginTop: -12, zIndex: -1 }}>
        <MyCard>
          <TouchableOpacity onPress={action}>
            <View
              style={{
                width: width - 64,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <MyText>{content ?? "Edit Profile"}</MyText>
              {isToggle && (
                <MySwitch
                  onValueChange={() => {
                    setToggle(!toggle);
                  }}
                  value={toggle}
                />
              )}
            </View>
          </TouchableOpacity>
        </MyCard>
      </View>
    );
  };

  const Background = () => {
    return (
      <View
        style={{
          zIndex: -1,
          position: "absolute",
          bottom: 8,
          alignItems: "center",
          justifyContent: "center",
          left: 0,
          width: width,
          opacity: 0.6,
        }}
      >
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/12/62/14/12621425947729e1d6bcf14aa4249eb9.jpg",
          }}
          style={{
            width: width * 0.8,
            height: width * 0.6,
            resizeMode: "cover",
          }}
        ></Image>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Background></Background>
        <OptionCard
          content={"Edit Profile"}
          isToggle={false}
          action={() => navigation.navigate("Profile")}
        />
        <OptionCard
          content={"Invite Friend"}
          isToggle={false}
          action={() => shareApp()}
        />
        <OptionCard
          content={"Push Notifications"}
          isToggle={true}
          action={() => {
            //TODO: remove noti
          }}
        />
        <OptionCard
          content={"Help and Support"}
          isToggle={false}
          action={() =>
            Linking.openURL("https://www.facebook.com/superselfapp")
          }
        />
        <OptionCard
          content={"Connect Device"}
          isToggle={false}
          action={() => {
            //TODO: coming soon
            navigation.navigate("Integrate");
          }}
        />
        <OptionCard
          content={"About us"}
          isToggle={false}
          action={() => navigation.navigate("About")}
        />
        <OptionCard
          content={"Log Out"}
          isToggle={false}
          action={() => handleLogOut()}
        />

        <LiveChat
          license="12939330"
          redirectUri="https://superselfapp.herokuapp.com/"
          clientId="39df9d0114585d22820ef51b08b61cf7"
          style={{ zIndex: 10 }}
        />
      </View>
    </ScrollView>
  );
}

export default SettingScreen;
