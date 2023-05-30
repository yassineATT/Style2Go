import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInScreen } from "../../features/auth/screens/signin.screen";
import { SignUpScreen } from "../../features/auth/screens/signup.screen";
import { ResetPwdScreen } from "../../features/auth/screens/reset-pwd.screens";
import { SendCodeScreen } from "../../features/auth/screens/send-code.screens";
import { ConfirmEmail } from "../../features/auth/screens/confirm-email.screen";

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SendCode" component={SendCodeScreen} />
      <Stack.Screen name="ResetPwd" component={ResetPwdScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
    </Stack.Navigator>
  );
};
