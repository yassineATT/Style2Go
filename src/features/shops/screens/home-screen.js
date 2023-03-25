import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Searchbar } from "react-native-paper";
import { AuthenticationContext } from "../../../services/authentification/auth.context";
import { ShopItem } from "../components/shops-item";
import {
  SearchContainer,
  RestauContainer,
  SafeArea,
} from "../components/shop.styles";

export const HomeScreen = () => {
  const { onSignOut } = useContext(AuthenticationContext);

  return (
    <SafeArea>
      <SearchContainer>
        <Searchbar />
      </SearchContainer>
      <RestauContainer
        data={[
          { name: "Nike" },
          { name: "Adidas" },
          { name: "Puma" },
          { name: "Reebok" },
        ]}
        renderItem={({ item }) => <ShopItem boutique={item} />}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
