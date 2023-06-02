import React, { useContext, useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeArea>
      <SearchContainer>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </SearchContainer>
      <RestauContainer
        data={filteredShops}
        renderItem={({ item }) => <ShopItem boutique={item} />}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
