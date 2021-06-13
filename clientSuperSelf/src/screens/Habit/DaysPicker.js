import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";
import COLOR from "../../constants/colors";

import MyText from "../../components/MyText";

import { days } from "./data";

function DaysPicker({ frequency, setFrequency }) {
  return days.map((day, i) => {
    // const [isPick, setIsPick] = useState(true);
    return (
      <TouchableOpacity
        key={day}
        style={[
          styles.pickerItem,
          { backgroundColor: frequency[i] ? COLOR.green : COLOR.white },
        ]}
        onPress={() => {
          //   setIsPick((prev) => !prev)
          setFrequency((prev) =>
            prev.map((item, pos) => (pos === i ? !item : item))
          );
        }}
      >
        <MyText size6>{day.charAt(0)}</MyText>
      </TouchableOpacity>
    );
  });
}

export default DaysPicker;
