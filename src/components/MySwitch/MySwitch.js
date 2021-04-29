import React from "react";
import { Switch } from "react-native";
import COLOR from "../../constants/colors";

const MySwitch = ({ ...props }) => {
  return (
    <Switch
      trackColor={{ true: COLOR.lightGreen, false: COLOR.lightBlue }}
      thumbColor={props.value ? COLOR.green : COLOR.blue}
      ios_backgroundColor={COLOR.grey}
      style={{
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
      }}
      {...props}
    />
  );
};

export default MySwitch;
