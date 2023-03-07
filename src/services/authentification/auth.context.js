import React, { createContext } from "react";
import { Auth, Hub } from "aws-amplify";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const authContext = {
    onLogin,
    onSignOut,
    onSignUp,
    isLoading,
    error,
  };

  return (
    <AuthenticationContext.Provider value={authContext}>
      {children}
    </AuthenticationContext.Provider>
  );
};
