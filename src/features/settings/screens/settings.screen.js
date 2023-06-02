import React, { useContext } from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthenticationContext } from "../../../services/authentification/auth.context";
import {
  SignOutButton,
  ImageConstruction,
  Bienvenue,
} from "../components/profile.styles";

export const SettingScreen = () => {
  const { onSignOut, user } = useContext(AuthenticationContext);
  const constructionGif = "../../../../assets/construction.gif";

  return (
    <SafeAreaView>
      <Bienvenue>Bienvenue {user.attributes.name} !</Bienvenue>
      <ImageConstruction
        source={require(constructionGif)}
        mode="contain"
        alt="construction"
      />
      <SignOutButton onPress={() => onSignOut()}>
        <Text>Se déconnecter</Text>
      </SignOutButton>
    </SafeAreaView>
  );
};
