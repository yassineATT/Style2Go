import React, { useEffect, useState, useContext } from "react";
import { Order } from "../../../models";
import { DataStore } from "@aws-amplify/datastore";
import { AuthenticationContext } from "../../../services/authentification/auth.context";
import { Text } from "react-native";
import {
  Container,
  ShopImage,
  ColumnView,
  RowView,
  RightContainer,
} from "./basket.styles";

export const CurrentOrders = (modalVisible) => {
  const { user } = useContext(AuthenticationContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchCurrentOrders = async () => {
      const fetchedOrders = await DataStore.query(Order, (c) =>
        c.userID.eq(user.attributes.sub)
      );
      console.log("fetchedOrders", fetchedOrders);
      setOrders(fetchedOrders);
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

  return orders.length > 0 ? (
    orders.map((order) => (
      <Container key={order.id}>
        <ColumnView>
          <RowView>
            <Text>Total: {order.total} €</Text>
          </RowView>
        </ColumnView>
        <RightContainer>
          <Text>Status: {order.status}</Text>
        </RightContainer>
      </Container>
    ))
  ) : (
    <Text>Aucune commande en cours</Text>
  );
};
