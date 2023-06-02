import React, { memo } from "react";
import { View, Image, Pressable } from "react-native";
import {
  ProductsTextContainer,
  ProductText,
  ProductImage,
  ProductItemContainer,
} from "./shop.styles";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export const ProductItem = memo(({ item }) => {
  const navigation = useNavigation();
  const price = item.details && item.details[0]?.price;
  const isAvailable = item.details && item.details.length > 0;

  const onPress = () => {
    if (isAvailable) {
      navigation.navigate("ProductScreen", {
        id: item.id,
        shop: item.shopID,
        name: item.name,
        price: price,
        image: item.image,
        description: item.description,
      });
    } else {
      Alert.alert("", "Ce produit n'est pas actuellement disponible.");
    }
  };

  return (
    <Pressable onPress={onPress}>
      <ProductItemContainer isAvailable={isAvailable}>
        <ProductImage
          source={{ uri: item.image }}
          resizeMode="cover"
        ></ProductImage>
        <ProductsTextContainer>
          <ProductText>{item.name}</ProductText>
          <ProductText>{price} €</ProductText>
        </ProductsTextContainer>
      </ProductItemContainer>
    </Pressable>
  );
});
