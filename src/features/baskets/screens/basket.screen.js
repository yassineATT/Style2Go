import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { BasketContext } from "../../../services/basket/basket.context";
import { BasketItem } from "../components/basket-detail";
import { SafeArea } from "../../shops/components/shop.styles";
import {
  Header,
  TotalPrice,
  BottomContainer,
  CommandeButton,
  TextButton,
  TextEmpty,
} from "../components/basket.styles";
import { useNavigation } from "@react-navigation/native";

export const BasketScreen = () => {
  const navigation = useNavigation();
  const { basketList, selectedBaskets, total, handleSelectionChange } =
    useContext(BasketContext);

  const handleOrder = () => {
    navigation.navigate("PaymentScreen", { baskets: selectedBaskets });
  };

  const renderItem = ({ item }) => (
    <BasketItem item={item} onSelectionChange={handleSelectionChange} />
  );

  console.log("baket", selectedBaskets);
  return (
    <SafeArea>
      <Header>mon panier</Header>
      {basketList.lenght === 0 ? (
        <TextEmpty>Panier vide</TextEmpty>
      ) : (
        <FlatList
          data={basketList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <BottomContainer>
        <TotalPrice>Total: {total.toFixed(2)}€</TotalPrice>
        <CommandeButton onPress={handleOrder}>
          <TextButton>Commander</TextButton>
        </CommandeButton>
      </BottomContainer>
    </SafeArea>
  );
};
