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
  AuthSeparator,
  AuthLine,
} from "../components/account.styles";
import AuthInput from "../components/authinput";
import { useForm } from "react-hook-form";

export const SignInScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignIn = (data) => {
    console.log(data);
  };

  return (
    <>
      <AccountCover>
        <SignInCard>
          <AuthTitle>Connexion</AuthTitle>
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

          <AuthInput
            name="password"
            placeholder="Password"
            secureTextEntry
            control={control}
            isPassword={true}
            rules={{
              required: "Password is required",
            }}
          />
          <AuthButton mode="contained" onPress={handleSubmit(handleSignIn)}>
            <AuthTextWhite>Se Connecter</AuthTextWhite>
          </AuthButton>
        </SignInCard>
        <SecondButton onPress={() => console.log("MDP oublié")}>
          <AuthTextBlack>Mot de passe oublié ?</AuthTextBlack>
        </SecondButton>
        <AuthSeparator>
          <AuthLine />
          <AuthTextBlack style={{ width: 50 }}>OU</AuthTextBlack>
          <AuthLine />
        </AuthSeparator>
        <SecondButton onPress={() => console.log("Crée un compte")}>
          <AuthTextBlack>Crée un compte</AuthTextBlack>
        </SecondButton>
        <StatusBar style="auto" />
      </AccountCover>
    </>
  );
};
