import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./tab.navigator";
import { ShopScreen } from "../../features/shops/screens/shop-screen";
import { ProductScreen } from "../../features/products/screens/product-screen";
import { BasketScreen } from "../../features/baskets/screens/basket.screen";
import { PaymentScreen } from "../../features/payment/screens/payment.screen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={TabNavigator} />
      <Stack.Screen name="ShopScreen" component={ShopScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="BasketScreen" component={BasketScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
    </Stack.Navigator>
  );
}
