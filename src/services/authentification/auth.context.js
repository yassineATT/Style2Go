import React, { createContext, useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import { Alert } from "react-native";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const showErrorAlert = (errorMessage) => {
    Alert.alert("", errorMessage);
  };

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
      console.log("la reponse", response);
    } catch (error) {
      const errorMessages = {
        UserNotFoundException: "Utilisateur inconnu",
        NotAuthorizedException: "Mot de passe incorrect",
        TooManyFailedAttemptsException: "Trop de tentatives échouées",
        InvalidPasswordException: "Mot de passe invalide",
        LimitExceededException: "Limite dépassée",
        UserNotConfirmedException:
          "Utilisateur non confirmé, veuillez vérifier vos mails",
      };
      showErrorAlert(
        errorMessages[error.code] ? errorMessages[error.code] : error.message
      );
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
      showErrorAlert(error.message, "Email déjà utilisé");
    }
  };

  // Confirm email

  const onConfirmEmail = async (email, code) => {
    try {
      await Auth.confirmSignUp(email, code);
      return { email };
    } catch (error) {
      showErrorAlert(error.message, "Utilisateur inconnu");
    }
  };

  // Resend code email

  const onResendEmail = async (email) => {
    try {
      await Auth.resendSignUp(email);
      Alert.alert("", "Code envoyé");
    } catch (error) {
      const errorMessages = {
        UserNotFoundException: "Utilisateur inconnu",
        TooManyFailedAttemptsException:
          "Trop de tentatives échouées, veuillez patienter",
        TooManyRequestsException: "Trop de requêtes, veuillez patienter",
      };
      showErrorAlert(errorMessages[error.code]);
    }
  };

  // Reset password

  const onNewPassword = async (email, code, password) => {
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      return { email };
    } catch (error) {
      const errorMessages = {
        CodeMismatchException: "Code incorrect",
        ExpiredCodeException: "Code expiré",
        InvalidPasswordException: "Mot de passe invalide",
        LimitExceededException: "Limite dépassée",
        TooManyFailedAttemptsException:
          "Trop de tentatives échouées, veuillez patienter",
        AttemptLimitExceededException: "Limite de tentatives dépassée",
      };
      showErrorAlert(errorMessages[error.code]);
    }
  };

  // Send code reset password

  const onSendCode = async (email) => {
    try {
      const response = await Auth.forgotPassword(email);
      return { email };
    } catch (error) {
      const errorMessages = {
        CodeMismatchException: "Code incorrect",
        ExpiredCodeException: "Code expiré",
        InvalidPasswordException: "Mot de passe invalide",
        LimitExceededException:
          "Limite dépassée, veuillez patienter avant de réessayer",
        TooManyFailedAttemptsException:
          "Trop de tentatives échouées, veuillez patienter",
      };
      showErrorAlert(errorMessages[error.code]);
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
