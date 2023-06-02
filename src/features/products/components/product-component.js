import React, { memo } from "react";
import { View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ProductTitle } from "./product.styles";

export const ProductComponent = memo(({ item }) => {
  const navigation = useNavigation();
  const price = item.details && item.details[0]?.price;

  const onPress = () => {
    navigation.navigate("ProductScreen", {
      id: item.id,
      shop: item.shopID,
      name: item.name,
      price: price,
      image: item.image,
      description: item.description,
    });
  };

  return (
    <Pressable onPress={onPress}>
      <View>
        <Image
          source={{ uri: item.image }}
          style={{ width: 300, height: 470, borderRadius: 26 }}
          resizeMode="cover"
        ></Image>
        <ProductTitle>{item.name}</ProductTitle>
      </View>
    </Pressable>
  );
});
