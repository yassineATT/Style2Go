import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Button } from "react-native";

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

export const BasketItem = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Text>{item.Shop.name}</Text>
      <Text>Prix total: {item.totalPrice.toFixed(2)}€</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Détail</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <BasketItemDetails basketDetails={item.BasketDetails} />
            <Button title="Fermer" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
