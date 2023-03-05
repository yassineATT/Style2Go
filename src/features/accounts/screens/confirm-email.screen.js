import React from "react";
import { StatusBar, Alert } from "react-native";
import {
  ConfirmEmailCover,
  ConfirmEmailCard,
  AuthButton,
  AuthTitle,
  AuthTextBlack,
  SecondButton,
  AuthTextWhite,
} from "../components/account.styles";
import AuthInput from "../components/authinput";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Auth } from "aws-amplify";

export const ConfirmEmail = () => {
  const route = useRoute();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { email: route?.params?.email },
  });

  const email = watch("email");

  const navigation = useNavigation();

  const confirmEmailPress = async (data) => {
    try {
      await Auth.confirmSignUp(data.email, data.code);
      navigation.navigate("SignIn");
    } catch (error) {
      if (error.code === "UserNotFoundException") {
        Alert.alert("", "Utilisateur inconnu");
      } else {
        Alert.alert(error.message);
      }
    }
  };

  const resendConfirmPress = async () => {
    try {
      await Auth.resendSignUp(email);
      Alert.alert("", "Code envoyé");
    } catch (error) {
      switch (error.code) {
        case "InvalidParameterException":
          Alert.alert("", "Paramètre invalide");
          break;
        case "LimitExceededException":
          Alert.alert("", "Limite dépassée");
          break;
        case "NotAuthorizedException":
          Alert.alert("", "Non autorisé");
          break;
        case "TooManyFailedAttemptsException":
          Alert.alert("", "Trop de tentatives échouées, veuillez patienter");
          break;
        case "TooManyRequestsException":
          Alert.alert("", "Trop de requêtes");
          break;
        case "AttemptLimitExceededException":
          Alert.alert("", "Limite de tentatives dépassée");
          break;
      }
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
            control={control}
            rules={{
              required: "Veuillez entrez le code de vérification",
            }}
          />
          <AuthButton
            mode="contained"
            onPress={handleSubmit(confirmEmailPress)}
          >
            <AuthTextWhite>Valider</AuthTextWhite>
          </AuthButton>
          <SecondButton mode="contained" onPress={resendConfirmPress}>
            <AuthTextWhite>Renvoyer</AuthTextWhite>
          </SecondButton>
        </ConfirmEmailCard>
        <SecondButton onPress={() => navigation.navigate("SignIn")}>
          <AuthTextBlack>Confirmer plus tard</AuthTextBlack>
        </SecondButton>
        <StatusBar style="auto" />
      </ConfirmEmailCover>
    </>
  );
};
