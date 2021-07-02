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
import { width } from "../../../constants/dimensions";
import Avatar from "./Avatar";
import InfoCard from "./InfoCard";
import BackgroundCardInfo from "./BackgroundCardInfo";
import Background from "./Background";
import MyBadges from "./MyBadges";
import MyChart from "./MyChart";
import LogoutBtn from "./LogoutBtn";

import * as apiUser from "../../../api/user";

function ProfileScreen({ navigation, route }) {
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
    if (!item) {
      apiUser
        .getUser(user.state.uid)
        .then((res) => {
          // setUsername(res.data.username);
          // setDescription(res.data.userInfo?.description);
          // setRole(res.data.role);
          // setNumberOfHabitsByThemes(res.data.numberOfHabitsByThemes);
          setSpecifiedUser(res.data);
        })
        .catch((error) => {
          alert("Error when getting user");
          console.log("Error when get user", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isFocused]);

  const CardProfile = () => {
    return (
      <View>
        <View
          style={{
            width: width,
            padding: 16,
            backgroundColor: "white",
            borderRadius: 32,
            elevation: 20,
            marginTop: 72,
            marginBottom: 48,
            flex: 1,
          }}
        >
          <Avatar avatarUrl={specifiedUser?.avatarUrl} />
          <BackgroundCardInfo />
          <InfoCard
            username={specifiedUser?.username}
            role={specifiedUser?.role}
            description={specifiedUser?.userInfo?.description}
          />

          <MyChart
            numberOfHabitsByThemes={specifiedUser?.numberOfHabitsByThemes}
          />
          <MyBadges />
          <LogoutBtn />
          <View style={{ height: 48 }}></View>
        </View>
      </View>
    );
  };
  return (
    <>
      {loading ? (
        <SkeletonSample />
      ) : (
        <>
          <ScrollView style={styles.container}>
            <Background />
            <CardProfile></CardProfile>
          </ScrollView>
          <MyFloatingButton
            // active={isActiveFloatingButton}
            position="topRight"
            onPress={() =>
              navigation.navigate("Edit User", {
                item: specifiedUser,
              })
            }
          >
            <Entypo name="edit" size={24} color={COLOR.white} />
          </MyFloatingButton>
        </>
      )}
    </>
  );
}

export default ProfileScreen;
