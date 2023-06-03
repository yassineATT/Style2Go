import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { Image } from "react-native";

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
`;

export const ProfileContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.bg.primaryBg};
`;

export const SaveButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.bg.tertiaryBg};
  width: 300px;
  margin-bottom: 36px;
  align-self: center;
  width: 250px;
  border-radius: 10px;
`;

export const Input = styled.TextInput`
  width: 85%;
  height: 40px;
  margin: 12px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
`;

export const Bienvenue = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 20px;
`;

export const SignOutButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.bg.dangerBg};
  border-radius: 10px;
  width: 250px;
  align-self: center;
`;

export const ImageConstruction = styled(Image)`
  width: 100%;
  height: 70%;
  margin-bottom: 90px;
`;
