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

import * as api from "../../../api/post";
import { width } from "../../../constants/dimensions";

function SettingScreen({ navigation }) {
  // const user = useContext(UserContext);
  const user = useUser();
  // const [posts, setPosts] = useState();

  useEffect(() => {
    // api
    //   .fetchPosts()
    //   .then((res) => setPosts(res.data))
    //   .catch((error) => {
    //     alert("Cannot fetch posts");
    //     console.log("Error fetch posts", error);
    //   });
  }, []);

  const OptionCard = ({ content, isToggle }) => {
    const [toggle, setToggle] = useState(true);
    return (
      <View style={{ marginTop: -12, zIndex: 1 }}>
        <TouchableOpacity>
          <MyCard>
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
          </MyCard>
        </TouchableOpacity>
      </View>
    );
  };

  const Background = () => {
    return (
      <View
        style={{
          zIndex: 0,
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
        <OptionCard content={"Edit Profile"} isToggle={false}></OptionCard>
        <OptionCard content={"Invite Friend"} isToggle={false}></OptionCard>
        <OptionCard content={"Push Notifications"} isToggle={true}></OptionCard>
        <OptionCard content={"Help and Support"} isToggle={false}></OptionCard>
        <OptionCard content={"Connect Device"} isToggle={false}></OptionCard>
        <OptionCard content={"About us"} isToggle={false}></OptionCard>
        <OptionCard content={"Log Out"} isToggle={false}></OptionCard>
      </View>
    </ScrollView>
  );
}

export default SettingScreen;
