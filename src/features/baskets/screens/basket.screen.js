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

export const BasketScreen = () => {
  const { basketList } = useContext(BasketContext);
  const [selectedBaskets, setSelectedBaskets] = useState([]);
  const [total, setTotal] = useState(0);

  console.log("Baskezt List de item", selectedBaskets);

  const handleSelectionChange = (item, isSelected) => {
    setSelectedBaskets((currentItems) => {
      if (isSelected) {
        return [...currentItems, item];
      } else {
        return currentItems.filter((i) => i !== item);
      }
    });
  };

  const renderItem = ({ item }) => (
    <BasketItem item={item} onSelectionChange={handleSelectionChange} />
  );

  useEffect(() => {
    const total = selectedBaskets.reduce((sum, selectedBasket) => {
      console.log("Adding:", selectedBasket.totalPrice);
      return sum + selectedBasket.totalPrice;
    }, 0);
    console.log("Total:", total);
    setTotal(total);
  }, [selectedBaskets]);

  console.log("baket", selectedBaskets);
  return (
    <SafeArea>
      <Header>MON PANIER</Header>
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
        <CommandeButton>
          <TextButton>Commander</TextButton>
        </CommandeButton>
      </BottomContainer>
    </SafeArea>
  );
};
