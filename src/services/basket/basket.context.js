import React, { createContext, useState } from "react";
import { Basket, BasketDetail } from "../../models";
import { DataStore } from "aws-amplify";
import { Alert } from "react-native";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

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

  const basketProvider = {
    basket,
    addToBasket,
    setBasket,
  };

  return (
    <BasketContext.Provider value={basketProvider}>
      {children}
    </BasketContext.Provider>
  );
};
