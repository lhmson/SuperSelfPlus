import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "../styles";
import { AntDesign, Entypo } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import moment from "moment";

import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import Loading from "../../../components/Loading";
import MyTextInput from "../../../components/MyTextInput";
import MyCard from "../../../components/MyCard";
import MySwitch from "../../../components/MySwitch";
import MyFloatingButton from "../../../components/MyFloatingButton";
import ColorPicker from "../ColorPicker";
import DaysPicker from "../DaysPicker";

import * as apiHabit from "../../../api/habit";
import { useUser } from "../../../context/UserContext";
import iconsUrl from "../../../utils/resources/iconsUrl";
import Icon from "../../../constants/icon";
import {
  dateCompare,
  getDateNoTime,
  getDatesBetweenTwoDays,
} from "../../../utils/datetime";

import * as Notifications from "expo-notifications";
import {
  registerForPushNotificationsAsync,
  scheduleNotiListForHabit,
  schedulePushNotification,
} from "../../../utils/notifications";
import { renderColor, themes } from "../../../utils/habitThemes";

const errors = ["You should enter title"];

const AddHabitScreen = ({ navigation, route }) => {
  const suggestItem = route?.params?.suggestItem;
  // const themeColor = route?.params?.themeColor;
  const suggestTheme = route?.params?.suggestTheme;
  const user = useUser();

  // habit properties
  const [title, setTitle] = useState(""); // can bind from browsing habits
  const [description, setDescription] = useState(""); // optional
  // const [color, setColor] = useState(COLOR.white); // pick color: ;
  const [theme, setTheme] = useState(themes.general); // set by color: ;
  const [kind, setKind] = useState("Do"); // Do and Do not, Run
  // const [daysToDo, setDaysToDo] = useState(new Array(7).fill(true)); // everyday, some days, weekend
  const [icon, setIcon] = useState(iconsUrl[0].url);
  const [iconModal, setIconModal] = useState(false);

  const [isSetReminder, setIsSetReminder] = useState(true);
  const [reminder, setReminder] = useState(new Date()); // time picker
  const [isModalReminder, setIsModalReminder] = useState(false);

  const [isSetTarget, setIsSetTarget] = useState(false);
  const [targetNumber, setTargetNumber] = useState(5);
  const [targetUnit, setTargetUnit] = useState("times");
  const [isModalTarget, setIsModalTarget] = useState(false);
  const [isDropdownTargetUnit, setIsDropdownTargetUnit] = useState(false);

  // const [targetUnitItems, setTargetUnitItems] = useState([
  //   { label: "times", value: "time(s)" },
  //   { label: "mins", value: "min(s)" },
  //   { label: "hours", value: "hour(s)" },
  //   { label: "km", value: "km" },
  // ]);

  const targetUnitItems = [
    { label: "times", value: "time(s)" },
    { label: "mins", value: "min(s)" },
    { label: "hours", value: "hour(s)" },
    { label: "km", value: "km" },
  ];

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  //#region Noti
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  ////#endregion

  useEffect(() => {
    if (suggestItem) {
      setTitle(suggestItem?.title);
      setDescription(suggestItem?.description);
      // setColor(themeColor);
      setTheme(suggestTheme);
      setKind(suggestItem?.kind);
    }
  }, [suggestItem]);

  //TODO: set  image for event
  const [isSetEvent, setIsSetEvent] = useState(false);
  const [eventStartDate, setEventStartDate] = useState(null); // date to start habit
  const [isModalStartDate, setIsModalStartDate] = useState(false);
  const [eventEndDate, setEventEndDate] = useState(null); // date to complete habit
  const [isModalEndDate, setIsModalEndDate] = useState(false);

  const toggleIsSetEvent = () => {
    setIsSetEvent((previousState) => !previousState);
    if (eventStartDate) {
      setEventStartDate(null);
      setEventEndDate(null);
    } else {
      setEventStartDate(new Date());
      setEventEndDate(new Date().addDays(7));
    }
  };

  const onChangeStartdate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setIsModalStartDate(false);
    setEventStartDate(currentDate);
  };

  const onChangeEnddate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setIsModalEndDate(false);
    setEventEndDate(currentDate);
  };

  const toggleIsSetTarget = () => {
    setIsSetTarget((previousState) => !previousState);
  };

  const openChangeTargetModal = () => {
    setIsModalTarget(true);
  };

  const handleCloseModalTarget = () => {
    if (!targetNumber) setTargetNumber(1);
    else if (targetNumber > 99) setTargetNumber(99);
    setIsModalTarget(false);
    setIsDropdownTargetUnit(false);
  };

  const handleSetType = (newType) => {
    if (newType !== kind) {
      setKind(newType);
    }
  };

  const toggleIsSetReminder = () => {
    setIsSetReminder((previousState) => !previousState);
    if (reminder) {
      setReminder(null);
    } else {
      setReminder(new Date());
    }
  };

  const onChangeReminder = (event, selectedTime) => {
    const currentDate = selectedTime || new Date();
    setIsModalReminder(false);
    setReminder(currentDate);
  };

  // const renderFrequency = () => {
  //   if (
  //     daysToDo.slice(0, 5).every((item) => item === false) &&
  //     daysToDo[5] &&
  //     daysToDo[6]
  //   ) {
  //     return "Weekend";
  //   } else if (daysToDo.every((item) => item === true)) {
  //     return "Everyday";
  //   } else {
  //     return "Some days";
  //   }
  // };

  const pickIcon = () => {
    setIconModal(true);
  };

  const renderAchievement = (habit) => {
    const prizes = [
      "Award",
      "Medal",
      "Prize",
      "Cup",
      "Badge",
      "Crown",
      "Trophy",
      "King",
      "Star",
    ];
    const titles = ["Best", "Gold", "Top", "Extreme", "Ultimate"];

    const title = titles[Math.floor(Math.random() * titles.length)];

    const prize = prizes[Math.floor(Math.random() * prizes.length)];

    return `${title} ${habit.toUpperCase()} ${prize}`;
  };

  const validateHabitForm = () => {
    if (!title) {
      setError(errors[0]);
      return false;
    }
    return true;
  };

  const handleAddHabit = () => {
    if (!validateHabitForm()) {
      return;
    }

    setError("");

    let target;
    if (isSetTarget) {
      target = {
        targetNumber,
        targetUnit,
      };
    }

    let eventInfo;
    if (isSetEvent) {
      if (dateCompare(eventStartDate, eventEndDate) === 1) {
        alert("Event start date cannot be later than its finish date");
        return;
      }
      //TODO: get img background for event
      eventInfo = {
        dateStart: getDateNoTime(eventStartDate),
        dateEnd: getDateNoTime(eventEndDate),
        listJoiners: [user.state.uid],
        achievement: renderAchievement(title),
      };
    }

    const newHabit = {
      title,
      description,
      // color,
      theme,
      kind,
      // daysToDo,
      icon,
      target,
      eventInfo,
      reminder,
    };

    // alert(JSON.stringify(newHabit));
    setLoading(true);
    apiHabit
      .addHabit(newHabit)
      .then(() => {
        Toast.show({
          type: "success", // success, error, info
          text1: "Successfully add habit 🎉",
          text2: `${title}`,
          visibilityTime: 2500,
          onShow: () => {},
          onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
          onPress: () => {},
        });
        navigation.navigate("Home");
        if (reminder) {
          scheduleNotiListForHabit(
            new Date().addDays(21),
            reminder,
            `Let's do this: ${title}`,
            `Keep doing your best for a better self`,
            { data: "Home" }
          );
        }
      })
      .catch((error) => {
        console.log("Error when adding habit", error);
        alert("Error when adding habit");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../utils/resources/bg/postbg.jpg")}
        style={styles.imageBg}
        imageStyle={{ opacity: 0.5 }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.content}>
          <View
          // behavior="position" keyboardVerticalOffset={10}
          >
            <View style={styles.title}>
              <MyText b5 size4 center>
                Start a habit today
              </MyText>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Suggestion", { action: "Add" });
                }}
              >
                <MyText center b6 color={COLOR.blue}>
                  Browse suggestion
                </MyText>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={pickIcon}
              style={{
                backgroundColor: COLOR.whiteSmoke,
                width: 50,
                height: 50,
                borderRadius: 100,
                alignSelf: "center",
                overflow: "hidden",
              }}
              disabled={kind === "Run"}
            >
              <Image source={{ uri: icon }} style={{ flex: 1 }} />
            </TouchableOpacity>

            <Modal
              onBackButtonPress={() => setIconModal(false)}
              isVisible={iconModal}
              propagateSwipe={true}
            >
              <View>
                <ScrollView horizontal={true}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {iconsUrl.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index.toString()}
                          onPress={() => {
                            console.log("second", item.url);
                            setIcon(item.url);
                          }}
                        >
                          {item.img}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>
                <MyButton onPress={() => setIconModal(false)}>
                  <MyText color={COLOR.white}>Back</MyText>
                </MyButton>
              </View>
            </Modal>

            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <MyButton
                style={{
                  backgroundColor: kind === "Do" ? COLOR.green : COLOR.grey,
                  width: 100,
                }}
                onPress={() => handleSetType("Do")}
              >
                <Entypo name="thumbs-up" size={24} color={COLOR.white} />
              </MyButton>
              <MyButton
                style={{
                  backgroundColor:
                    kind === "Do not" ? COLOR.orange : COLOR.grey,
                  width: 100,
                }}
                onPress={() => handleSetType("Do not")}
              >
                <Entypo name="thumbs-down" size={24} color={COLOR.white} />
              </MyButton>
            </View>

            <MyTextInput
              placeholder="TITLE"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              onChangeText={(title) => setTitle(title)}
              value={title}
              style={{
                borderColor: error === errors[0] ? COLOR.red : COLOR.grey,
              }}
            />

            <MyTextInput
              placeholder="DESCRIPTION"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              onChangeText={(des) => setDescription(des)}
              value={description}
            />

            <View>
              <View style={styles.row}>
                <MyText>Reminder?</MyText>
                <MySwitch
                  onValueChange={toggleIsSetReminder}
                  value={isSetReminder}
                />
              </View>
              {isSetReminder && (
                <View>
                  <MyTextInput
                    placeholder="NO TIME SET"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={false}
                    editable={false}
                    value={moment(reminder).format("hh:mm a")}
                  />
                  <TouchableOpacity
                    style={styles.iconInput}
                    onPress={() => {
                      setIsModalReminder(true);
                    }}
                  >
                    <AntDesign
                      name="clockcircle"
                      size={24}
                      color={COLOR.black}
                    />
                  </TouchableOpacity>
                  {isModalReminder && (
                    <DateTimePicker
                      value={reminder}
                      mode={"time"}
                      is24Hour={true}
                      display="default"
                      onChange={onChangeReminder}
                    />
                  )}
                </View>
              )}
            </View>

            <View style={[styles.row, { marginTop: 8 }]}>
              <MyText>Theme</MyText>
              <MyText>{theme.toUpperCase()}</MyText>
            </View>

            <View
              style={{
                backgroundColor: renderColor(theme),
                borderRadius: 10,
                marginTop: 12,
                padding: 10,
              }}
            >
              <View style={styles.picker}>
                <ColorPicker
                  setTheme={setTheme}
                  // setColor={setColor}
                />
              </View>

              {/* <View style={styles.picker}>
                <DaysPicker frequency={daysToDo} setFrequency={setDaysToDo} />
              </View>
              <View style={styles.row}>
                <MyText size5>Frequency</MyText>
                <MyText size5>{renderFrequency()}</MyText>
              </View> */}
            </View>

            {/* target handle */}
            <View style={{ marginVertical: 12 }}>
              <View style={styles.row}>
                <MyText>Target?</MyText>
                {isSetTarget && (
                  <TouchableOpacity onPress={openChangeTargetModal}>
                    <MyText b5>
                      {targetNumber} {targetUnit}
                    </MyText>
                  </TouchableOpacity>
                )}
                <MySwitch
                  onValueChange={toggleIsSetTarget}
                  value={isSetTarget}
                  disabled={kind === "Run" ? true : false}
                />
              </View>

              <Modal
                onBackButtonPress={handleCloseModalTarget}
                isVisible={isModalTarget}
                propagateSwipe={true}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <MyCard style={{ flexDirection: "column" }}> */}
                  <MyTextInput
                    autoFocus
                    keyboardType="numeric"
                    textAlign={"center"}
                    onChangeText={(number) => {
                      if (number > 99) number = 99;
                      setTargetNumber(number);
                    }}
                    value={targetNumber.toString()}
                    style={{
                      fontSize: 20,
                      width: 200,

                      backgroundColor: COLOR.white,
                    }}
                  />

                  <DropDownPicker
                    open={isDropdownTargetUnit}
                    value={targetUnit}
                    items={
                      kind !== "Run"
                        ? targetUnitItems
                        : targetUnitItems.slice(3)
                    }
                    setOpen={setIsDropdownTargetUnit}
                    setValue={setTargetUnit}
                    // setItems={setTargetUnitItems}
                    dropDownDirection="TOP"
                    containerStyle={{ width: 200 }}
                  />

                  <MyButton long3 onPress={handleCloseModalTarget}>
                    <MyText color={COLOR.white}>Back</MyText>
                  </MyButton>
                  {/* </MyCard> */}
                </View>
              </Modal>
            </View>

            {/* event */}
            <View>
              <View style={styles.row}>
                <MyText>Hold an event?</MyText>
                <MySwitch onValueChange={toggleIsSetEvent} value={isSetEvent} />
              </View>
              {isSetEvent && (
                <>
                  <View style={styles.row}>
                    <MyText b5 size5>
                      Start
                    </MyText>
                    <MyTextInput
                      size5
                      long3
                      placeholder=""
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoFocus={false}
                      editable={false}
                      value={
                        moment(eventStartDate).isSame(moment(), "day")
                          ? "Today"
                          : eventStartDate?.toDateString()
                      }
                    />
                    <TouchableOpacity
                      style={styles.iconInput}
                      onPress={() => {
                        setIsModalStartDate(true);
                      }}
                    >
                      <AntDesign
                        name="calendar"
                        size={24}
                        color={COLOR.black}
                      />
                    </TouchableOpacity>

                    {isModalStartDate && (
                      <DateTimePicker
                        value={eventStartDate}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeStartdate}
                        minimumDate={new Date()}
                      />
                    )}
                  </View>
                  <View style={styles.row}>
                    <MyText b5 size5>
                      End
                    </MyText>
                    <MyTextInput
                      size5
                      long3
                      placeholder=""
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoFocus={false}
                      editable={false}
                      value={
                        moment(eventEndDate).isSame(moment(), "day")
                          ? "Today"
                          : eventEndDate?.toDateString()
                      }
                    />
                    <TouchableOpacity
                      style={styles.iconInput}
                      onPress={() => {
                        setIsModalEndDate(true);
                      }}
                    >
                      <AntDesign
                        name="calendar"
                        size={24}
                        color={COLOR.black}
                      />
                    </TouchableOpacity>

                    {isModalEndDate && (
                      <DateTimePicker
                        value={eventEndDate}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeEnddate}
                        minimumDate={new Date().addDays(1)}
                      />
                    )}
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      {/* action button */}
      <MyFloatingButton
        // active={isActiveFloatingButton}
        position="bottomRight"
        onPress={handleAddHabit}
      >
        {loading ? (
          <Loading size="small" noText />
        ) : (
          <Entypo name="plus" size={24} color={COLOR.white} />
        )}
      </MyFloatingButton>
      <TouchableOpacity
        onPress={() => {
          setKind("Run");
          setIcon(
            "https://www.iconbunny.com/icons/media/catalog/product/3/9/3952.9-running-icon-iconbunny.jpg"
          );
          if (!isSetTarget) {
            toggleIsSetTarget();
          }
          setTargetUnit("km");
        }}
        style={[
          styles.buttonRun,
          {
            backgroundColor: kind === "Run" ? COLOR.yellow : COLOR.grey,
          },
        ]}
        disabled={kind === "Run" ? true : false}
      >
        <Image source={Icon.shoeRanking} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}} style={styles.buttonEvent}>
        <Image
          source={Icon.eventLabel}
          style={{
            width: 50,
            height: 50,
            display: isSetEvent ? "flex" : "none",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddHabitScreen;
