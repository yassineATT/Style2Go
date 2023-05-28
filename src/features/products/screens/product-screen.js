import React, { useContext, useState, useEffect, useMemo } from "react";
import {
  View,
  Dimensions,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
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
import {
  ColorButtonContainer,
  AddToBasketButton,
  AddToBasketButtonText,
  SizeText,
  PriceText,
  ModalBackground,
  ModalContent,
} from "../components/product.styles";
import { ProductContext } from "../../../services/product/product.context";
import { AuthenticationContext } from "../../../services/authentification/auth.context";
import { BasketContext } from "../../../services/basket/basket.context";
import { SizeComponent } from "../components/size-components";
import { ProductComponent } from "../components/product-component";

export const ProductScreen = ({ route }) => {
  const { id, name, shop, image, description } = route.params;
  const {
    getProductsDetails,
    productsDetails,
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

  useEffect(() => {
    getProductsDetails(id);
    setSelectedColor(null);
    setSelectedSize(null);
  }, []);

  const renderItem = ({ item }) => <ProductComponent item={item} />;

  const [isSizeModalVisible, setIsSizeModalVisible] = useState(false);

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

  const renderItemSize = ({ item }) =>
    SizeComponent(
      item,
      productsDetails,
      selectedColor,
      handleSizeChange,
      setIsSizeModalVisible
    );

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
          <SizeText>
            {getSelectedProductPrice()
              ? `Prix : ${getSelectedProductPrice()}€`
              : "Sélectionnez une couleur puis une taille"}
          </SizeText>
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
          <ModalBackground onPress={() => setIsSizeModalVisible(false)}>
            <ModalContent>
              <FlatList
                data={uniqueSizes}
                renderItem={renderItemSize}
                keyExtractor={(item) => item}
              />
            </ModalContent>
          </ModalBackground>
        </Modal>
        <TouchableOpacity onPress={() => setIsSizeModalVisible(true)}>
          <SizeText>
            {selectedSize
              ? `Taille: ${selectedSize}`
              : "Sélectionnez une taille"}
          </SizeText>
        </TouchableOpacity>
      </View>
      <AddToBasketButton
        onPress={handleAddToBasket}
        disabled={!selectedColor || !selectedSize}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      >
        <AddToBasketButtonText>Ajouter au panier</AddToBasketButtonText>
      </AddToBasketButton>
    </SafeArea>
  );
};
