import React from "react";
import { Pressable } from "react-native";
import { BoutiqueCard, BoutiqueCover, BoutiqueTitle } from "./shop.styles";

export const ShopItem = ({ boutique = {} }) => {
  const {
    name,
    photos = [
      "https://www.sport-guide.com/uploads/_CGSmartImage/img-709521cadd2db4fa6fb804a47783eb57.jpg",
    ],
  } = boutique;

  const onPress = () => {};

  return (
    <Pressable onPress={onPress}>
      <BoutiqueCard>
        <BoutiqueCover key={name} source={{ uri: photos[0] }} />
        <BoutiqueTitle>{name}</BoutiqueTitle>
      </BoutiqueCard>
    </Pressable>
  );
};
