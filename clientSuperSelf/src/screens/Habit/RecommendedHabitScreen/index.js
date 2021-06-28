import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { View, ScrollView } from "react-native";
import styles from "../styles";
import styled from "styled-components";
import { useIsFocused } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import moment from "moment";

import { FlatList } from "react-native-gesture-handler";

import BottomSheet, {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "@gorhom/bottom-sheet";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import Loading from "../../../components/Loading";
import MyTextInput from "../../../components/MyTextInput";
import SkeletonSample from "../../../components/SkeletonSample";
import MyCard from "../../../components/MyCard";
import MySwitch from "../../../components/MySwitch";
import FooterList from "../../../components/FooterList";
import MyFloatingButton from "../../../components/MyFloatingButton";

import HabitItem from "./HabitItem";

import { useUser } from "../../../context/UserContext";
import {
  connectionHabits,
  financeHabits,
  healthHabits,
  skillsHabits,
  spiritHabits,
} from "../data";
import { renderColor, themes } from "../../../utils/habitThemes";

function RecommendedHabitScreen({ navigation, route }) {
  const { action } = route.params;
  const [loading, setLoading] = useState(true);

  const [theme, setTheme] = useState("");

  const isFocused = useIsFocused();

  const bottomSheetRef = useRef();

  const snapPoints = useMemo(() => ["0%", "80%"], []);

  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current.expand();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current.collapse();
  };

  const handleOpenSuggestHabits = (theme) => {
    setTheme(theme);
    openBottomSheet();
  };

  const suggestHabits = useMemo(() => {
    console.log(theme);
    switch (theme) {
      case themes.health:
        return healthHabits;
      case themes.spirit:
        return spiritHabits;
      case themes.finance:
        return financeHabits;
      case themes.skills:
        return skillsHabits;
      case themes.connection:
        return connectionHabits;
      default:
        return [];
    }
  }, [theme]);

  const renderHabit = ({ item }) => {
    return (
      <HabitItem
        item={item}
        theme={theme}
        action={action}
        // color={renderColor(theme)}
        navigation={navigation}
      />
    );
  };

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
            <MyButton onPress={() => {}}>
              <MyText b6 color={COLOR.white}>
                Top Trending
              </MyText>
              <MyText size5 color={COLOR.white}>
                Get the most recommended items
              </MyText>
            </MyButton>

            <MyButton
              color={COLOR.red}
              style={styles.themeCard}
              onPress={() => handleOpenSuggestHabits(themes.health)}
            >
              <MyText b6 color={COLOR.white}>
                Health & Fitness
              </MyText>
              <MyText size5 color={COLOR.white}>
                The foundation of our well-being
              </MyText>
            </MyButton>

            <MyButton
              color={COLOR.lightBlue}
              style={styles.themeCard}
              onPress={() => handleOpenSuggestHabits(themes.spirit)}
            >
              <MyText b6 color={COLOR.white}>
                Spiritual Self-care
              </MyText>
              <MyText size5 color={COLOR.white}>
                Feel strong from the inside aspect
              </MyText>
            </MyButton>

            <MyButton
              color={COLOR.yellow}
              style={styles.themeCard}
              onPress={() => handleOpenSuggestHabits(themes.finance)}
            >
              <MyText b6 color={COLOR.white}>
                Finance Management
              </MyText>
              <MyText size5 color={COLOR.white}>
                Take control of our budget
              </MyText>
            </MyButton>

            <MyButton
              color={COLOR.purple}
              style={styles.themeCard}
              onPress={() => handleOpenSuggestHabits(themes.skills)}
            >
              <MyText b6 color={COLOR.white}>
                Skills Learning
              </MyText>
              <MyText size5 color={COLOR.white}>
                Explore the world of knowledge
              </MyText>
            </MyButton>

            <MyButton
              color={COLOR.lightGreen}
              style={styles.themeCard}
              onPress={() => handleOpenSuggestHabits(themes.connection)}
            >
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

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              backgroundColor: renderColor(theme),
            }}
          >
            <FlatList
              data={suggestHabits}
              renderItem={renderHabit}
              keyExtractor={(item, index) => index.toString()}
              removeClippedSubviews={true} // Unmount components when outside of window
              initialNumToRender={2} // Reduce initial render amount
              maxToRenderPerBatch={1} // Reduce number in each render batch
              updateCellsBatchingPeriod={1200} // Increase time between renders
              windowSize={7} // Reduce the window size
              ListFooterComponent={() => (
                <FooterList title={`Choose one for your ${theme}`} />
              )}
              showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity onPress={closeBottomSheet}>
              <MyButton long3>
                <MyText color={COLOR.white}>Back</MyText>
              </MyButton>
            </TouchableOpacity>
          </View>
        </BottomSheet>

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
