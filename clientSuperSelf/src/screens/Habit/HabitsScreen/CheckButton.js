import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "../styles";
import { FontAwesome } from "@expo/vector-icons";
import COLOR from "../../../constants/colors";
import moment from "moment";

import Toast from "react-native-toast-message";
import Modal from "react-native-modal";

import MyText from "../../../components/MyText";
import MyButton from "../../../components/MyButton";
import MyTextInput from "../../../components/MyTextInput";

import * as apiHabit from "../../../api/habit";
import { useUser } from "../../../context/UserContext";
import { dateCompare, getDateNoTime, isToday } from "../../../utils/datetime";

const CheckButton = ({ item, navigation, setIsUpdate }) => {
  const [progress, setProgress] = useState(item.progress ?? 0);

  const [isModalProgress, setIsModalProgress] = useState(false);

  const openChangeProgressModal = () => {
    setIsModalProgress(true);
  };

  const handleCloseModalProgress = () => {
    if (!progress) setProgress(item.progress ?? 0);
    else if (progress > 99) setProgress(99);
    setIsModalProgress(false);
  };

  const handleUpdateProgress = () => {
    if (!isToday(item.date)) {
      alert("You cannot make change to item that is not for today");
      return;
    }

    const updatedHistoryHabit = {
      progress,
      completed:
        progress >= item.personalHabitId.habitId.target?.targetNumber
          ? true
          : false,
    };

    apiHabit.updateMyHistoryHabit(item._id, updatedHistoryHabit).then(() => {
      Toast.show({
        type: "success", // success, error, info
        text1: "Successfully update progress habit 👋",
        text2: `${item.personalHabitId.habitId.title}`,
        visibilityTime: 2500,
        onShow: () => {},
        onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
        onPress: () => {},
      });
      handleCloseModalProgress();
      setIsUpdate(true);
    });
  };

  const setCompleteToday = (isComplete) => {
    if (!isToday(item.date)) {
      alert("You cannot make change to item that is not for today");
      return;
    }
    if (isComplete) {
      setProgress(item.personalHabitId.habitId.target?.targetNumber);
    }
    const updatedHistoryHabit = {
      progress: isComplete
        ? parseInt(item.personalHabitId.habitId.target?.targetNumber ?? 0)
        : parseInt(progress),
      completed: isComplete,
    };

    apiHabit.updateMyHistoryHabit(item._id, updatedHistoryHabit).then(() => {
      Toast.show({
        type: "success", // success, error, info
        text1: "Successfully update progress habit 👋",
        text2: `${item.personalHabitId.habitId.title}`,
        visibilityTime: 2500,
        onShow: () => {},
        onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
        onPress: () => {},
      });
      handleCloseModalProgress();
      setIsUpdate(true);
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={openChangeProgressModal}>
        <FontAwesome
          name={
            item.personalHabitId.habitId.kind === "Run"
              ? "minus-circle"
              : item.personalHabitId.habitId.kind === "Do"
              ? "check-circle"
              : "times-circle"
          }
          size={42}
          color={item.completed ? COLOR.green : COLOR.black} // handle history complete for today and turn green
        />
      </TouchableOpacity>
      <Modal
        onBackButtonPress={handleCloseModalProgress}
        isVisible={isModalProgress}
        propagateSwipe={true}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!item.completed ? (
            <MyButton
              long3
              color={COLOR.green}
              onPress={() => setCompleteToday(true)}
            >
              <MyText color={COLOR.white} b5>
                I've got it done
              </MyText>
            </MyButton>
          ) : (
            <MyButton
              color={COLOR.green}
              onPress={() => setCompleteToday(false)}
            >
              <MyText color={COLOR.white} b5>
                Undo completed
              </MyText>
            </MyButton>
          )}

          <View>
            {item.personalHabitId.habitId.target && (
              <>
                <MyTextInput
                  keyboardType="numeric"
                  textAlign={"center"}
                  onChangeText={(number) => {
                    if (number > 99) number = 99;
                    setProgress(number);
                  }}
                  value={progress?.toString()}
                  editable={!item.completed && isToday(item.date)}
                  style={{
                    fontSize: 20,
                    backgroundColor: COLOR.white,
                  }}
                />

                <View style={{ alignSelf: "center" }}>
                  <MyText color={COLOR.white}>
                    Target: {item.personalHabitId.habitId.target?.targetNumber}{" "}
                    {item.personalHabitId.habitId.target?.targetUnit}
                  </MyText>
                </View>
              </>
            )}

            {item.personalHabitId.habitId.target && !item.completed && (
              <MyButton
                color={COLOR.lightBlue}
                long3
                onPress={handleUpdateProgress}
              >
                <MyText color={COLOR.white}>Save progress</MyText>
              </MyButton>
            )}

            <MyButton long3 onPress={handleCloseModalProgress}>
              <MyText color={COLOR.white}>Back</MyText>
            </MyButton>
          </View>

          {/* </MyCard> */}
        </View>
      </Modal>
    </View>
  );
};

export default CheckButton;
