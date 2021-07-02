import React, { useEffect, useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";

import COLOR from "../../../constants/colors";
import styles from "../styles";

import { useUser } from "../../../context/UserContext";
import { useIsFocused } from "@react-navigation/native";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyCard from "../../../components/MyCard";
import SkeletonSample from "../../../components/SkeletonSample";
import MyFloatingButton from "../../../components/MyFloatingButton";

import { Entypo } from "@expo/vector-icons";
import { height, width } from "../../../constants/dimensions";
import Avatar from "./Avatar";
import InfoCard from "./InfoCard";
import BackgroundCardInfo from "./BackgroundCardInfo";
import Background from "./Background";
import MyBadges from "./MyBadges";
import MyChart from "./MyChart";
import Modal from "react-native-modal";
import * as apiUser from "../../../api/user";

function ProfileModal({
  navigation,
  route,
  isVisible,
  setIsVisible,
  Buttons,
  userId,
}) {
  const item = route?.params?.item;
  const user = useUser();

  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);

  // const [username, setUsername] = useState("Anonymous");
  // const [description, setDescription] = useState("Become the best of myself");
  // const [role, setRole] = useState("New");

  // const [numberOfHabitsByThemes, setNumberOfHabitsByThemes] = useState([]);

  const [specifiedUser, setSpecifiedUser] = useState();

  useEffect(() => {
    apiUser
      .getUser(userId ?? user.state.uid)
      .then((res) => {
        setSpecifiedUser(res.data);
      })
      .catch((error) => {
        alert("Error when getting user");
        console.log("Error when get user", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  const CardProfile = () => {
    return (
      <View>
        <View
          style={{
            width: "98%",
            padding: 16,
            backgroundColor: "white",
            borderRadius: 40,
            elevation: 20,
            marginTop: 72,
            marginBottom: 48,
            flex: 1,
            alignSelf: "center",
          }}
        >
          <Avatar avatarUrl={specifiedUser.avatarUrl} />
          <BackgroundCardInfo />
          <InfoCard
            username={specifiedUser.username}
            role={specifiedUser.role}
            description={specifiedUser.userInfo?.description}
          />
          <View style={{ height: 100 }}></View>
          <MyBadges />
          <MyChart
            numberOfHabitsByThemes={specifiedUser.numberOfHabitsByThemes}
          />
          <View style={{ height: 48 }}></View>
        </View>
      </View>
    );
  };

  return (
    <>
      <Modal
        isVisible={isVisible}
        style={{
          alignSelf: "center",
          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            borderRadius: 40,
            height: 600,
            backgroundColor: "white",
            padding: 16,
          }}
        >
          {loading ? (
            <SkeletonSample />
          ) : (
            <>
              <ScrollView style={styles.container}>
                <Background />
                <CardProfile></CardProfile>
              </ScrollView>
            </>
          )}
          <Buttons></Buttons>
        </View>
      </Modal>
    </>
  );
}

export default ProfileModal;
