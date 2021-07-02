import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";
import { Entypo } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import moment, { ISO_8601 } from "moment";

import Toast from "react-native-toast-message";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import Loading from "../../../components/Loading";
import MyCard from "../../../components/MyCard";

import { useUser } from "../../../context/UserContext";
import * as apiHabit from "../../../api/habit";
import * as apiEvent from "../../../api/event";
import { width } from "../../../constants/dimensions";
import { dateCompare, getDateNoTime } from "../../../utils/datetime";

function EventCard({ item, navigation }) {
  const user = useUser();

  const [loading, setLoading] = useState(false);

  const [personalHabit, setPersonalHabit] = useState();

  useEffect(() => {
    if (item.eventInfo.listJoiners.indexOf(user.state.uid) !== -1) {
      apiHabit
        .getAHabitOfMe(item._id)
        .then((res) => {
          setPersonalHabit(res.data);
        })
        .catch((error) => {
          console.log("Error when getting personal habit at event card", error);
          alert("Error when getting personal habit at event card");
        });
    }
  }, [item]);

  const handleJoinEvent = (habitId) => {
    setLoading(true);
    apiEvent
      .joinEvent(habitId)
      .then(() => {
        Toast.show({
          type: "success", // success, error, info
          text1: "Successfully join event 🎉",
          text2: `${item.title}`,
          visibilityTime: 2500,
          onShow: () => {},
          onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
          onPress: () => {},
        });
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("Error when joining event", error);
        alert("Error when joining event");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const ImageDemo = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Detail Event", { item: item, personalHabit });
        }}
      >
        <ImageBackground
          source={{
            uri:
              item.imageUrl ??
              "https://i.pinimg.com/564x/98/5c/4b/985c4beecb162508e539f514ac0ff0cf.jpg",
          }}
          style={{
            width: width - 32,
            height: width * 0.5,
            resizeMode: "cover",
            justifyContent: "flex-end",
            flexDirection: "row",
            paddingRight: 20,
          }}
          borderRadius={30}
        >
          {dateCompare(
            getDateNoTime(item.eventInfo.dateEnd),
            getDateNoTime(new Date())
          ) === -1 && (
            <MyButton color={COLOR.blue} style={{ width: 120, height: 30 }}>
              <MyText size6 color={COLOR.white} b6>
                FINISHED
              </MyText>
            </MyButton>
          )}
          {dateCompare(
            getDateNoTime(item.eventInfo.dateStart),
            getDateNoTime(new Date())
          ) === 1 && (
            <MyButton style={{ width: 120, height: 30 }}>
              <MyText size6 color={COLOR.white} b6>
                COMING SOON
              </MyText>
            </MyButton>
          )}
          {item.eventInfo.listJoiners.indexOf(user.state.uid) !== -1 && (
            <MyButton color={COLOR.yellow} style={{ width: 120, height: 30 }}>
              <MyText size6 color={COLOR.white} b6>
                SIGNED UP
              </MyText>
            </MyButton>
          )}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const ViewInfoEvent = () => {
    return (
      <View
        style={{
          padding: 8,
          justifyContent: "flex-start",
          alignSelf: "flex-start",
        }}
      >
        <MyText size4 b5>
          {item.title}
        </MyText>
        {/* {item.description ? (
          <MyText size5 b3>
            {item.description}
          </MyText>
        ) : null} */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <Image
            source={{
              uri: "https://i.pinimg.com/564x/21/69/f4/2169f44bbeb03f495d4f24a9bb2ddb2a.jpg",
            }}
            style={{
              width: 30,
              height: 30,
              resizeMode: "center",
              marginRight: 8,
            }}
          />
          <MyText size5>{`${moment(item.eventInfo.dateStart).format(
            "DD/MM/YY"
          )} - ${moment(item.eventInfo.dateEnd).format("DD/MM/YY")}`}</MyText>

          <Image
            source={{
              uri: "https://i.pinimg.com/564x/29/d9/bd/29d9bd7885eca021a310207d9c4fd850.jpg",
            }}
            style={{
              width: 30,
              height: 30,
              resizeMode: "center",
              marginRight: 8,
              marginLeft: 32,
            }}
          />
          <MyText size5>{item.eventInfo.listJoiners.length}</MyText>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Image
            source={{
              uri: "https://i.pinimg.com/564x/4f/89/61/4f896194e6fdb9acbbc667af58d1d77a.jpg",
            }}
            style={{
              width: 30,
              height: 30,
              resizeMode: "center",
              marginRight: 8,
            }}
          />
          <View style={{ width: width * 0.8 }}>
            <MyText size5>
              {item.eventInfo.achievement ??
                `Best ${item.title.toUpperCase()} prize`}
            </MyText>
          </View>

          <Image
            source={{
              uri: item.icon,
            }}
            style={{
              width: 30,
              height: 30,
              resizeMode: "center",
              marginLeft: 8,
            }}
          />
        </View>
      </View>
    );
  };

  const ButtonFooter = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 8,
          justifyContent: "space-between",
          width: width - 32,
          paddingTop: 0,
          marginTop: -16,
        }}
      >
        <MyButton
          style={{ width: width * 0.3, height: 50 }}
          onPress={() => {
            navigation.navigate("Detail Event", { item: item, personalHabit });
          }}
        >
          <MyText color={COLOR.white} b5>
            Detail
          </MyText>
        </MyButton>
        {item.eventInfo.listJoiners.indexOf(user.state.uid) === -1 ? (
          <MyButton
            style={{ width: width * 0.5, height: 50 }}
            color={COLOR.lightGreen}
            onPress={() => handleJoinEvent(item._id)}
          >
            {loading ? (
              <Loading size="small" noText />
            ) : (
              <MyText color={COLOR.white} b5>
                Join
              </MyText>
            )}
          </MyButton>
        ) : (
          <MyButton
            style={{ width: width * 0.5, height: 50 }}
            color={COLOR.lightGreen}
            onPress={() => {
              navigation.navigate("Habit Stats", { item: personalHabit });
            }}
          >
            <MyText color={COLOR.white} b5>
              Visit progress
            </MyText>
          </MyButton>
        )}
      </View>
    );
  };

  return (
    <MyCard
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: width - 20,
        // borderRadius: 30,
        borderColor: COLOR.green,
        borderSize: 5,
        padding: 0,
      }}
    >
      <ImageDemo />
      <ViewInfoEvent />
      <ButtonFooter />
    </MyCard>
  );
}

export default EventCard;
