import React, { useContext } from "react";
import { StatusBar, Alert } from "react-native";
import {
  AuthButton,
  AuthTitle,
  AuthTextBlack,
  SecondButton,
  AuthTextWhite,
  ResetPwdCover,
  ResetPwdCard,
} from "../components/account.styles";
import AuthInput from "../components/authinput";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthenticationContext } from "./../../../services/authentification/auth.context";

export const ResetPwdScreen = () => {
  const route = useRoute();
  const { onNewPassword } = useContext(AuthenticationContext);
  const { control, handleSubmit } = useForm({
    defaultValues: { email: route?.params?.email },
  });

  const navigation = useNavigation();

  const resetPress = async (email, code, password) => {
    const response = await onNewPassword(email, code, password);
    if (response) {
      Alert.alert(
        "Mot de passe réinitialisé",
        "Continuer pour vous connecter",
        [
          {
            text: "Continuer",
            onPress: () => navigation.navigate("SignIn"),
          },
        ]
      );
    }
  };
  return (
    <>
      <ResetPwdCover>
        <ResetPwdCard>
          <AuthTitle>Renitialiser</AuthTitle>
          <AuthInput
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            control={control}
            rules={{ required: "Email is required" }}
          />
          <AuthInput
            name="code"
            placeholder="Code de vérification"
            keyboardType="numeric"
            autoCapitalize="none"
            control={control}
            rules={{ required: "Code is required" }}
          />

          <AuthInput
            name="password"
            placeholder="Nouveau mot de passe"
            secureTextEntry
            control={control}
            isPassword={true}
            rules={{
              required: "Veuillez entrez un nouveau mot de passe",
            }}
          />
          <AuthButton
            mode="contained"
            onPress={handleSubmit((data) =>
              resetPress(data.email, data.code, data.password)
            )}
          >
            <AuthTextWhite>Valider</AuthTextWhite>
          </AuthButton>
        </ResetPwdCard>
        <SecondButton onPress={() => navigation.navigate("SignIn")}>
          <AuthTextBlack>Annuler</AuthTextBlack>
        </SecondButton>
        <StatusBar style="auto" />
      </ResetPwdCover>
    </>
  );
};
