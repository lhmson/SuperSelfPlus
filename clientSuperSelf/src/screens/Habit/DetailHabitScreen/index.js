import React, { useContext, useState } from "react";
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

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import Loading from "../../../components/Loading";
import MyTextInput from "../../../components/MyTextInput";
import MyCard from "../../../components/MyCard";
import MySwitch from "../../../components/MySwitch";
import MyFloatingButton from "../../../components/MyFloatingButton";
import ColorPicker from "./ColorPicker";
import DaysPicker from "./DaysPicker";

import * as apiHabit from "../../../api/habit";
import { useUser } from "../../../context/UserContext";
import iconsUrl from "../../../utils/resources/iconsUrl";

const errors = ["You should enter title"];

const DetailHabitScreen = ({ navigation }) => {
  const user = useUser();
  const { updateUser } = user;

  // habit properties
  const [title, setTitle] = useState(""); // can bind from browsing habits
  const [description, setDescription] = useState(""); // optional
  const [color, setColor] = useState(COLOR.white); // pick color: ;
  const [kind, setKind] = useState("Do"); // Do and Do not
  // const [daysToDo, setDaysToDo] = useState(new Array(7).fill(true)); // everyday, some days, weekend
  const [icon, setIcon] = useState(iconsUrl[0].url);
  const [iconModal, setIconModal] = useState(false);

  const [isSetReminder, setIsSetReminder] = useState(true);
  const [reminder, setReminder] = useState(new Date()); // time picker
  const [isModalReminder, setIsModalReminder] = useState(false);

  const [error, setError] = useState("");

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

  const toggleIsSetReminder = () => {
    setIsSetReminder((previousState) => !previousState);
    if (reminder) {
      setReminder(null);
    } else {
      setReminder(new Date());
    }
  };

  const handleSetType = (newType) => {
    if (newType !== kind) {
      setKind(newType);
    }
  };

  // const onChangeDuedate = (event, selectedDate) => {
  //   const currentDate = selectedDate || new Date();
  //   const today = new Date();
  //   setIsModalDueDate(false);
  //   // setDueDate(currentDate);
  //   setDueDate(currentDate);
  // };

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

    const newHabit = {
      title,
      description,
      color,
      kind,
      // daysToDo,
      icon,
      // target,
      // eventInfo,
      reminder,
    };

    // alert(JSON.stringify(newHabit));
    apiHabit
      .addHabit(newHabit)
      .then(() => {
        Toast.show({
          type: "success", // success, error, info
          text1: "Successfully add habit 👋",
          text2: `${title}`,
          visibilityTime: 2500,
          onShow: () => {},
          onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
          onPress: () => {},
        });
        navigation.navigate("Habits");
      })
      .catch((error) => {
        console.log("Error when adding habit", error);
        alert("Error when adding habit");
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
              <TouchableOpacity onPress={() => {}}>
                <MyText center b6 color={COLOR.blue}>
                  Browse some
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
                  <MyText>Back</MyText>
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
                <MyText>Set reminder?</MyText>
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
          </View>
        </View>
      </ScrollView>
      {/* action button */}
      <MyFloatingButton
        // active={isActiveFloatingButton}
        position="topRight"
        onPress={handleAddHabit}
      >
        <Entypo name="plus" size={24} color={COLOR.white} />
      </MyFloatingButton>
    </View>
  );
};

export default DetailHabitScreen;
