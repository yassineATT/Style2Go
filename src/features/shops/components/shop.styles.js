import styled from "styled-components/native";
import { Card, Text } from "react-native-paper";
import {
  FlatList,
  StatusBar,
  SafeAreaView,
  Image,
  View,
  Pressable,
} from "react-native";

export const BoutiqueCard = styled(Pressable)`
  width: 100%;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 2px solid #eeeeee;
  background-color: #c2c2c2;
  margin-bottom: 16px;
`;

export const BoutiqueCover = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const BoutiqueTitle = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  text-align: left;
  font-size: 18px;
  padding: 8px;
`;

export const BoutiqueImage = styled(Image)`
  width: 340px
  height: 180px;
  border-radius: 5px;
  margin: 8px 8px 0 8px;
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

export const BackContainer = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 9;
`;

export const ShopName = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 16px;
`;

export const NewCollectionButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.brand.primary};
  padding: 16px;
  border-radius: 5px;
  margin: 10px;
  margin-top: 60px;
`;

export const CarouselContainer = styled.View`
  padding: 10px;
`;

export const CarouselText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 18px;
  text-align: center;
  margin-top: 8px;
`;
