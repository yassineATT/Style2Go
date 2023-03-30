import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import HomeNavigator from "./home.navigator";

export const Navigation = () => {
  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};
