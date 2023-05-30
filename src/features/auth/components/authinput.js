import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const StyledTextInput = styled(TextInput).attrs((props) => ({
  theme: {
    colors: {
      primary: props.error ? "red" : "black",
      background: props.theme.colors.bg.primary,
      text: props.theme.colors.text.primary,
      underlineColor: props.theme.colors.ui.none,
      disabled: "none",
    },
  },
}))`
  margin-top: 16px;
  border-radius: 5px;
  width: 250px;
  align-self: center;
`;

const ErrorText = styled(Text)`
  color: red,
  align-self: flex-start,
  width: 85%,
  margin-left: 35px,
}`;

const AuthInput = ({
  control, // contrôleur de react-hook-form
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  keyboardType,
  isPassword = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // état pour gérer la visibilité du mot de passe
  return (
    // Le composant Controller de react-hook-form permet de connecter un composant de formulaire non contrôlé à un contrôleur
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <View style={{ height: 75 }}>
            <StyledTextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry && !isPasswordVisible}
              error={error}
              keyboardType={keyboardType}
              autoCapitalize="none"
              mode="outlined"
              right={
                isPassword && (
                  <TextInput.Icon
                    icon={isPasswordVisible ? "eye-off" : "eye"}
                    size={20}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                )
              }
            />
            {error && <ErrorText>{error.message || "Erreur"}</ErrorText>}
          </View>
        </>
      )}
    />
  );
};

export default AuthInput;
