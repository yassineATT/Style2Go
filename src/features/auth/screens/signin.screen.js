import React, { useContext, useState } from "react";
import { StatusBar } from "react-native";
import {
  AccountCover,
  SignInCard,
  AuthButton,
  AuthTitle,
  AuthTextBlack,
  SecondButton,
  MdpButton,
  AuthSeparator,
  AuthLine,
} from "../components/auth.styles";
import AuthInput from "../components/authinput";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AuthenticationContext } from "../../../services/authentification/auth.context";

export const SignInScreen = () => {
  const { control, handleSubmit } = useForm();
  const { onLogin, isLoading } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const email_regex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
            autoCapitalize="none"
            control={control}
            rules={{
              required: "Email is required",
              pattern: { value: email_regex, message: "Email invalide" },
            }}
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
          <AuthButton
            mode="contained"
            onPress={handleSubmit((data) => onLogin(data.email, data.password))}
          >
            <AuthTextBlack>
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </AuthTextBlack>
          </AuthButton>
        </SignInCard>
        <MdpButton onPress={() => navigation.navigate("SendCode")}>
          <AuthTextBlack>Mot de passe oublié ?</AuthTextBlack>
        </MdpButton>
        <AuthSeparator>
          <AuthLine />
          <AuthTextBlack style={{ width: 50 }}>OU</AuthTextBlack>
          <AuthLine />
        </AuthSeparator>
        <SecondButton onPress={() => navigation.navigate("SignUp")}>
          <AuthTextBlack>Crée un compte</AuthTextBlack>
        </SecondButton>
        <StatusBar style="auto" />
      </AccountCover>
    </>
  );
};
