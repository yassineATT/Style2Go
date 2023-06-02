import React, { useContext } from "react";
import { StatusBar, Alert } from "react-native";
import {
  ConfirmEmailCover,
  ConfirmEmailCard,
  AuthButton,
  AuthTitle,
  AuthTextBlack,
  SecondButton,
  AuthTextWhite,
} from "../components/auth.styles";
import AuthInput from "../components/authinput";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthenticationContext } from "../../../services/authentification/auth.context";

export const ConfirmEmail = () => {
  const route = useRoute();
  const { onConfirmEmail, onResendEmail } = useContext(AuthenticationContext);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { email: route?.params?.email },
  }); // entrer le mail dans le champ email
  const email = watch("email");
  const navigation = useNavigation();

  const confirmPress = async (email, code) => {
    const response = await onConfirmEmail(email, code);
    if (response) {
      Alert.alert("Email confirmé", "Continuer pour vous connecter", [
        {
          text: "Continuer",
          onPress: () => navigation.navigate("SignIn"),
        },
      ]);
    }
  };

  return (
    <>
      <ConfirmEmailCover>
        <ConfirmEmailCard>
          <AuthTitle>Confirmer votre mail</AuthTitle>
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
            control={control}
            rules={{
              required: "Veuillez entrez le code de vérification",
            }}
          />
          <AuthButton
            mode="contained"
            onPress={handleSubmit((data) =>
              confirmPress(data.email, data.code)
            )}
          >
            <AuthTextWhite>Valider</AuthTextWhite>
          </AuthButton>
        </ConfirmEmailCard>
        <AuthButton mode="contained" onPress={() => onResendEmail(email)}>
          <AuthTextBlack>Renvoyer</AuthTextBlack>
        </AuthButton>
        <SecondButton onPress={() => navigation.navigate("SignIn")}>
          <AuthTextBlack>Confirmer plus tard</AuthTextBlack>
        </SecondButton>
        <StatusBar style="auto" />
      </ConfirmEmailCover>
    </>
  );
};
