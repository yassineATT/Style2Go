import React, { useContext } from "react";
import { Searchbar } from "react-native-paper";
import { ShopItem } from "../components/shops-item";
import {
  SearchContainer,
  RestauContainer,
  SafeArea,
} from "../components/shop.styles";
import { ShopContext } from "../../../services/shop/shop.context";

export const HomeScreen = () => {
  const { shops } = useContext(ShopContext);

  return (
    <SafeArea>
      <SearchContainer>
        <Searchbar />
      </SearchContainer>
      <RestauContainer
        data={shops}
        renderItem={({ item }) => <ShopItem boutique={item} />}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
