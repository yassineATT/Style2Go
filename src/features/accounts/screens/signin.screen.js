import React, { useState } from "react";
import { StatusBar, Alert } from "react-native";
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
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";

export const SignInScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigation = useNavigation();
  const email_regex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const [loading, setLoading] = useState(false);

  const signInPress = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.signIn(data.email, data.password);
      console.log(response);
      navigation.navigate("Home");
    } catch (error) {
      if (error.code === "UserNotFoundException") {
        Alert.alert("", "Utilisateur inconnu");
      } else if (error.code === "NotAuthorizedException") {
        Alert.alert("", "Mot de passe incorrect");
      } else {
        Alert.alert(error.message);
      }
    }
    setLoading(false);
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
          <AuthButton mode="contained" onPress={handleSubmit(signInPress)}>
            <AuthTextWhite>
              {loading ? "Connexion en cours..." : "Se connecter"}
            </AuthTextWhite>
          </AuthButton>
        </SignInCard>
        <SecondButton onPress={() => navigation.navigate("SendCode")}>
          <AuthTextBlack>Mot de passe oublié ?</AuthTextBlack>
        </SecondButton>
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
