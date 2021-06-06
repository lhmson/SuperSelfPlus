import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styles from "../styles";
import COLOR from "../../../constants/colors";

import { backgroundColors } from "../data";

function ColorPicker({ setColor }) {
  return backgroundColors.map((backgroundColor) => {
    return (
      <TouchableOpacity
        key={backgroundColor}
        style={[styles.pickerItem, { backgroundColor }]}
        onPress={() => {
          setColor(backgroundColor);
        }}
      />
    );
  });
}

export default ColorPicker;
