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
  const [selectedBaskets, setSelectedBaskets] = useState([]);
  const [total, setTotal] = useState(0);

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
        productdetailID: selectedProduct.id,
      });
      await DataStore.save(newBasketDetail);
      setBasketUpdated((prev) => !prev);

      Alert.alert(
        "Article ajouté au panier",
        "Voulez-vous passer à l'achat ?",
        [
          {
            text: "Continuer mes achats",
            style: "cancel",
          },
          {
            text: "Aller au panier",
            onPress: () =>
              navigation.navigate("HomeScreen", { screen: "Cart" }),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Impossible d'ajouter l'article au panier, contacter le support"
      );
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
      console.log("BasketsUser:", baskets);
      const basketsWithShopData = await Promise.all(
        baskets.map(async (basket) => {
          const shop = await fetchShop(basket.shopID);
          const basketDetails = await fetchBasketDetails(basket.id);

          const basketDetailsWithProductData = await Promise.all(
            basketDetails.map(async (bd) => {
              const productDetail = await fetchProductDetail(
                bd.productdetailID
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

      console.log("Baskets with shop data:", basketsWithShopData);
    } catch (error) {
      console.error("Error fetching basket data:", error);
    }
  };

  const deleteBasket = async (basketID) => {
    try {
      const basketDetails = await DataStore.query(BasketDetail, (bd) =>
        bd.basketID.eq(basketID)
      );

      const deleteDetails = basketDetails.map(async (bd) => {
        const detailExists = await DataStore.query(BasketDetail, bd.id);
        if (detailExists) {
          return DataStore.delete(BasketDetail, bd.id);
        }
      });

      await Promise.all(deleteDetails);

      const basketExists = await DataStore.query(Basket, basketID);
      if (basketExists) {
        await DataStore.delete(Basket, basketID);
      }

      await DataStore.start();
      setTotal(0);

      return fetchBasketData(user.attributes.sub);
    } catch (error) {
      console.error("Failed to delete basket: ", error);
    }
  };

  const handleSelectionChange = (item, isSelected) => {
    setSelectedBaskets((currentItems) => {
      if (isSelected) {
        return [...currentItems, item];
      } else {
        return currentItems.filter((i) => i !== item);
      }
    });
  };

  useEffect(() => {
    if (selectedBaskets.length === 0) {
      setTotal(0);
      return;
    }
    const total = selectedBaskets.reduce((sum, selectedBasket) => {
      return sum + selectedBasket.totalPrice;
    }, 0);
    setTotal(total);
  }, [selectedBaskets, basketList]);

  useEffect(() => {
    if (user) {
      fetchBasketData(user.attributes.sub);
    }
  }, [basketUpdated, user]);

  const basketProvider = {
    basket,
    addToBasket,
    setBasket,
    fetchBasketData,
    deleteBasket,
    basketList,
    user,
    selectedBaskets,
    handleSelectionChange,
    total,
    setTotal,
  };

  return (
    <BasketContext.Provider value={basketProvider}>
      {children}
    </BasketContext.Provider>
  );
};
