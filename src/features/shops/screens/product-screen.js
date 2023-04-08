import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import {
  SafeArea,
  BackContainer,
  ShopName,
  NewCollectionButton,
  CarouselContainer,
  CarouselText,
} from "../components/shop.styles";
import { colors } from "../../../infrastructure/theme/colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { DataStore } from "aws-amplify";
import { Product } from "../../../models";
import { ProductItem } from "../components/product-item";

export const ProductScreen = ({ route }) => {
  const { name, price, image, description } = route.params;

  const renderItem = ({ item }) => <ProductItem item={item} />;

  const navigation = useNavigation();
  return (
    <SafeArea>
      <View>
        <BackContainer>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={30}
          />
        </BackContainer>
        <ShopName>{name}</ShopName>
        <CarouselContainer>
          <Carousel
            data={[{ name, price, image, description }]}
            renderItem={renderItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={250}
            itemHeight={400}
          />
        </CarouselContainer>
      </View>
    </SafeArea>
  );
};
