import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { View, ScrollView, FlatList } from "react-native";
import styles from "../styles";
import styled from "styled-components";
import { useIsFocused } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import moment from "moment";

import BottomSheet from "@gorhom/bottom-sheet";

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
import { width } from "../../../constants/dimensions";

function RecommendedHabitScreen() {
  const [loading, setLoading] = useState(true);

  const snapPoints = useMemo(() => ["2%", "70%"], []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

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
          <View style={styles.content}>
            <MyButton
              onPress={() => {
                alert("this");
              }}
            >
              <MyText b6 color={COLOR.white}>
                Top Trending
              </MyText>
              <MyText size5 color={COLOR.white}>
                Get the most recommended items
              </MyText>
            </MyButton>

            <MyButton color={COLOR.red} style={styles.themeCard}>
              <MyText b6 color={COLOR.white}>
                Health & Fitness
              </MyText>
              <MyText size5 color={COLOR.white}>
                The foundation of our well-being
              </MyText>
            </MyButton>

            <MyButton color={COLOR.lightBlue} style={styles.themeCard}>
              <MyText b6 color={COLOR.white}>
                Spiritual Self-care
              </MyText>
              <MyText size5 color={COLOR.white}>
                Feel strong from the inside aspect
              </MyText>
            </MyButton>

            <MyButton color={COLOR.yellow} style={styles.themeCard}>
              <MyText b6 color={COLOR.white}>
                Finance Management
              </MyText>
              <MyText size5 color={COLOR.white}>
                Take control of our budget
              </MyText>
            </MyButton>

            <MyButton color={COLOR.purple} style={styles.themeCard}>
              <MyText b6 color={COLOR.white}>
                Skills Learning
              </MyText>
              <MyText size5 color={COLOR.white}>
                Explore the world of knowledge
              </MyText>
            </MyButton>

            <MyButton color={COLOR.lightGreen} style={styles.themeCard}>
              <MyText b6 color={COLOR.white}>
                Social Connection
              </MyText>
              <MyText size5 color={COLOR.white}>
                Keep in touch with valuable relationships
              </MyText>
            </MyButton>

            {/* <View>{loading ? <SkeletonSample /> : <></>}</View> */}
          </View>
        </ScrollView>

        {/* <BottomSheet
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: width,
              paddingHorizontal: 16,
              borderRadius: 30,
              backgroundColor: COLOR.white,
            }}
          ></View>
        </BottomSheet> */}

        {/* action button */}
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

export default RecommendedHabitScreen;
