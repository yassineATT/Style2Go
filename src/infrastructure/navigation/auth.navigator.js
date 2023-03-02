import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInScreen } from "../../features/accounts/screens/signin.screen";
import { SignUpScreen } from "../../features/accounts/screens/signup.screen";
import { ResetPwdScreen } from "../../features/accounts/screens/reset-pwd.screens";
import { SendCodeScreen } from "../../features/accounts/screens/send-code.screens";

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SendCode" component={SendCodeScreen} />
      <Stack.Screen name="ResetPwd" component={ResetPwdScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};
