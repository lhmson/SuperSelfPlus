import React, { useState } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import styles from "../styles";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
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

const errors = ["You should enter title"];

const DetailHabitScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const user = useUser();
  const { updateUser } = user;

  // habit properties
  const [title, setTitle] = useState(item.personalHabitId.habitId.title); // can bind from browsing habits
  const [description, setDescription] = useState(
    item.personalHabitId.habitId.description
  ); // optional
  const [color, setColor] = useState(item.personalHabitId.habitId.color); // pick color: ;
  const [kind, setKind] = useState(item.personalHabitId.habitId.kind); // Do and Do not
  // const [daysToDo, setDaysToDo] = useState(new Array(7).fill(true)); // everyday, some days, weekend
  const [icon, setIcon] = useState(item.personalHabitId.habitId.icon);
  const [iconModal, setIconModal] = useState(false);

  const [isSetReminder, setIsSetReminder] = useState(
    item.personalHabitId.reminder ? true : false
  );
  const [reminder, setReminder] = useState(item.personalHabitId.reminder); // time picker
  const [isModalReminder, setIsModalReminder] = useState(false);

  // target
  const [isSetTarget, setIsSetTarget] = useState(
    item.personalHabitId.habitId.target ? true : false
  );
  const [targetNumber, setTargetNumber] = useState(
    item.personalHabitId.habitId.target?.targetNumber ?? 5
  );
  const [targetUnit, setTargetUnit] = useState(
    item.personalHabitId.habitId.target?.targetUnit ?? "times"
  );
  const [isModalTarget, setIsModalTarget] = useState(false);
  const [isDropdownTargetUnit, setIsDropdownTargetUnit] = useState(false);

  const [targetUnitItems, setTargetUnitItems] = useState([
    { label: "times", value: "time(s)" },
    { label: "mins", value: "min(s)" },
    { label: "hours", value: "hour(s)" },
    { label: "km", value: "km" },
  ]);

  const [isActionButton, setIsActionButton] = useState(false);

  const [error, setError] = useState("");

  const [isModalEvent, setIsModalEvent] = useState(false);

  const openEventModal = () => {
    setIsModalEvent(true);
  };

  const handleCloseEventModal = () => {
    setIsModalEvent(false);
  };

  const toggleIsSetReminder = () => {
    // console.log("reminder when toggle", reminder);
    setIsSetReminder((previousState) => !previousState);
    if (reminder) {
      setReminder(null);
    } else {
      setReminder(new Date());
    }
  };

  const onChangeReminder = (event, selectedTime) => {
    const currentDate = selectedTime || new Date();
    // console.log("current", currentDate);
    setIsModalReminder(false);
    setReminder(currentDate);
  };

  const handleSetType = (newType) => {
    if (newType !== kind) {
      setKind(newType);
    }
  };

  // const [isSetDueDate, setIsSetDueDate] = useState(false);
  // const [dueDate, setDueDate] = useState(null); // date to complete habit
  // const [isModalDueDate, setIsModalDueDate] = useState(false);

  // const toggleIsSetDueDate = () => {
  //   setIsSetDueDate((previousState) => !previousState);
  //   if (dueDate) {
  //     setDueDate(null);
  //   } else {
  //     setDueDate(new Date());
  //   }
  // };

  // const onChangeDuedate = (event, selectedDate) => {
  //   const currentDate = selectedDate || new Date();
  //   const today = new Date();
  //   setIsModalDueDate(false);
  //   // setDueDate(currentDate);
  //   setDueDate(currentDate);
  // };

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

  const toggleIsSetTarget = () => {
    if (item.personalHabitId.habitId.eventInfo) {
      alert("You cannot change target of event being hold");
      return;
    }
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

  const validateHabitForm = () => {
    if (!title) {
      setError(errors[0]);
      return false;
    }
    return true;
  };

  const handleEditHabit = () => {
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

    const updatedHabit = {
      title,
      description,
      color,
      kind,
      // daysToDo,
      icon,
      target,
      // eventInfo,
      reminder,
    };

    // alert(JSON.stringify(updatedHabit));
    apiHabit
      .updateMyHabit(item.personalHabitId._id, updatedHabit)
      .then(() => {
        Toast.show({
          type: "success", // success, error, info
          text1: "Successfully update habit 🎉",
          text2: `${title}`,
          visibilityTime: 2500,
          onShow: () => {},
          onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
          onPress: () => {},
        });
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("Error when updating habit", error);
        alert("Error when updating habit");
      });
  };

  const handleStatistics = () => {
    // navigation.navigate("Habit Stats", { item: item });
    navigation.goBack();
  };

  const handleDeleteHabit = () => {
    if (item.userId !== user.state.uid) {
      alert("You are not owner of this personal habit");
      return;
    }

    Alert.alert(
      "Confirm delete",
      `${
        item.personalHabitId.habitId.eventInfo
          ? "This habit is being hold as an event. You cannot delete the habit, you can just withdraw from the event, are you sure?"
          : "Are you sure"
      }`,
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "Yes, I'm sure",
          onPress: () => {
            {
              apiHabit
                .deleteMyHabit(item.personalHabitId._id)
                .then((res) => {
                  Toast.show({
                    type: "success", // success, error, info
                    text1: res.data.message,
                    text2: `${title}`,
                    visibilityTime: 2500,
                    onShow: () => {},
                    onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
                    onPress: () => {},
                  });
                  navigation.navigate("Home");
                })
                .catch((error) => {
                  alert("Error when delete habit");
                  console.log("Error when delete habit", error);
                });
            }
          },
        },
      ],
      { cancelable: false }
    );
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
                Keep up your spirit
              </MyText>
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
                <MyButton
                  title="Hide modal"
                  onPress={() => setIconModal(false)}
                >
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
                disabled={true}
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
                disabled={true}
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

            {/* <View style={{ marginBottom: 5 }}>
              <View style={styles.row}>
                <MyText>Set due date?</MyText>
                <MySwitch
                  onValueChange={toggleIsSetDueDate}
                  value={isSetDueDate}
                />
              </View>
              {isSetDueDate && (
                <View>
                  <MyTextInput
                    placeholder=""
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={false}
                    editable={false}
                    value={
                      moment(dueDate).isSame(moment(), "day")
                        ? "Today"
                        : dueDate.toDateString()
                    }
                  />
                  <TouchableOpacity
                    style={styles.iconInput}
                    onPress={() => {
                      setIsModalDueDate(true);
                    }}
                  >
                    <AntDesign name="calendar" size={24} color={COLOR.black} />
                  </TouchableOpacity>
                  {isModalDueDate && (
                    <DateTimePicker
                      value={dueDate}
                      mode={"date"}
                      is24Hour={true}
                      display="default"
                      onChange={onChangeDuedate}
                      minimumDate={new Date()}
                    />
                  )}
                </View>
              )}
            </View> */}

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
                      // console.log("reminder when show modal", reminder);
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
                      value={new Date(reminder) ?? new Date()}
                      mode={"time"}
                      is24Hour={true}
                      display="default"
                      onChange={onChangeReminder}
                    />
                  )}
                </View>
              )}
            </View>

            <View
              style={{
                backgroundColor: color,
                borderRadius: 10,
                marginTop: 18,
                padding: 10,
              }}
            >
              <View style={styles.picker}>
                <ColorPicker setColor={setColor} />
              </View>

              {/* <View style={styles.picker}>
                <DaysPicker frequency={daysToDo} setFrequency={setDaysToDo} />
              </View>
              <View style={styles.row}>
                <MyText size5>Frequency</MyText>
                <MyText size5>{renderFrequency()}</MyText>
              </View> */}
            </View>
            <View style={{ marginTop: 12 }}>
              <View style={styles.row}>
                <MyText>Target?</MyText>
                {isSetTarget && (
                  <TouchableOpacity
                    disabled={
                      item.personalHabitId.habitId.eventInfo ? true : false
                    }
                    onPress={openChangeTargetModal}
                  >
                    <MyText b5>
                      {targetNumber} {targetUnit}
                    </MyText>
                  </TouchableOpacity>
                )}
                <MySwitch
                  onValueChange={toggleIsSetTarget}
                  value={isSetTarget}
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
                    value={targetNumber?.toString()}
                    style={{
                      fontSize: 20,
                      width: 200,

                      backgroundColor: COLOR.white,
                    }}
                  />

                  <DropDownPicker
                    open={isDropdownTargetUnit}
                    value={targetUnit}
                    items={targetUnitItems}
                    setOpen={setIsDropdownTargetUnit}
                    setValue={setTargetUnit}
                    setItems={setTargetUnitItems}
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
          </View>
        </View>
      </ScrollView>
      {/* action button */}
      <MyFloatingButton
        active={isActionButton}
        onPress={() => {
          setIsActionButton((prev) => !prev);
        }}
        position="bottomRight"
      >
        <Entypo name="edit" size={24} color={COLOR.white} />
        {/* optional */}
        <MyButton
          onPress={handleDeleteHabit}
          style={{ backgroundColor: COLOR.red }}
        >
          <AntDesign name="delete" size={24} color={COLOR.white} />
        </MyButton>
        <MyButton style={{ backgroundColor: COLOR.lightBlue }}>
          <Entypo
            onPress={handleEditHabit}
            name="save"
            size={24}
            color={COLOR.white}
          />
        </MyButton>
      </MyFloatingButton>

      <TouchableOpacity
        style={[
          styles.buttonRun,
          {
            backgroundColor: kind === "Run" ? COLOR.yellow : "transparent",
          },
        ]}
      >
        <Image
          source={Icon.shoeRanking}
          style={{
            width: 24,
            height: 24,
            display: kind === "Run" ? "flex" : "none",
          }}
        />
      </TouchableOpacity>

      <MyFloatingButton
        // active={isActiveFloatingButton}
        position="bottomLeft"
        onPress={handleStatistics}
      >
        <FontAwesome5 name="chart-line" size={24} color={COLOR.white} />
      </MyFloatingButton>

      <TouchableOpacity onPress={openEventModal} style={styles.buttonEvent}>
        <Image
          source={Icon.eventLabel}
          style={{
            width: 50,
            height: 50,
            display: item.personalHabitId.habitId.eventInfo ? "flex" : "none",
          }}
        />
      </TouchableOpacity>
      <Modal
        onBackButtonPress={handleCloseEventModal}
        isVisible={isModalEvent}
        propagateSwipe={true}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MyButton long3 color={COLOR.green} onPress={() => {}}>
            <MyText color={COLOR.white} b5>
              Event detail
            </MyText>
          </MyButton>
          //TODO: date, progress of user during event
          <MyButton long3 onPress={handleCloseEventModal}>
            <MyText color={COLOR.white}>Back</MyText>
          </MyButton>
        </View>
      </Modal>
    </View>
  );
};

export default DetailHabitScreen;
