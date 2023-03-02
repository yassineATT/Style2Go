import * as React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation/index";

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
        <Navigation />
        <ExpoStatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
