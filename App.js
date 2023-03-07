import * as React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation/index";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";
import { AuthenticationContextProvider } from "./src/services/authentification/auth.context";
import { NavigationContainer } from "@react-navigation/native";

Amplify.configure(config);

export default function App() {
  const [Roboto] = useFonts({
    Roboto_400Regular,
  });

  if (!Roboto) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
        <ExpoStatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
