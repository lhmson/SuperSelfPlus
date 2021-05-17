import React from "react";
import styled from "styled-components";
import COLOR from "../../constants/colors";

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
        return `height:92px;`;
      case size2:
        return `height:82px;`;
      case size3:
        return `height:72px;`;
      case size4:
        return `height:60px;`;
      case size5:
        return `height:48px;`;
      default:
    }
  }}

  ${({ long1, long2, long3, long4, long5 }) => {
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
        return `width:90px;`;
      default:
    }
  }}
`;

export default MyButton;
