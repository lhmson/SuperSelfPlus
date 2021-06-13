import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import MyText from "../../../components/MyText";
import COLOR from "../../../constants/colors";
import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import MyButton from "../../../components/MyButton";
import { useUser } from "../../../context/UserContext";

import * as api from "../../../api/post";

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

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <MyText b6>Setting screen</MyText>
      </View>
    </ScrollView>
  );
}

export default SettingScreen;
