import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, Button } from "react-native";
import { BasketContext } from "../../../services/basket/basket.context";
import {
  Basket,
  Shop,
  BasketDetail,
  ProductDetail,
  Product,
} from "../../../models";
import { AuthenticationContext } from "../../../services/authentification/auth.context";
import { DataStore } from "aws-amplify";
import { BasketItem } from "../components/basket-detail";
import { useFocusEffect } from "@react-navigation/native";

export const BasketScreen = () => {
  const { user } = useContext(AuthenticationContext);
  const [basketList, setBasketList] = useState([]);
  const [basketDetails, setBasketDetails] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const fetchShop = async (shopID) => {
    return await DataStore.query(Shop, shopID);
  };

  const fetchProduct = async (productID) => {
    return await DataStore.query(Product, productID);
  };

  const fetchBasketDetails = async (basketID) => {
    return await DataStore.query(BasketDetail, (bd) =>
      bd.basketID.eq(basketID)
    );
  };

  const fetchProductDetail = async (productDetailID) => {
    const productDetail = await DataStore.query(ProductDetail, productDetailID);
    if (!productDetail) {
      console.error(`No ProductDetail found with ID ${productDetailID}`);
      return null;
    }

    const product = await fetchProduct(productDetail.productID);

    return {
      ...productDetail,
      Product: product,
    };
  };

  const calculateTotalPrice = (basketDetails) => {
    return basketDetails.reduce(
      (total, bd) =>
        bd.productDetail ? total + bd.quantity * bd.productDetail.price : total,
      0
    );
  };
  const fetchBasketData = async (userID) => {
    try {
      const baskets = await DataStore.query(Basket, (b) => b.userID.eq(userID));
      const basketsWithShopData = await Promise.all(
        baskets.map(async (basket) => {
          const shop = await fetchShop(basket.shopID);
          const basketDetails = await fetchBasketDetails(basket.id);
          console.log("basketDetails", basketDetails);

          const basketDetailsWithProductData = await Promise.all(
            basketDetails.map(async (bd) => {
              const productDetail = await fetchProductDetail(
                bd.basketDetailProductDetailId
              );
              return {
                ...bd,
                productDetail: productDetail,
              };
            })
          );

          const totalPrice = calculateTotalPrice(basketDetailsWithProductData);

          return {
            ...basket,
            Shop: shop,
            BasketDetails: basketDetailsWithProductData,
            totalPrice,
          };
        })
      );

      setBasketList(basketsWithShopData);
    } catch (error) {
      console.error("Error fetching basket data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBasketData(user.attributes.sub);
    }
  }, []);

  const renderItem = ({ item }) => <BasketItem item={item} />;

  console.log("basketList", basketList);
  return (
    <View>
      <FlatList
        data={basketList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
