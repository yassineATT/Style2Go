import * as React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation/index";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";

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
        <Navigation />
        <ExpoStatusBar style="auto" />
      </ThemeProvider>
    </>
  );
}
