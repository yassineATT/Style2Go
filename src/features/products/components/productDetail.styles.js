import styled from "styled-components/native";

export const ColorButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const StyledColorButton = styled.TouchableOpacity`
  width: 30px;
  height:  ${({ selected }) => (selected ? "20px" : "30px")};
  margin: 4px
  border-radius: 15px;
  background-color: ${({ color }) => color};
  border-width: 2px
  border-color: ${({ color }) => (color === "black" ? "white" : "black")};
  opacity: ${({ available }) => (available ? 1 : 0.3)};
`;
