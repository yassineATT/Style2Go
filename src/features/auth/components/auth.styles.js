import styled from "styled-components/native";
import { Button, Card, Text } from "react-native-paper";

//Déclaration des styles pour les composants de la page de connexion

// Style général

export const AuthTitle = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-weight: 800;
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: 30px;
  text-align: center;
  padding: 16px;
`;

export const AuthButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.bg.tertiary};
  width: 300px;
  margin-top: 36px;
  align-self: center;
  width: 250px;
  border-radius: 10px;
`;

export const SecondButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.bg.none};
  width: 300px;
  margin-top: 34px;
  margin-bottom: 24px;
  align-self: center;
  width: 250px;
  border-radius: 10px;
`;

const textStyles = {
  fontFamily: (props) => props.theme.fonts.body,
  fontWeight: "800",
  fontSize: "16px",
  textAlign: "center",
};

export const AuthTextWhite = styled(Text)`
  color: ${(props) => props.theme.colors.ui.secondary};
  ${textStyles};
`;

export const AuthTextBlack = styled(Text)`
  color: black;
  ${textStyles};
`;

export const AccountCover = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.bg.primary}};
`;

// SignIn Styles

export const SignInCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  width: 320px;
  height: 350px;
  border-radius: 40px;
`;

export const AuthSeparator = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0px 0px;
`;

export const AuthLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${(props) => props.theme.colors.bg.tertiary};
`;

// SignUp Styles

export const SignUpCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.ui.principal};
  width: 320px;
  height: 490px;
  margin-top: 15%;
  border-radius: 40px;
`;

export const SignUpCover = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.primary}};
`;

// SendCode Styles

export const SendCodeCard = styled.View`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  width: 320px;
  height: 260px;
  border-radius: 40px;
`;

// ConfirmEmail Styles

export const ConfirmEmailCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  width: 330px;
  margin-top: 30%;
  height: 320px;
  border-radius: 40px;
`;

export const ConfirmEmailCover = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.primary}};
`;

// ResetPwd Styles

export const ResetPwdCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  width: 320px;
  margin-top: 40%;
  height: 400px;
  border-radius: 40px;
`;

export const ResetPwdCover = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.primary}};
`;
