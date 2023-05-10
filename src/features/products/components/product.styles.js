import styled from "styled-components/native";

export const ColorButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const StyledColorButton = styled.TouchableOpacity`
  width: 30px;
  height: ${({ selected }) => (selected ? "20px" : "30px")};
  margin-left: 4px;
  border-radius: 15px;
  background-color: ${({ color }) => color};
  border-width: 2px;
  border-color: ${({ color, theme }) =>
    color === "black" ? theme.colors.text.inverse : theme.colors.ui.primary};
  opacity: ${({ available }) => (available ? 1 : 0.3)};
  disabled: ${({ available }) => (available ? "none" : "true")};
`;

export const AddToBasketButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.selectedColor && props.selectedSize
      ? props.theme.colors.ui.primary
      : props.theme.colors.ui.disabled};
  padding: 16px;
  border-radius: 5px;
  align-items: center;
`;
export const AddToBasketButtonText = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
`;

export const SizeText = styled.Text`
  padding: 16px;
  color: ${(props) => props.theme.colors.text.secondary};
`;

export const PriceText = styled.Text`
  padding: 16px;
  color: ${(props) => props.theme.colors.text.secondary};
`;

export const ModalBackground = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
