import React, { useContext, useState } from "react";
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
  BottomRow,
} from "../components/basket.styles";
import { useNavigation } from "@react-navigation/native";
import { Alert, Button, Text, View } from "react-native";
import Modal from "react-native-modal";
import { CurrentOrders } from "../components/order-components";

export const BasketScreen = () => {
  const navigation = useNavigation();
  const { basketList, selectedBaskets, total, handleSelectionChange } =
    useContext(BasketContext);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSwipeComplete = () => {
    setModalVisible(false);
  };

  const handleOrder = () => {
    if (selectedBaskets.length === 0) {
      Alert.alert("", "Veuillez sélectionner au moins un panier");
      return;
    }
    console.log("BASKET DE COMMANDE", selectedBaskets);
    navigation.navigate("PaymentScreen", { baskets: selectedBaskets });
  };

  const renderItem = ({ item }) => (
    <BasketItem item={item} onSelectionChange={handleSelectionChange} />
  );

  return (
    <SafeArea>
      <Header>mon panier</Header>
      {basketList.length === 0 ? (
        <TextEmpty>Panier vide</TextEmpty>
      ) : (
        <FlatList
          data={basketList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <BottomContainer>
        <Button
          title="Suivre ma commande"
          onPress={() => setModalVisible(true)}
        />
        <Modal
          isVisible={isModalVisible}
          onSwipeComplete={handleSwipeComplete}
          swipeDirection="down"
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={{ justifyContent: "flex-end", margin: 0 }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 18,
              height: "80%",
              borderRadius: 12,
            }}
          >
            <View
              style={{
                alignSelf: "center",
                height: 6,
                width: 40,
                borderRadius: 2,
                backgroundColor: "#ccc",
                marginBottom: 12,
              }}
            />
            <CurrentOrders modalVisible={isModalVisible} />
          </View>
        </Modal>
        <BottomRow>
          <TotalPrice>Total: {total.toFixed(2)}€</TotalPrice>
          <CommandeButton onPress={handleOrder}>
            <TextButton>Commander</TextButton>
          </CommandeButton>
        </BottomRow>
      </BottomContainer>
    </SafeArea>
  );
};
