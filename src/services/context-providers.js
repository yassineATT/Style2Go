import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../infrastructure/theme";
import { AuthenticationContextProvider } from "./authentification/auth.context";
import { ShopProvider } from "./shop/shop.context";
import { ProfileProvider } from "./saveProfile/profile.context";
import { ProductProvider } from "./product/product.context";

export const ContextProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AuthenticationContextProvider>
      <ProfileProvider>
        <ShopProvider>
          <ProductProvider>{children}</ProductProvider>
        </ShopProvider>
      </ProfileProvider>
    </AuthenticationContextProvider>
  </ThemeProvider>
);
