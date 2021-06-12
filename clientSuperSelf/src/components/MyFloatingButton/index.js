import React from "react";
import { Fab } from "native-base";
import COLOR from "../../constants/colors";

// direction: up down left right
// position: topLeft, topRight, bottomLeft, bottomRight
const MyFloatingButton = ({ ...props }) => {
  return (
    <Fab
      containerStyle={{}}
      style={{ backgroundColor: COLOR.orange }}
      {...props}
    >
      {props.children}
    </Fab>
  );
};

export default MyFloatingButton;
