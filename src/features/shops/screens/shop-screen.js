import React, { useEffect, useContext } from "react";
import { Text, View, ActivityIndicator, Dimensions } from "react-native";
import {
  SafeArea,
  BackContainer,
  ShopName,
  NewCollectionButton,
  CarouselContainer,
} from "../components/shop.styles";
import { colors } from "../../../infrastructure/theme/colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { ProductItem } from "../components/product-item";
import { ShopContext } from "../../../services/shop/shop.context";

export const ShopScreen = ({ route }) => {
  const { id, name } = route.params;
  const navigation = useNavigation();
  const { products, loading, getProducts } = useContext(ShopContext);
  const renderItem = ({ item }) => <ProductItem item={item} />;

  useEffect(() => {
    getProducts(id);
  }, []);

  if (loading) {
    return (
      <SafeArea>
        <ActivityIndicator size="large" />
      </SafeArea>
    );
  }

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
          data={products}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={250}
          itemHeight={400}
        />
      </CarouselContainer>
    </SafeArea>
  );
};
