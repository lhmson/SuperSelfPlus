import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, ScrollView, FlatList } from "react-native";
import styles from "../styles";
import styled from "styled-components";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import { width } from "../../../constants/dimensions";
import moment, { ISO_8601 } from "moment";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import SkeletonSample from "../../../components/SkeletonSample";
import FooterList from "../../../components/FooterList";
import EventCard from "./EventCard";

import { useUser } from "../../../context/UserContext";
import * as apiEvent from "../../../api/event";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { dateCompare } from "../../../utils/datetime";
import MyFloatingButton from "../../../components/MyFloatingButton";

function EventScreen({ navigation }) {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [listEvents, setListEvents] = useState([]);
  const [selectMenu, setSelectMenu] = useState(1);
  const isFocused = useIsFocused();
  const isMountedRef = useIsMountedRef();
  useEffect(() => {
    apiEvent
      .getAllEvents()
      .then((res) => {
        if (isMountedRef.current) {
          // console.log(res.data);
          setListEvents(res.data);
        }
      })
      .catch((error) => {
        alert("Error when getting events", error.message);
        console.log("Error when getting events", error.message);
      })
      .finally(() => setLoading(false));
  }, [isFocused]);

  const renderHabit = ({ item }) => {
    return <EventCard item={item} navigation={navigation} />;
  };

  const filterItems = useMemo(() => {
    switch (selectMenu) {
      case 1:
        return listEvents;
      case 2:
        return listEvents.filter(
          (item) =>
            item.eventInfo.listJoiners.indexOf(user.state.uid) === -1 &&
            dateCompare(item.eventInfo.dateEnd, new Date()) === 1
        );
      case 3:
        return listEvents.filter(
          (item) => item.eventInfo.listJoiners.indexOf(user.state.uid) !== -1
        );
      default:
    }
  }, [selectMenu, listEvents]);

  const HeaderButton = () => {
    const _margin = 20;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "stretch",
          width: width - 32,
          padding: 8,
          zIndex: 1,
        }}
      >
        <MyButton
          long6
          style={{
            backgroundColor: selectMenu === 1 ? COLOR.green : COLOR.whiteSmoke,
            height: 40,
            // borderRadius: 40,
          }}
          onPress={() => {
            setSelectMenu(1);
          }}
        >
          <MyText b6 size5 color={selectMenu === 1 ? COLOR.white : COLOR.black}>
            All
          </MyText>
        </MyButton>
        <View style={{ width: _margin }}></View>
        <MyButton
          long6
          style={{
            backgroundColor: selectMenu === 2 ? COLOR.green : COLOR.whiteSmoke,
            height: 40,
            // borderRadius: 40,
          }}
          onPress={() => {
            setSelectMenu(2);
          }}
        >
          <MyText b6 size5 color={selectMenu === 2 ? COLOR.white : COLOR.black}>
            New
          </MyText>
        </MyButton>
        <View style={{ width: _margin }}></View>
        <MyButton
          long6
          style={{
            backgroundColor: selectMenu === 3 ? COLOR.green : COLOR.whiteSmoke,
            height: 40,
            // borderRadius: 40,
          }}
          onPress={() => {
            setSelectMenu(3);
          }}
        >
          <MyText b6 size5 color={selectMenu === 3 ? COLOR.white : COLOR.black}>
            Joined
          </MyText>
        </MyButton>
      </View>
    );
  };

  // const FloatButton = () => {
  //   const [isActiveFloatingButton, setIsActiveFloatingButton] = useState(false);
  //   return (
  //     <MyButton
  //       onPress={() => {
  //         navigation.navigate("Nearby Me");
  //       }}
  //     >
  //       <MyText>Nearby me</MyText>
  //     </MyButton>
  //   );
  // };
  return (
    <>
      <View style={styles.container}>
        <HeaderButton />
        <View
          style={{
            flex: 1,
            marginTop: 16,
            width: width,
            alignItems: "center",
            justifyContent: "center",
            elevation: 40,
            zIndex: 0,
          }}
        >
          {/* <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        > */}
          <View>
            {loading ? (
              <SkeletonSample />
            ) : (
              <>
                <FlatList
                  style={{ zIndex: 1 }}
                  data={selectMenu === 1 ? listEvents : filterItems}
                  renderItem={renderHabit}
                  keyExtractor={(item, index) => index.toString()}
                  removeClippedSubviews={true} // Unmount components when outside of window
                  initialNumToRender={2} // Reduce initial render amount
                  maxToRenderPerBatch={1} // Reduce number in each render batch
                  updateCellsBatchingPeriod={1200} // Increase time between renders
                  windowSize={7} // Reduce the window size
                  ListFooterComponent={() => (
                    <FooterList title={"Get your dream come true"} />
                  )}
                  showsVerticalScrollIndicator={false}
                />
              </>
            )}
          </View>
        </View>
      </View>
      <MyFloatingButton
        // active={isActiveFloatingButton}
        position="bottomRight"
        onPress={() => navigation.navigate("Nearby Me")}
      >
        <FontAwesome5 name="map-marker-alt" size={24} color={COLOR.white} />
      </MyFloatingButton>
    </>
  );
}

export default EventScreen;
