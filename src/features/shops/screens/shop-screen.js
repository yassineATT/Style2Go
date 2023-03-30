import React, { useState } from "react";
import { Text, View } from "react-native";
import {
  SafeArea,
  BackContainer,
  ShopName,
  NewCollectionButton,
  CarouselContainer,
  CarouselText,
} from "../components/shop.styles";
import { colors } from "../../../infrastructure/theme/colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { Image } from "react-native";

export const ShopScreen = ({ route }) => {
  const { id, name } = route.params;

  const [shop, setShop] = useState({ name, id });
  const [articles, setArticles] = useState([
    {
      id: "1",
      name: "Air Force 1",
      price: "100",
      image: "https://i.imgur.com/2nCt3Sbl.jpg",
    },
    {
      id: "2",
      name: "Air Max 90",
      price: "120",
      image: "https://i.imgur.com/2nCt3Sbl.jpg",
    },
    {
      id: "3",
      name: "Air Max 95",
      price: "130",
      image: "https://i.imgur.com/2nCt3Sbl.jpg",
    },
    {
      id: "4",
      name: "Air Max 97",
      price: "140",
      image: "https://i.imgur.com/2nCt3Sbl.jpg",
    },
    {
      id: "5",
      name: "Air Max 270",
      price: "150",
      image: "https://i.imgur.com/2nCt3Sbl.jpg",
    },
    {
      id: "6",
      name: "Air Max 720",
      price: "160",
      image: "https://i.imgur.com/2nCt3Sbl.jpg",
    },
    {
      id: "7",
      name: "Air Max 360",
      price: "170",
      image: "https://i.imgur.com/2nCt3Sbl.jpg",
    },
    {
      id: "8",
      name: "Air Max 1",
      price: "180",
      image: "https://i.imgur.com/2nCt3Sbl.jpg",
    },
    {
      id: "9",
      name: "Air Max 2",
      price: "190",
      image: "https://i.imgur.com/2nCt3Sbl.jpg",
    },
    {
      id: "10",
      name: "Air Max 3",
      price: "200",
      image: "https://i.imgur.com/2nCt3Sbl.jpg",
    },
  ]);

  const renderItem = ({ item }) => (
    <View>
      <Image
        source={{ uri: item.image }}
        style={{ width: 300, height: 300, borderRadius: 5 }}
        resizeMode="cover"
      />
      <CarouselText>{item.name}</CarouselText>
    </View>
  );

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
        <ShopName>{shop.name}</ShopName>

        <NewCollectionButton
          style={{
            backgroundColor: colors.brand.primary,
            padding: 10,
            borderRadius: 5,
            margin: 10,
          }}
        >
          <Text style={{ color: colors.text.primary }}>New Collection</Text>
        </NewCollectionButton>
      </View>
      <CarouselContainer>
        <Carousel
          data={articles}
          renderItem={renderItem}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={300}
          itemHeight={300}
        />
      </CarouselContainer>
    </SafeArea>
  );
};
