import React, { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Shop, Product, ProductDetail } from "../../models";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsDetails, setProductsDetails] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getShops();
  }, []);

  const getShops = async () => {
    const fetchedShops = await DataStore.query(Shop);
    setShops(fetchedShops);
    console.log(shops);
  };

  const getProducts = async (shopId) => {
    setLoading(true);
    try {
      const fetchedProducts = await DataStore.query(Product);
      const filteredProducts = fetchedProducts.filter(
        (p) => p.shopID === shopId
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getProductsDetails = async (productId) => {
    setLoading(true);
    try {
      const fetchedProductsDetails = await DataStore.query(ProductDetail);
      const filteredProductsDetails = fetchedProductsDetails.filter(
        (p) => p.productID === productId
      );
      setProductsDetails(filteredProductsDetails);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUniqueColors = (productDetails) => {
    return productDetails.reduce((uniqueColors, productDetail) => {
      if (!uniqueColors.includes(productDetail.color)) {
        uniqueColors.push(productDetail.color);
      }
      return uniqueColors;
    }, []);
  };

  const handleColorChange = (color) => {
    if (selectedColor === color) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  const shopContext = {
    shops,
    products,
    productsDetails,
    selectedColor,
    loading,
    getShops,
    getProducts,
    getProductsDetails,
    getUniqueColors,
    handleColorChange,
  };

  return (
    <ShopContext.Provider value={shopContext}>{children}</ShopContext.Provider>
  );
};
