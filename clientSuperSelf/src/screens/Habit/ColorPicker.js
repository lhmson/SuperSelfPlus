import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";
import { backgroundColors } from "./data";
import { habitThemes, renderColor } from "../../utils/habitThemes";

function ColorPicker({ setTheme }) {
  return habitThemes.map((habitTheme) => {
    // return backgroundColors.map((backgroundColor) => {
    return (
      <TouchableOpacity
        key={habitTheme}
        style={[
          styles.pickerItem,
          { backgroundColor: renderColor(habitTheme) },
        ]}
        onPress={() => {
          // setColor(backgroundColor);
          setTheme(habitTheme);
        }}
      />
    );
  });
}

export default ColorPicker;
