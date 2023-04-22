import React from "react";
import { StyledColorButton } from "./productDetail.styles";

export const ColorButton = ({ color, available, selected, onPress }) => {
  return (
    <StyledColorButton
      color={color}
      available={available}
      selected={selected}
      onPress={onPress}
    />
  );
};
