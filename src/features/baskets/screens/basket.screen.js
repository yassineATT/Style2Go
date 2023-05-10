import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, Button } from "react-native";
import { BasketContext } from "../../../services/basket/basket.context";
import { BasketItem } from "../components/basket-detail";
import { AuthenticationContext } from "../../../services/authentification/auth.context";

export const BasketScreen = () => {
  const { basket, basketList, fetchBasketData, user } =
    useContext(BasketContext);

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
