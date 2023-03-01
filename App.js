import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";
import { ThemeProvider } from "styled-components";
import { SignInScreen } from "./src/features/accounts/screens/signin.screen";
import { SignUpScreen } from "./src/features/accounts/screens/signup.screen";
import { theme } from "./src/infrastructure/theme";
import * as React from "react";

export default function App() {
  const [InterLoaded] = useFonts({
    Inter_500Medium,
  });

  if (!InterLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <SignUpScreen />
        <ExpoStatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
