import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const SizeComponent = (
  item,
  productsDetails,
  selectedColor,
  handleSizeChange,
  setIsSizeModalVisible
) => {
  const productDetail = productsDetails.find(
    (detail) => detail.color === selectedColor && detail.size === item
  );

  const handlePress = () => {
    handleSizeChange(productDetail.size);
    setIsSizeModalVisible(false);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={{ padding: 16 }}>{productDetail.size}</Text>
    </TouchableOpacity>
  );
};
