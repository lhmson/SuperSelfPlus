import React from "react";
import styled from "styled-components";
import COLOR from "../../constants/colors";

const MyText = ({ ...props }) => {
  return <Text {...props}>{props.children}</Text>;
};

const Text = styled.Text`
  color: ${(props) => props.color ?? COLOR.black};
  ${({ size1, size2, size3, size4, size5 }) => {
    switch (true) {
      case size1:
        return `font-size:42px;`;
      case size2:
        return `font-size:32px;`;
      case size3:
        return `font-size:28px;`;
      case size4:
        return `font-size:24px;`;
      case size5:
        return `font-size:15px;`;
      default:
        return `font-size:20px;`;
    }
  }}
  ${({ b1, b1i, b2, b2i, b3, b3i, b4, b4i, b5, b5i, b6, b6i, b7, b7i }) => {
    switch (true) {
      case b1:
        return `font-family: Nunito_200ExtraLight;`;
      case b1i:
        return `font-family: Nunito_200ExtraLight_Italic;`;
      case b2:
        return `font-family: Nunito_300Light;`;
      case b2i:
        return `font-family: Nunito_300Light_Italic;`;
      case b3:
        return `font-family: Nunito_400Regular;`;
      case b3i:
        return `font-family: Nunito_400Regular_Italic;`;
      case b4:
        return `font-family: Nunito_600SemiBold;`;
      case b4i:
        return `font-family: Nunito_600SemiBold_Italic;`;
      case b5:
        return `font-family: Nunito_700Bold;`;
      case b5i:
        return `font-family: Nunito_700Bold_Italic;`;
      case b6:
        return `font-family: Nunito_800ExtraBold;`;
      case b6i:
        return `font-family: Nunito_800ExtraBold_Italic;`;
      case b7:
        return `font-family: Nunito_900Black;`;
      case b7i:
        return `font-family: Nunito_900Black_Italic;`;
      default:
        return `font-family: Nunito_400Regular;`;
    }
  }}
  ${({ center, right }) => {
    switch (true) {
      case center:
        return `text-align:center;`;
      case right:
        return `text-align:right;`;
      default:
        return `text-align:left;`;
    }
  }}
`;

export default MyText;
