import React, { useContext } from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthenticationContext } from "../../../services/authentification/auth.context";

export const SettingScreen = () => {
  const { onSignOut } = useContext(AuthenticationContext);

  return (
    <SafeAreaView>
      <Text onPress={() => onSignOut()}>Sign Out</Text>
    </SafeAreaView>
  );
};
