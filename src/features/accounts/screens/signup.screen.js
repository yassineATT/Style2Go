import React, { useContext } from "react";
import { StatusBar, Alert } from "react-native";
import {
  SignUpCard,
  AuthButton,
  AuthTitle,
  AuthTextBlack,
  SecondButton,
  AuthTextWhite,
  SignUpCover,
} from "./../components/account.styles";
import AuthInput from "./../components/authinput";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AuthenticationContext } from "./../../../services/authentification/auth.context";

const email_regex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const SignUpScreen = () => {
  const { onSignUp } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");

  const signUpPress = async (name, email, password) => {
    const response = await onSignUp(name, email, password);
    if (response) {
      Alert.alert(
        "Inscription réussie",
        "Continuer pour confirmer votre email",
        [
          {
            text: "Continuer",
            onPress: () =>
              navigation.navigate("ConfirmEmail", { email: email }),
          },
        ]
      );
    }
  };

  return (
    <>
      <SignUpCover>
        <SignUpCard>
          <AuthTitle>Crée un compte</AuthTitle>
          <AuthInput
            name="name"
            placeholder="Username"
            keyboardType="default"
            control={control}
            rules={{ required: "Name is required" }}
          />
          <AuthInput
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            control={control}
            rules={{
              required: "Email is required",
              pattern: { value: email_regex, message: "Email invalide" },
            }}
          />
          <AuthInput
            name="password"
            keyboardType="password"
            placeholder="Mot de passe"
            secureTextEntry
            control={control}
            isPassword={true}
            rules={{
              minLength: {
                value: 6,
                message: "Le mot de passe doit contenir au moins 6 caractères",
              },
              required: "Mot de passe requis",
            }}
          />
          <AuthInput
            name="password-repeat"
            placeholder="Répétez le mot de passe"
            keyboardType="password"
            secureTextEntry
            control={control}
            isPassword={true}
            rules={{
              validate: (value) =>
                value === pwd || "Les mots de passe ne correspondent pas",
            }}
          />
          <AuthButton
            mode="contained"
            onPress={handleSubmit(async (data) =>
              signUpPress(data.name, data.email, data.password)
            )}
          >
            {/* handleSubmit vérifie d'abord les champs et les envoie à signUpPress */}
            <AuthTextWhite>S'inscrire</AuthTextWhite>
          </AuthButton>
        </SignUpCard>
        <SecondButton onPress={() => navigation.navigate("SignIn")}>
          <AuthTextBlack>J'ai déjà un compte</AuthTextBlack>
        </SecondButton>
        <StatusBar style="auto" />
      </SignUpCover>
    </>
  );
};
