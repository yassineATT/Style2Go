import React, { useState, useContext } from "react";
import { View, Text, Modal, Button } from "react-native";
import { IconButton, Checkbox } from "react-native-paper";
import {
  Container,
  ShopImage,
  ColumnView,
  RowView,
  ModalContainer,
  ModalContent,
  DetailButton,
  CommandeButton,
  TextButton,
  RightContainer,
} from "./basket.styles";
import { BasketContext } from "../../../services/basket/basket.context";

const BasketItemDetails = ({ basketDetails }) => {
  return (
    <View>
      {basketDetails.map((item) => (
        <View key={item.id}>
          <Text>Product Name: {item.productDetail.Product.name}</Text>
          <Text>Color: {item.productDetail.color}</Text>
          <Text>Size: {item.productDetail.size}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Price: {item.productDetail.price}</Text>
        </View>
      ))}
    </View>
  );
};

export const BasketItem = ({ item, onSelectionChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const { deleteBasket } = useContext(BasketContext);

  const handleSelectionChange = (newSelection) => {
    setSelection(newSelection);
    onSelectionChange(item, newSelection);
  };

  const handleDeleteBasket = async () => {
    await deleteBasket(item.id);
    handleSelectionChange(false);
  };

  return (
    <Container>
      <ShopImage source={{ uri: item.Shop.image }} />
      <ColumnView>
        <RowView>
          <DetailButton title="Detail" onPress={() => setModalVisible(true)}>
            <TextButton>Détail</TextButton>
          </DetailButton>
          <TextButton>Total : {item.totalPrice.toFixed(2)}€</TextButton>
        </RowView>
        <CommandeButton>
          <TextButton>Commander</TextButton>
        </CommandeButton>
      </ColumnView>
      <RightContainer>
        <Checkbox
          status={isSelected ? "checked" : "unchecked"}
          onPress={() => handleSelectionChange(!isSelected)}
        />
        <IconButton icon="delete" onPress={handleDeleteBasket} />
      </RightContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalContainer>
          <ModalContent>
            <BasketItemDetails basketDetails={item.BasketDetails} />
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
};
