import React, { useEffect, useContext } from "react";
import { Text, View, ActivityIndicator, Dimensions } from "react-native";
import {
  SafeArea,
  BackContainer,
  ShopName,
  NewCollectionButton,
  NewCollectionButtonText,
  ProductsContainer,
} from "../components/shop.styles";
import { colors } from "../../../infrastructure/theme/colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { ProductItem } from "../components/product-item";
import { ShopContext } from "../../../services/shop/shop.context";
import { ProductContext } from "../../../services/product/product.context";
import { FlatList } from "react-native-gesture-handler";

export const ShopScreen = ({ route }) => {
  const { id, name } = route.params;
  const navigation = useNavigation();
  const { loading } = useContext(ShopContext);
  const { getProducts, products } = useContext(ProductContext);

  const renderItem = ({ item }) => <ProductItem item={item} />;

  useEffect(() => {
    console.log(id);
    const req = getProducts(id);
    console.log("boutique", req);
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

        <NewCollectionButton>
          <NewCollectionButtonText>New Collection</NewCollectionButtonText>
        </NewCollectionButton>
      </View>
      <ProductsContainer>
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductItem item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </ProductsContainer>
    </SafeArea>
  );
};
