import React from "react";
import { StatusBar, Alert } from "react-native";
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
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";

const email_regex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const SignUpScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const pwd = watch("password");

  const signUpPress = async (data) => {
    console.log(data);
    const { name, email, password } = data;
    try {
      const response = await Auth.signUp({
        username: email,
        password,
        attributes: { name },
      });
      navigation.navigate("ConfirmEmail", { email });
    } catch (error) {
      if (error.code === "UsernameExistsException") {
        Alert.alert("", "Email déjà utilisé");
      } else {
        Alert.alert(error.message);
      }
    }
  };

  return (
    <>
      <SignUpCover>
        <SignUpCard>
          <AuthTitle>Crée un compte</AuthTitle>
          <AuthInput
            name="name"
            placeholder="Username"
            keyboardType="default"
            control={control}
            rules={{ required: "Name is required" }}
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
          <AuthButton mode="contained" onPress={handleSubmit(signUpPress)}>
            {/* handleSubmit vérifie d'abord les champs et les envoie à signUpPress */}
            <AuthTextWhite>S'inscrire</AuthTextWhite>
          </AuthButton>
        </SignUpCard>
        <SecondButton onPress={() => navigation.navigate("SignIn")}>
          <AuthTextBlack>J'ai déjà un compte</AuthTextBlack>
        </SecondButton>
        <StatusBar style="auto" />
      </SignUpCover>
    </>
  );
};
