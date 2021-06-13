import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, ScrollView, FlatList } from "react-native";
import styles from "./styles";
import styled from "styled-components";
import { useIsFocused } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import moment from "moment";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import Loading from "../../../components/Loading";
import MyTextInput from "../../../components/MyTextInput";
import SkeletonSample from "../../../components/SkeletonSample";
import MyCard from "../../../components/MyCard";
import MySwitch from "../../../components/MySwitch";
import FooterList from "../../../components/FooterList";
import MyFloatingButton from "../../../components/MyFloatingButton";

import { useUser } from "../../../context/UserContext";

function FeedScreen() {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {/* <SelfArea>
            <SearchBar
              placeholder="Search here"
              // onPress={() => alert("onPress")}
              onChangeText={(text) => filterItem(text)}
              onClearPress={() => filterItem("")}
            />
          </SelfArea> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={[styles.content, { marginTop: 50 }]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            ></View>

            <View>{loading ? <SkeletonSample /> : <></>}</View>
          </View>
        </ScrollView>

        {/* action button */}
        <MyFloatingButton
          // active={isActiveFloatingButton}
          position="bottomRight"
          onPress={() => navigation.navigate("Add Habit")}
        >
          <Entypo name="plus" size={24} color={COLOR.white} />
        </MyFloatingButton>
      </View>
    </View>
  );
}

const SelfArea = styled.View`
  background-color: ${COLOR.white};
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default FeedScreen;
