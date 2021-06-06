import React, { useContext, useState } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";
import { AntDesign, Entypo } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import moment from "moment";

import DateTimePicker from "@react-native-community/datetimepicker";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import Loading from "../../../components/Loading";
import MyTextInput from "../../../components/MyTextInput";
import MyCard from "../../../components/MyCard";
import MySwitch from "../../../components/MySwitch";
import ColorPicker from "./ColorPicker";
import DaysPicker from "./DaysPicker";

import { useUser } from "../../../context/UserContext";

import { backgroundColors } from "../data";

function AddHabitScreen({ navigation }) {
  const user = useUser();
  const { updateUser } = user;

  // habit properties
  const [title, setTitle] = useState(""); // can bind from browsing habits
  const [description, setDescription] = useState(""); // optional
  const [color, setColor] = useState(COLOR.white); // pick color: ;
  const [type, setType] = useState("Do"); // Do and Do not
  const [frequency, setFrequency] = useState(new Array(7).fill(true)); // everyday, specific days, weekdays, weekend
  const [reminder, setReminder] = useState(new Date()); // time picker
  const [isModalReminder, setIsModalReminder] = useState(false);
  const [isDailyNoti, setIsDailyNoti] = useState(false);
  const [dailyNotiTime, setDailyNotiTime] = useState(new Date());
  const [isSetDueDate, setIsDueDate] = useState(false);
  const [dueDate, setDueDate] = useState(new Date()); // date to complete habit
  const [isModalDueDate, setIsModalDueDate] = useState(false);

  const toggleSwitch = () => {
    setIsDueDate((previousState) => !previousState);
  };

  const handleSetType = (newType) => {
    if (newType !== type) {
      setType(newType);
    }
  };

  const onChangeDuedate = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    const today = new Date();
    setIsModalDueDate(false);
    // setDueDate(currentDate);
    setDueDate(currentDate);
  };

  const onChangeReminder = (event, selectedTime) => {
    const currentDate = selectedTime || new Date();
    setIsModalReminder(false);
    setReminder(currentDate);
  };

  const renderFrequency = () => {
    if (
      frequency.slice(0, 5).every((item) => item === false) &&
      frequency[5] &&
      frequency[6]
    ) {
      return "Weekend";
    } else if (frequency.every((item) => item === true)) {
      return "Everyday";
    } else {
      return "Some days";
    }
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
                Start one habit today
              </MyText>
              <TouchableOpacity onPress={() => {}}>
                <MyText center b6 color={COLOR.blue}>
                  Browse some
                </MyText>
              </TouchableOpacity>
            </View>

            <MyCard style={{ justifyContent: "space-around" }}>
              <MyButton
                style={{
                  backgroundColor: type === "Do" ? COLOR.green : COLOR.grey,
                  width: 100,
                }}
                onPress={() => handleSetType("Do")}
              >
                <Entypo name="thumbs-up" size={24} color={COLOR.white} />
                <MyText>Do</MyText>
              </MyButton>
              <MyButton
                style={{
                  backgroundColor:
                    type === "Do not" ? COLOR.orange : COLOR.grey,
                  width: 100,
                }}
                onPress={() => handleSetType("Do not")}
              >
                <Entypo name="thumbs-down" size={24} color={COLOR.white} />
                <MyText>Do not</MyText>
              </MyButton>
            </MyCard>

            <MyTextInput
              placeholder="TITLE"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              onChangeText={(title) => setTitle(title)}
              value={title}
            />

            <MyTextInput
              placeholder="DESCRIPTION"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              onChangeText={(des) => setDescription(des)}
              value={description}
            />

            <View style={styles.row}>
              <MyText>Set due date?</MyText>
              <MySwitch onValueChange={toggleSwitch} value={isSetDueDate} />
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

            <MyText size5>Reminder</MyText>
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
                <AntDesign name="clockcircle" size={24} color={COLOR.black} />
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

              <View style={styles.picker}>
                <DaysPicker frequency={frequency} setFrequency={setFrequency} />
              </View>
              <View style={styles.row}>
                <MyText size5>Frequency</MyText>
                <MyText size5>{renderFrequency()}</MyText>
              </View>
            </View>
          </View>

          {/* action button */}
        </View>
      </ScrollView>
    </View>
  );
}

export default AddHabitScreen;
