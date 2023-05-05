import styled from "styled-components/native";
import { Button } from "react-native-paper";

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
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const SaveButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.bg.tertiary};
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
