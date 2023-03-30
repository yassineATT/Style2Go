import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInScreen } from "../../features/accounts/screens/signin.screen";
import { SignUpScreen } from "../../features/accounts/screens/signup.screen";
import { ResetPwdScreen } from "../../features/accounts/screens/reset-pwd.screens";
import { SendCodeScreen } from "../../features/accounts/screens/send-code.screens";
import { ConfirmEmail } from "../../features/accounts/screens/confirm-email.screen";
import { AuthenticationContext } from "../../services/authentification/auth.context";
import { TabNavigator } from "./tab.navigator";

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  const { user } = useContext(AuthenticationContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Home" component={TabNavigator} />
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
