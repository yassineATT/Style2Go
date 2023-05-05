import React, { useContext, useState, useEffect, useMemo } from "react";
import { View, Dimensions } from "react-native";
import {
  SafeArea,
  BackContainer,
  ShopName,
  CarouselContainer,
} from "../../shops/components/shop.styles";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { ProductItem } from "../../shops/components/product-item";
import { ColorButton } from "../components/color-button";
import { ColorButtonContainer } from "../components/product-detail.styles";
import { Modal, FlatList, TouchableOpacity, Text } from "react-native";
import { ProductContext } from "../../../services/product/product.context";

export const ProductScreen = ({ route }) => {
  const { id, name, price, image, description } = route.params;
  const {
    getProductsDetails,
    productsDetails,
    loading,
    selectedColor,
    selectedSize,
    handleColorChange,
    getUniqueColors,
    getUniqueSizes,
    handleSizeChange,
    setSelectedColor,
    setSelectedSize,
  } = useContext(ProductContext);
  const renderItem = ({ item }) => <ProductItem item={item} />;

  const [isSizeModalVisible, setIsSizeModalVisible] = useState(false);

  useEffect(() => {
    getProductsDetails(id);
    setSelectedColor(null);
    setSelectedSize(null);
    console.log(productsDetails);
  }, []);

  const uniqueColors = useMemo(
    () => getUniqueColors(productsDetails),
    [productsDetails]
  );
  const uniqueSizes = useMemo(
    () => getUniqueSizes(productsDetails, selectedColor),
    [productsDetails, selectedColor]
  );

  const renderItemSize = ({ item }) => {
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

  const navigation = useNavigation();
  return (
    <SafeArea>
      <View>
        <BackContainer>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={30}
          />
        </BackContainer>
        <ShopName>{name}</ShopName>
        <CarouselContainer>
          <Carousel
            data={[{ name, price, image, description }]}
            renderItem={renderItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={250}
            itemHeight={450}
          />
        </CarouselContainer>
        <ColorButtonContainer>
          {uniqueColors.map((color) => {
            const productDetail = productsDetails.find(
              (detail) => detail.color === color
            );
            return (
              <ColorButton
                key={color}
                color={productDetail.color.toLowerCase()}
                available={productDetail.quantity > 0}
                selected={productDetail.color === selectedColor}
                onPress={() => handleColorChange(productDetail.color)}
              />
            );
          })}
        </ColorButtonContainer>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isSizeModalVisible}
          onRequestClose={() => {
            setIsSizeModalVisible(!isSizeModalVisible);
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            onPress={() => setIsSizeModalVisible(false)}
          >
            <View
              style={{
                backgroundColor: "white",
              }}
            >
              <FlatList
                data={uniqueSizes}
                renderItem={renderItemSize}
                keyExtractor={(item) => item}
              />
            </View>
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity onPress={() => setIsSizeModalVisible(true)}>
          <Text style={{ padding: 16 }}>
            {selectedSize
              ? `Taille: ${selectedSize}`
              : "Sélectionnez une taille"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};
