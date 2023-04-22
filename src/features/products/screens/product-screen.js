import React, { useContext, useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import {
  SafeArea,
  BackContainer,
  ShopName,
  CarouselContainer,
} from "../../shops/components/shop.styles";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { ProductItem } from "../../shops/components/product-item";
import { ShopContext } from "../../../services/shop/shop.context";
import { ColorButton } from "../components/color-button";
import { ColorButtonContainer } from "../components/productDetail.styles";

export const ProductScreen = ({ route }) => {
  const { id, name, price, image, description } = route.params;
  const {
    getProductsDetails,
    productsDetails,
    loading,
    selectedColor,
    handleColorChange,
    getUniqueColors,
  } = useContext(ShopContext);
  const renderItem = ({ item }) => <ProductItem item={item} />;

  useEffect(() => {
    getProductsDetails(id);
    console.log(productsDetails);
  }, []);

  const uniqueColors = getUniqueColors(productsDetails);

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
            itemHeight={450}
          />
        </CarouselContainer>
        <ColorButtonContainer>
          {uniqueColors.map((color) => {
            const productDetail = productsDetails.find(
              (detail) => detail.color === color
            );
            return (
              <ColorButton
                key={productDetail.id}
                color={productDetail.color}
                available={productDetail.quantity > 0}
                selected={productDetail.color === selectedColor}
                onPress={() => handleColorChange(productDetail.color)}
              />
            );
          })}
        </ColorButtonContainer>
      </View>
    </SafeArea>
  );
};
