import React, { useEffect, useState, useContext } from "react";
import { Order, Shop } from "../../../models";
import { DataStore } from "@aws-amplify/datastore";
import { AuthenticationContext } from "../../../services/authentification/auth.context";
import { Text } from "react-native";
import { Container, OrderImage, ColumnView, TextOrder } from "./basket.styles";

export const CurrentOrders = (modalVisible) => {
  const { user } = useContext(AuthenticationContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchCurrentOrders = async () => {
      const fetchedOrders = await DataStore.query(Order, (c) =>
        c.userID.eq(user.attributes.sub)
      );

      const ordersWithShop = await Promise.all(
        fetchedOrders.map(async (order) => {
          const shop = await DataStore.query(Shop, order.shopID);
          return { ...order, shop };
        })
      );

      console.log("fetchedOrders", ordersWithShop);
      setOrders(ordersWithShop);
    };

    const subscription = DataStore.observe(Order).subscribe((msg) => {
      if (msg.opType === "INSERT" || msg.opType === "UPDATE") {
        fetchCurrentOrders();
      }
    });

    fetchCurrentOrders();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, modalVisible]);

  function mapOrderStatus(status) {
    switch (status) {
      case "NEW":
        return "Commande en attente..";
      case "PREPARATION":
        return "En préparation..";
      case "COMMAND_READY":
        return "Commande prête";
      case "ACCEPT":
        return "Acceptée";
      case "RETRIEVE":
        return "Récupérée";
      case "CANCEL":
        return "Annulée";
      default:
        return status;
    }
  }

  return orders.length > 0 ? (
    orders.map((order) => (
      <Container key={order.id}>
        <OrderImage source={{ uri: order.shop.image }} />
        <ColumnView>
          <TextOrder>Boutique : {order.shop?.name}</TextOrder>
          <TextOrder>Status : {mapOrderStatus(order.status)}</TextOrder>
          <TextOrder>Commande n° : {order.id}</TextOrder>
          <TextOrder>Total : {order.total.toFixed(2)}€</TextOrder>
        </ColumnView>
      </Container>
    ))
  ) : (
    <Text>Aucune commande en cours</Text>
  );
};
