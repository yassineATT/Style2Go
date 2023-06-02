import React, { useState, useContext } from "react";
import {
  Container,
  Header,
  CardLogo,
  ChoiceContainer,
  ChoiceText,
  ChoiceSelected,
  ChoiceUnselected,
  CardForm,
  PaymentButton,
  PaymentButtonText,
} from "../components/payment.styles";
import { TouchableOpacity, Text } from "react-native";
import { OrderContext } from "../../../services/order/order.context";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const PaymentScreen = () => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { createOrder } = useContext(OrderContext);

  const route = useRoute();
  const selectedBaskets = route.params?.baskets || [];

  const handlePaymentPress = () => {
    console.log("OrderLaunch", selectedBaskets);
    createOrder(selectedBaskets);
  };

  return (
    <Container>
      <Header>Paiement</Header>
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-outline"
        size={30}
      />
      <CardLogo
        source={{
          uri: "https://www.iconarchive.com/download/i90679/icons8/windows-8/Finance-Bank-Cards.512.png",
        }}
      />
      <ChoiceContainer>
        <ChoiceText>Choix de Paiement:</ChoiceText>
        <TouchableOpacity onPress={() => setPaymentMethod("card")}>
          {paymentMethod === "card" ? (
            <ChoiceSelected>Carte Bancaire</ChoiceSelected>
          ) : (
            <ChoiceUnselected>Carte Bancaire</ChoiceUnselected>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPaymentMethod("stripe")}>
          {paymentMethod === "stripe" ? (
            <ChoiceSelected>Stripe</ChoiceSelected>
          ) : (
            <ChoiceUnselected>Stripe</ChoiceUnselected>
          )}
        </TouchableOpacity>
      </ChoiceContainer>
      {paymentMethod === "card" && (
        <CardForm>
          <Text>Formulaire de carte bancaire</Text>
        </CardForm>
      )}
      <PaymentButton onPress={handlePaymentPress}>
        <PaymentButtonText>Payer</PaymentButtonText>
      </PaymentButton>
    </Container>
  );
};
