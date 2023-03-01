import React from "react";
import { StatusBar } from "react-native";
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

export const SendCodeScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSendCode = (data) => {
    console.log(data);
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

          <AuthButton mode="contained" onPress={handleSubmit(handleSendCode)}>
            <AuthTextWhite>Envoyer</AuthTextWhite>
          </AuthButton>
        </SendCodeCard>
        <SecondButton onPress={() => console.log("Alread have account")}>
          <AuthTextBlack>J'ai déjà un compte</AuthTextBlack>
        </SecondButton>
        <StatusBar style="auto" />
      </AccountCover>
    </>
  );
};
