import React, { useContext } from "react";
import { StatusBar, Alert } from "react-native";
import {
  AccountCover,
  AuthButton,
  AuthTitle,
  AuthTextBlack,
  SecondButton,
  AuthTextWhite,
  SendCodeCard,
} from "../components/account.styles";
import AuthInput from "../components/authinput";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AuthenticationContext } from "./../../../services/authentification/auth.context";

export const SendCodeScreen = () => {
  const { control, handleSubmit } = useForm();
  const { onSendCode } = useContext(AuthenticationContext);
  const navigation = useNavigation();

  const sendCodePress = async (email) => {
    const response = await onSendCode(email);
    if (response) {
      navigation.navigate("ResetPwd", { email: email });
    }
  };

  return (
    <>
      <AccountCover>
        <SendCodeCard>
          <AuthTitle>Renitialiser</AuthTitle>
          <AuthInput
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            autoCompleteType="email"
            textContentType="emailAddress"
            autoCapitalize="none"
            control={control}
            rules={{ required: "Email is required" }}
          />

          <AuthButton
            mode="contained"
            onPress={handleSubmit(async (data) => sendCodePress(data.email))}
          >
            <AuthTextWhite>Envoyer</AuthTextWhite>
          </AuthButton>
        </SendCodeCard>
        <SecondButton onPress={() => navigation.navigate("SignIn")}>
          <AuthTextBlack>Annuler</AuthTextBlack>
        </SecondButton>
        <StatusBar style="auto" />
      </AccountCover>
    </>
  );
};
