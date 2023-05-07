import React, { createContext, useState, useContext, useEffect } from "react";
import { User } from "../../models";
import { DataStore } from "aws-amplify";
import { AuthenticationContext } from "../authentification/auth.context";

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
          sub: user?.attributes?.sub,
        })
      );
      console.log("User saved successfully:", newUser);
    } catch (error) {
      console.log("Error saving user:", error);
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
        console.log("User profile not found", sub, isProfileRegistered);
        return false;
      } else {
        console.log("User profile found", sub, isProfileRegistered);
        return true;
      }
    } catch (error) {
      console.error("Error checking user profile:", error);
      console.log("User profile not found", sub, isProfileRegistered);
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      checkUserProfile(user.attributes.sub).then((result) => {
        console.log("User profile registered", result);
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
