import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import MyCard from "../../../components/MyCard/index";
import MyButton from "../../../components/MyButton/index";
import MyText from "../../../components/MyText/index";
import MyTextInput from "../../../components/MyTextInput/index";
import MySwitch from "../../../components/MySwitch/index";
import Swiper from "react-native-swiper";
import COLOR from "../../../constants/colors";
import ICON from "../../../constants/icon";
import { useUser } from "../../../context/UserContext";
import {
  getListRunHabitInProgress,
  getListEventInProgress,
} from "../../../api/run";
import iconsUrl from "../../../utils/resources/iconsUrl";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

function ModalSetupPlan({
  setStatus,
  setPlanMinutes,
  setPlanDistance,
  setTimeStart,
  setPlanNoti,
  setIsOpenModalSetup,
  isOpenModalSetup,
  setPlanEvent,
  setPlanHabitRun,
}) {
  const user = useUser();
  const [listHabits, setListHabits] = useState([]);
  let _time = "15",
    _distance = "1000";
  useEffect(() => {
    getListRunHabitInProgress(user.state.uid)
      .then((res) => {
        setListHabits(res.data);
      })
      .catch((error) => {
        console.log("Error when getting list run habits", error);
      });
  }, []);
  let chooseEvent = "",
    chooseHabit = "";
  const cancelSetup = () => {
    setStatus("Not Run");
    setIsOpenModalSetup(false);
  };

  const submitPlan = () => {
    setPlanMinutes(_time);
    setPlanDistance(_distance);
    setTimeStart(new Date());
    setStatus("Run");
    setIsOpenModalSetup(false);
    setPlanEvent(chooseEvent);
    setPlanHabitRun(chooseHabit);
  };

  const ViewChooseHabit = () => {
    const MainModal = () => {
      const [selectHabit, setSelectHabit] = useState("");
      const ItemHabit = (nameHabit, urlIcon, key) => {
        return (
          <TouchableOpacity
            key={key}
            onPress={() => {
              if (nameHabit === selectHabit) {
                setSelectHabit();
                chooseHabit = "";
              } else {
                setSelectHabit(nameHabit);
                chooseHabit = nameHabit;
              }
            }}
          >
            <MyCard
              style={{
                backgroundColor: nameHabit === selectHabit ? COLOR.green : "",
                width: WIDTH - 100,
              }}
            >
              <Image
                source={{
                  uri: urlIcon ?? "https://ibb.co/c33jW9G",
                }}
                style={{ width: 30, height: 30, marginRight: 8 }}
              ></Image>
              <MyText size6 b4>
                {nameHabit}
              </MyText>
            </MyCard>
          </TouchableOpacity>
        );
      };
      const ScrollHabits = () => {
        return (
          <View
            style={{
              width: "98%",
              height: 300,
              borderRadius: 20,
              padding: 4,
            }}
          >
            <ScrollView style={{ padding: 8 }}>
              {listHabits?.map((habit, index) =>
                ItemHabit(habit.title, habit.icon, index)
              )}
            </ScrollView>
          </View>
        );
      };
      return <ScrollHabits></ScrollHabits>;
    };
    return (
      <MyCard style={{ flexDirection: "column", height: "100%" }}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../../utils/resources/superself-icon.png")}
            style={{
              width: 80,
              height: 80,
              resizeMode: "center",
            }}
          />
          <MyText size6 b3i>
            Choose your habit to checking today!
          </MyText>
          <MainModal></MainModal>
        </View>
      </MyCard>
    );
  };

  const ViewSetupTimeAndDistance = () => {
    const TitleTimer = () => {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            alignSelf: "flex-start",
          }}
        >
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/65/ab/66/65ab660f0fd4b6509fd93f846b1693f8.gif",
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
          />
          <MyText>Timer (minutes)</MyText>
        </View>
      );
    };
    const TitileDistance = () => {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            alignSelf: "flex-start",
          }}
        >
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/53/7d/3d/537d3df4406aa1fdf49f47fb1eb99461.gif",
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
          />
          <MyText>Distance (meters)</MyText>
        </View>
      );
    };
    const MainSetup = () => {
      const [noti, setNoti] = useState(true);
      return (
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TitleTimer></TitleTimer>
          <MyTextInput
            placeholder="15"
            keyboardType="numeric"
            size4
            long1
            onChangeText={(m) => {
              _time = Number(m);
            }}
          ></MyTextInput>
          <TitileDistance></TitileDistance>
          <MyTextInput
            placeholder="1000"
            keyboardType="numeric"
            size4
            long1
            onChangeText={(m) => {
              _distance = Number(m);
            }}
          ></MyTextInput>
          <View style={{ width: "100%", flexDirection: "row" }}>
            <MySwitch
              onValueChange={() => {
                setNoti(!noti);
              }}
              value={noti}
            ></MySwitch>
            <View style={{ width: 16 }}></View>
            <MyText>Allow notifications</MyText>
          </View>
        </View>
      );
    };
    const ButtonFooter = () => {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            width: "100%",
          }}
        >
          <MyButton color={COLOR.orange} onPress={cancelSetup}>
            <MyText color={COLOR.white}>Cancel</MyText>
          </MyButton>
          <View style={{ width: WIDTH / 7 }}></View>
          <MyButton color={COLOR.green} onPress={submitPlan}>
            <MyText color={COLOR.white}>Setup</MyText>
          </MyButton>
        </View>
      );
    };

    return (
      <MyCard style={{ flexDirection: "column", height: "100%" }}>
        <MainSetup></MainSetup>
        <ButtonFooter></ButtonFooter>
      </MyCard>
    );
  };

  const SwiperSetup = () => {
    const Dot = () => {
      return (
        <View
          style={{
            backgroundColor: COLOR.grey,
            width: 16,
            height: 16,
            borderRadius: 15,
            margin: 8,
          }}
        />
      );
    };

    const ActiveDot = () => {
      return (
        <View
          style={{
            backgroundColor: COLOR.green,
            width: 16,
            height: 16,
            borderRadius: 15,
            margin: 8,
          }}
        />
      );
    };

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
      >
        <Swiper
          showsPagination={true}
          width={WIDTH - 32}
          height={500}
          loop={false}
          dot={<Dot></Dot>}
          activeDot={<ActiveDot></ActiveDot>}
          style={{ borderRadius: 30 }}
        >
          {listHabits?.length === 0 ? null : (
            <ViewChooseHabit></ViewChooseHabit>
          )}
          <ViewSetupTimeAndDistance></ViewSetupTimeAndDistance>
        </Swiper>
      </View>
    );
  };
  return (
    <View style={{ zIndex: 100 }}>
      <Modal isVisible={isOpenModalSetup}>
        <SwiperSetup></SwiperSetup>
      </Modal>
    </View>
  );
}

export default ModalSetupPlan;
