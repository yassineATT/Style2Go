import React, { useContext, useState, useEffect, useMemo } from "react";
import { View, Dimensions, Alert } from "react-native";
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
import { AuthenticationContext } from "../../../services/authentification/auth.context";
import { BasketContext } from "../../../services/basket/basket.context";

export const ProductScreen = ({ route }) => {
  const { id, name, shop, image, description } = route.params;
  const {
    getProductsDetails,
    productsDetails,
    loading,
    selectedColor,
    selectedSize,
    handleColorChange,
    getUniqueColors,
    getSelectedProductPrice,
    getUniqueSizes,
    handleSizeChange,
    setSelectedColor,
    setSelectedSize,
  } = useContext(ProductContext);
  const { addToBasket } = useContext(BasketContext);
  const { user } = useContext(AuthenticationContext);
  const navigation = useNavigation();

  const renderItem = ({ item }) => <ProductItem item={item} />;

  const [isSizeModalVisible, setIsSizeModalVisible] = useState(false);

  useEffect(() => {
    getProductsDetails(id);
    setSelectedColor(null);
    setSelectedSize(null);
    console.log(productsDetails);
  }, []);

  const handleAddToBasket = () => {
    const selectedProduct = productsDetails.find(
      (detail) => detail.color === selectedColor && detail.size === selectedSize
    );
    addToBasket(selectedProduct, shop, user, navigation);
  };

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
            data={[{ name, image, description }]}
            renderItem={renderItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={250}
            itemHeight={450}
          />
          <Text style={{ padding: 16 }}>
            {getSelectedProductPrice()
              ? `Prix : ${getSelectedProductPrice()}€`
              : "Sélectionnez une couleur puis une taille"}
          </Text>
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
      <TouchableOpacity
        onPress={handleAddToBasket}
        disabled={!selectedColor || !selectedSize}
        style={{
          backgroundColor: selectedColor && selectedSize ? "black" : "grey",
          padding: 16,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>Ajouter au panier</Text>
      </TouchableOpacity>
    </SafeArea>
  );
};
