import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInScreen } from "../../features/accounts/screens/signin.screen";
import { SignUpScreen } from "../../features/accounts/screens/signup.screen";
import { ResetPwdScreen } from "../../features/accounts/screens/reset-pwd.screens";
import { SendCodeScreen } from "../../features/accounts/screens/send-code.screens";
import { Home } from "../../features/shops/screens/index";
import { ConfirmEmail } from "../../features/accounts/screens/confirm-email.screen";
import { Auth, Hub } from "aws-amplify";

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  const [user, setUser] = useState(undefined);

  const checkAuth = async () => {
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
    checkAuth();
  }, []);

  useEffect(() => {
    Hub.listen("auth", (data) => {
      if (data.payload.event === "signIn" || data.payload.event === "signOut") {
        checkAuth();
      }
    });
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SendCode" component={SendCodeScreen} />
          <Stack.Screen name="ResetPwd" component={ResetPwdScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
        </>
      )}
    </Stack.Navigator>
  );
};
