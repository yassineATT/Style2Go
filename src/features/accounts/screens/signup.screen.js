import React from "react";
import { StatusBar } from "react-native";
import {
  SignUpCard,
  AuthButton,
  AuthTitle,
  AuthTextBlack,
  SecondButton,
  AuthTextWhite,
  SignUpCover,
} from "./../components/account.styles";
import AuthInput from "./../components/authinput";
import { useForm } from "react-hook-form";

const email_regex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const pwd = watch("password");

  const handleSignUp = (data) => {
    console.log(data);
  };

  return (
    <>
      <SignUpCover>
        <SignUpCard>
          <AuthTitle>Create account</AuthTitle>
          <AuthInput
            name="username"
            placeholder="Username"
            keyboardType="default"
            control={control}
            rules={{ required: "Username is required" }}
          />
          <AuthInput
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            control={control}
            rules={{
              required: "Email is required",
              pattern: { value: email_regex, message: "Email invalide" },
            }}
          />
          <AuthInput
            name="password"
            keyboardType="password"
            placeholder="Password"
            secureTextEntry
            control={control}
            isPassword={true}
            rules={{
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              required: "Password is required",
            }}
          />
          <AuthInput
            name="password-repeat"
            placeholder="Repeat Password"
            keyboardType="password"
            secureTextEntry
            control={control}
            isPassword={true}
            rules={{
              validate: (value) => value === pwd || "Passwords do not match",
            }}
          />
          <AuthButton mode="contained" onPress={handleSubmit(handleSignUp)}>
            {/* handleSubmit vérifie d'abord les champs et les envoie à handleSignUp */}
            <AuthTextWhite>S'inscrire</AuthTextWhite>
          </AuthButton>
        </SignUpCard>
        <SecondButton onPress={() => console.log("Compte Ok")}>
          <AuthTextBlack>J'ai déjà un compte</AuthTextBlack>
        </SecondButton>
        <StatusBar style="auto" />
      </SignUpCover>
    </>
  );
};
