import styled from "styled-components/native";
import { Button, Card, Text } from "react-native-paper";
import { FlatList, StatusBar, SafeAreaView } from "react-native";

export const BoutiqueCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-bottom: 16px;
`;

export const BoutiqueCover = styled(Card.Cover)`
  padding: 8px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  height: 160px;
`;

export const BoutiqueTitle = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  text-align: left;
  font-size: 18px;
  padding: 0 8px 8px 8px;
`;

export const SearchContainer = styled.View`
  padding: 16px;
`;

export const RestauContainer = styled(FlatList)`
  padding: 16px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const SafeArea = styled(SafeAreaView)`
  ${StatusBar.currentHeight && `marginTop: ${StatusBar.currentHeight}px`};
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
