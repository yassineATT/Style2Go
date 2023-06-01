import styled from "styled-components/native";
import { Image, View } from "react-native";

export const Header = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin: 20px;
  text-align: center;
  text-transform: uppercase;
`;

export const DetailButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.ui.none};
  border: 1px solid ${(props) => props.theme.colors.bg.tertary};
  height: 30px;
  width: 90px;
  margin: 5px 20px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const CommandeButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.ui.none};
  border: 1px solid ${(props) => props.theme.colors.bg.tertary};
  height: 40px;
  width: 150px;
  margin: 5px 20px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  color: ${(props) => props.theme.colors.text.secondary};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 12px;
  text-align: center;
  padding: 2px;
`;

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  margin-top: 10px;
`;

export const ShopImage = styled(Image)`
  width: 130px;
  height: 130px;
  border-radius: 5px;
`;

export const ColumnView = styled(View)`
  flex-direction: column;
  align-items: center;
  width: 200px;
`;

export const RowView = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const ModalContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

export const ModalContent = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  elevation: 5;
`;

export const RightContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const BottomRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
export const BottomContainer = styled.View`
  margin: 12px;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
`;
export const TotalPrice = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

export const TextEmpty = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  color: black
  font-size: 16px;
  font-weight: bold;
  display: flex;
  margin: auto;
  text-transform: uppercase;
`;

export const PriceText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text.secondary};
  text-align: right;
`;

export const BasketItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.ui.secondary};
`;

export const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const QuantityText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const ProductTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const ProductDetails = styled.View`
  flex: 1;
  padding-left: 10px;
`;
