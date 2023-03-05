import React from "react";
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
import { Auth } from "aws-amplify";
import { captureRejectionSymbol } from "events";

export const SendCodeScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendCodePress = async (data) => {
    try {
      const response = await Auth.forgotPassword(data.email);
      navigation.navigate("ResetPwd", { email: data.email });
    } catch (error) {
      switch (error.code) {
        case "CodeMismatchException":
          Alert.alert("", "Code incorrect");
          break;
        case "ExpiredCodeException":
          Alert.alert("", "Code expiré");
          break;
        case "InvalidParameterException":
          Alert.alert("", "Paramètre invalide");
          break;
        case "InvalidPasswordException":
          Alert.alert("", "Mot de passe invalide");
          break;
        case "LimitExceededException":
          Alert.alert(
            "",
            "Limite dépassée, veuillez patienter avant de réessayer"
          );
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
          Alert.alert(
            "",
            "Limite de tentatives dépassée, veuillez patienter avant de réessayer"
          );
          break;
      }
    }
  };

  const navigation = useNavigation();

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

          <AuthButton mode="contained" onPress={handleSubmit(sendCodePress)}>
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
