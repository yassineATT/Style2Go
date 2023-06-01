import React from "react";
import { Text } from "react-native";
import { ImageConstruction } from "../components/favorite.styles";

export const FavoriteScreen = () => {
  const constructionGif = "../../../../assets/construction.gif";
  return (
    <ImageConstruction
      source={require(constructionGif)}
      mode="contain"
      alt="construction"
    />
  );
};
