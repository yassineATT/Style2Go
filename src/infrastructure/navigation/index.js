import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "./home.navigator";
import { AuthNavigator } from "./auth.navigator";
import { AuthenticationContext } from "../../services/authentification/auth.context";

export const Navigation = () => {
  const { user } = React.useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      {user ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
