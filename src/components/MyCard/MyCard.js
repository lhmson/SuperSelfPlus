import React from "react";
import styled from "styled-components";
import COLOR from "../../constants/colors";
import { Card, CardItem } from "native-base";

// props: color

const MyCard = ({ ...props }) => {
  return (
    <CustomCard {...props}>
      <CustomCardItem {...props}>{props.children}</CustomCardItem>
    </CustomCard>
  );
};

const CustomCard = styled(Card)`
  margin: 12px 0;
  padding: 10px;
  background-color: ${(props) => props.color ?? COLOR.white};
  border-radius: 10px;
  elevation: 5;
`;

const CustomCardItem = styled(CardItem)`
  background-color: ${(props) => props.color ?? COLOR.white};
`;

export default MyCard;
