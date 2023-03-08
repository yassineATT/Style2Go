import React, { createContext } from "react";
import { Auth, Hub } from "aws-amplify";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Check if user is logged in

  const onCheckAuth = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    onCheckAuth();
  }, []);

  useEffect(() => {
    Hub.listen("auth", (data) => {
      if (data.payload.event === "signIn" || data.payload.event === "signOut") {
        onCheckAuth();
      }
    });
  }, []);

  // Login

  const onLogin = async (email, password) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await Auth.signIn(email, password);
    } catch (error) {
      if (error.code === "UserNotFoundException") {
        Alert.alert("", "Utilisateur inconnu");
      } else if (error.code === "NotAuthorizedException") {
        Alert.alert("", "Mot de passe incorrect");
      } else {
        Alert.alert(error.message);
      }
    }
    setIsLoading(false);
  };

  // Logout

  const onSignOut = () => {
    Auth.signOut();
  };

  // Sign up
  const onSignUp = async (name, email, password) => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { name },
      });
      return { email };
    } catch (error) {
      if (error.code === "UsernameExistsException") {
        Alert.alert("", "Email déjà utilisé");
      } else {
        Alert.alert(error.message);
      }
    }
  };

  // Confirm email

  const onConfirmEmail = async (email, code) => {
    try {
      await Auth.confirmSignUp(email, code);
      return { email };
    } catch (error) {
      if (error.code === "UserNotFoundException") {
        Alert.alert("", "Utilisateur inconnu");
      } else {
        Alert.alert(error.message);
      }
    }
  };

  // Resend code email

  const onResendEmail = async (email) => {
    try {
      await Auth.resendSignUp(email);
      Alert.alert("", "Code envoyé");
    } catch (error) {
      switch (error.code) {
        case "UserNotFoundException":
          Alert.alert("", "Utilisateur inconnu");
          break;
        case "TooManyFailedAttemptsException":
          Alert.alert("", "Trop de tentatives échouées, veuillez patienter");
          break;
        case "TooManyRequestsException":
          Alert.alert("", "Trop de requêtes, veuillez patienter");
          break;
      }
    }
  };

  // Reset password

  const onNewPassword = async (email, code, password) => {
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      return { email };
    } catch (error) {
      switch (error.code) {
        case "CodeMismatchException":
          Alert.alert("", "Code incorrect");
          break;
        case "ExpiredCodeException":
          Alert.alert("", "Code expiré");
          break;
        case "InvalidPasswordException":
          Alert.alert("", "Mot de passe invalide");
          break;
        case "LimitExceededException":
          Alert.alert("", "Limite dépassée");
          break;
        case "TooManyFailedAttemptsException":
          Alert.alert("", "Trop de tentatives échouées, veuillez patienter");
          break;
        case "AttemptLimitExceededException":
          Alert.alert("", "Limite de tentatives dépassée");
          break;
      }
    }
  };

  // Send code reset password

  const onSendCode = async (email) => {
    try {
      const response = await Auth.forgotPassword(email);
      return { email };
    } catch (error) {
      switch (error.code) {
        case "CodeMismatchException":
          Alert.alert("", "Code incorrect");
          break;
        case "ExpiredCodeException":
          Alert.alert("", "Code expiré");
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
        case "TooManyFailedAttemptsException":
          Alert.alert("", "Trop de tentatives échouées, veuillez patienter");
          break;
      }
    }
  };

  const authContext = {
    onLogin,
    onSignOut,
    onSignUp,
    onSendCode,
    onConfirmEmail,
    onResendEmail,
    onNewPassword,
    onCheckAuth,
    user,
    isLoading,
    error,
  };

  return (
    <AuthenticationContext.Provider value={authContext}>
      {children}
    </AuthenticationContext.Provider>
  );
};
