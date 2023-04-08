import React, { memo } from "react";
import { View, Image, Pressable } from "react-native";
import { CarouselText } from "./shop.styles";
import { useNavigation } from "@react-navigation/native";

export const ProductItem = memo(({ item }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("ProductScreen", {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
    });
  };

  return (
    <Pressable onPress={onPress}>
      <View>
        <Image
          source={{ uri: item.image }}
          style={{ width: 250, height: 400, borderRadius: 5 }}
          resizeMode="cover"
        ></Image>
        <CarouselText>{item.name}</CarouselText>
        <CarouselText>{item.price}€</CarouselText>
      </View>
    </Pressable>
  );
});
