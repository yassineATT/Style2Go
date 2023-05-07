import React from "react";
import {
  BoutiqueImage,
  BoutiqueCover,
  BoutiqueTitle,
  BoutiqueCard,
} from "./shop.styles";
import { useNavigation } from "@react-navigation/native";

export const ShopItem = ({ boutique = {} }) => {
  const { name, image } = boutique;

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("ShopScreen", { id: boutique.id, name: boutique.name });
  };

  return (
    <BoutiqueCard onPress={onPress}>
      <BoutiqueImage source={{ uri: image }} />
      <BoutiqueCover>
        <BoutiqueTitle>{name}</BoutiqueTitle>
      </BoutiqueCover>
    </BoutiqueCard>
  );
};
