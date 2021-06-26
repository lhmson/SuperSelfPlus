import React from "react";
import styled from "styled-components";
import COLOR from "../../constants/colors";
import { scaleFontSize } from "../../constants/dimensions";

// props: color size long

const MyButton = ({ ...props }) => {
  return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
};

const TouchableOpacity = styled.TouchableOpacity`
  margin: 12px 0;
  padding: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color ?? COLOR.orange};
  border-radius: 10px;
  elevation: 10;

  ${({ size1, size2, size3, size4, size5 }) => {
    switch (true) {
      case size1:
        return `height:${scaleFontSize(92).toString()}px;`;
      case size2:
        return `height:${scaleFontSize(82).toString()}px;`;
      case size3:
        return `height:${scaleFontSize(72).toString()}px;`;
      case size4:
        return `height:${scaleFontSize(60).toString()}px;`;
      case size5:
        return `height:${scaleFontSize(48).toString()}px;`;
      default:
    }
  }}

  ${({ long1, long2, long3, long4, long5, long6 }) => {
    switch (true) {
      case long1:
        return `width:300px;`;
      case long2:
        return `width:250px;`;
      case long3:
        return `width:200px;`;
      case long4:
        return `width:150px;`;
      case long5:
        return `width:120px;`;
      case long6:
        return `width:90px;`;
      default:
    }
  }}
`;

export default MyButton;
