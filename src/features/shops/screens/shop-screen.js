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
import { Image } from "react-native";
import { DataStore } from "aws-amplify";
import { Shop, Product } from "../../../models";
import { ProductItem } from "../components/product-item";

export const ShopScreen = ({ route }) => {
  const { id } = route.params;

  const [shop, setShop] = useState(null);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    DataStore.query(Shop, id).then(setShop);

    DataStore.query(Product).then((products) => {
      const filteredProducts = products.filter((p) => p.shopID === id);
      setProduct(filteredProducts);
    });
  }, []);

  if (!shop) {
    return <ActivityIndicator size="large" />;
  }

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
        <ShopName>{shop.name}</ShopName>

        <NewCollectionButton
          style={{
            backgroundColor: colors.brand.primary,
            padding: 10,
            borderRadius: 5,
            margin: 10,
          }}
        >
          <Text style={{ color: colors.text.primary }}>New Collection</Text>
        </NewCollectionButton>
      </View>
      <CarouselContainer>
        <Carousel
          data={product}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={250}
          itemHeight={400}
        />
      </CarouselContainer>
    </SafeArea>
  );
};
