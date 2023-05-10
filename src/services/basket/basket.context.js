import React, { createContext, useState, useContext, useEffect } from "react";
import {
  Basket,
  BasketDetail,
  Product,
  Shop,
  ProductDetail,
} from "../../models";
import { DataStore } from "aws-amplify";
import { Alert } from "react-native";
import { AuthenticationContext } from "../authentification/auth.context";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);
  const [basketList, setBasketList] = useState([]);
  const [basketUpdated, setBasketUpdated] = useState(false);
  const { user } = useContext(AuthenticationContext);

  const addToBasket = async (selectedProduct, shop, user, navigation) => {
    try {
      const userBaskets = await DataStore.query(Basket, (b) =>
        b.userID.eq(user.attributes.sub)
      );
      const existingBasket = userBaskets.filter((b) => b.shopID === shop);
      let basket;
      if (existingBasket.length === 0) {
        basket = new Basket({
          userID: user.attributes.sub,
          shopID: shop,
        });
        await DataStore.save(basket);
      } else {
        basket = existingBasket[0];
      }
      const newBasketDetail = new BasketDetail({
        quantity: 1,
        basketID: basket.id,
        basketDetailProductDetailId: selectedProduct.id,
      });
      await DataStore.save(newBasketDetail);
      setBasketUpdated((prev) => !prev);

      Alert.alert(
        "Article ajouté au panier",
        "Voulez-vous passer à l'achat ?",
        [
          {
            text: "Continuer mes achats",
            onPress: () => console.log("Continue Shopping Pressed"),
            style: "cancel",
          },
          {
            text: "Aller au panier",
            onPress: () =>
              navigation.navigate("HomeScreen", { screen: "Cart" }), // Mettez ici le nom de votre écran Panier
          },
        ]
      );
    } catch (error) {
      console.error("Error adding item to basket:", error);
    }
  };

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
  }, [basketUpdated]);

  const basketProvider = {
    basket,
    addToBasket,
    setBasket,
    fetchBasketData,
    basketList,
    user,
  };

  return (
    <BasketContext.Provider value={basketProvider}>
      {children}
    </BasketContext.Provider>
  );
};
