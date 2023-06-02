import styled from "styled-components/native";

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin: 16px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Header = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  margin-left: 25%;
`;

export const CardLogo = styled.Image`
  width: 200px;
  height: 200px;
  align-self: center;
  margin-bottom: 16px;
`;

export const ChoiceContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const ChoiceText = styled.Text`
  font-size: 16px;
  margin-right: 8px;
`;

export const ChoiceSelected = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.blue};
  font-weight: bold;
  margin-right: 8px;
`;

export const ChoiceUnselected = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-right: 8px;
  opacity: 0.5;
`;

export const CardForm = styled.View`
  background-color: ${(props) => props.theme.colors.ui.quaternary};
  padding: 16px;
  margin-bottom: 16px;
`;

export const PaymentButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.ui.primary};
  padding: 16px;
  align-items: center;
`;

export const PaymentButtonText = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 16px;
`;
