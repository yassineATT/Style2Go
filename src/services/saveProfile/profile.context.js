import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "../../models";
import { DataStore } from "aws-amplify";
import { AuthenticationContext } from "../authentification/auth.context";
import { Alert } from "react-native";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [isProfileRegistered, setIsProfileRegistered] = useState(false);
  const { user } = useContext(AuthenticationContext);

  const saveProfile = async (
    firstname,
    lastname,
    street,
    city,
    country,
    postalCode
  ) => {
    try {
      const newUser = await DataStore.save(
        new User({
          firstname,
          lastname,
          street,
          city,
          country,
          postalCode,
          sub: user?.attributes?.sub, // sub est l'id unique de l'utilisateur
        })
      );
    } catch (error) {
      Alert.alert("Erreur lors de la sauvegarde du profil", errorMessage);
      console.error("Erreur lors de la sauvegarde du profil:", error);
    }
  };

  useEffect(() => {
    if (user) {
      const subscription = DataStore.observe(User, (u) =>
        u.sub.eq(user.attributes.sub)
      ).subscribe(
        (msg) => {
          if (msg.opType === "INSERT" || msg.opType === "UPDATE") {
            setIsProfileRegistered(true);
          } else if (msg.opType === "DELETE") {
            setIsProfileRegistered(false);
          }
        },
        (error) => console.error("Error observing user data:", error)
      );
      return () => subscription.unsubscribe();
    }
  }, [user]);

  const checkUserProfile = async (sub) => {
    try {
      const queryResult = await DataStore.query(User, (u) => u.sub.eq(sub));
      console.log("User profile found", queryResult);
      if (queryResult.length === 0) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error checking user profile:", error, sub);
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      checkUserProfile(user.attributes.sub).then((result) => {
        setIsProfileRegistered(result);
      });
    }
  }, [user]);

  const profileContext = {
    isProfileRegistered,
    saveProfile,
  };

  return (
    <ProfileContext.Provider value={profileContext}>
      {children}
    </ProfileContext.Provider>
  );
};
