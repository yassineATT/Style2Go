import React from "react";
import { StatusBar, Alert } from "react-native";
import {
  AuthButton,
  AuthTitle,
  AuthTextBlack,
  SecondButton,
  AuthTextWhite,
  ResetPwdCover,
  ResetPwdCard,
} from "../components/account.styles";
import AuthInput from "../components/authinput";
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Auth } from "aws-amplify";

export const ResetPwdScreen = () => {
  const route = useRoute();
  const { control, handleSubmit } = useForm({
    defaultValues: { email: route?.params?.email },
  });

  const navigation = useNavigation();

  const newPasswordPress = async (data) => {
    try {
      await Auth.forgotPasswordSubmit(data.email, data.code, data.password);
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
      <ResetPwdCover>
        <ResetPwdCard>
          <AuthTitle>Renitialiser</AuthTitle>
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
          <AuthButton mode="contained" onPress={handleSubmit(newPasswordPress)}>
            <AuthTextWhite>Valider</AuthTextWhite>
          </AuthButton>
        </ResetPwdCard>
        <SecondButton onPress={() => navigation.navigate("SignIn")}>
          <AuthTextBlack>Annuler</AuthTextBlack>
        </SecondButton>
        <StatusBar style="auto" />
      </ResetPwdCover>
    </>
  );
};
