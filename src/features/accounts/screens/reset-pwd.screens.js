import React from "react";
import { StatusBar } from "react-native";
import {
  AccountCover,
  SignInCard,
  AuthButton,
  AuthTitle,
  AuthTextBlack,
  SecondButton,
  AuthTextWhite,
} from "../components/account.styles";
import AuthInput from "../components/authinput";
import { useForm } from "react-hook-form";

export const ResetPwdScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleNewPass = (data) => {
    console.log(data);
  };

  return (
    <>
      <AccountCover>
        <SignInCard>
          <AuthTitle>Renitialiser</AuthTitle>
          <AuthInput
            name="code"
            placeholder="Code de vérification"
            keyboardType="default"
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
          <AuthButton mode="contained" onPress={handleSubmit(handleNewPass)}>
            <AuthTextWhite>Valider</AuthTextWhite>
          </AuthButton>
        </SignInCard>
        <SecondButton onPress={() => console.log("Alread have account")}>
          <AuthTextBlack>J'ai déjà un compte</AuthTextBlack>
        </SecondButton>
        <StatusBar style="auto" />
      </AccountCover>
    </>
  );
};
