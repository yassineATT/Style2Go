import React, { createContext, useState } from "react";
import { DataStore } from "aws-amplify";
import { Product, ProductDetail } from "../../models";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productsDetails, setProductsDetails] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProducts = async (shopId) => {
    setLoading(true);
    try {
      const fetchedProducts = await DataStore.query(Product);
      console.log(fetchedProducts);
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

  const getUniqueSizes = (productDetails, color) => {
    return productDetails
      .filter((detail) => detail.color === color)
      .reduce((uniqueSizes, productDetail) => {
        if (!uniqueSizes.includes(productDetail.size)) {
          uniqueSizes.push(productDetail.size);
        }
        return uniqueSizes;
      }, []);
  };

  const handleColorChange = (color) => {
    if (selectedColor === color) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(selectedSize === size ? null : size);
  };

  const productContext = {
    products,
    productsDetails,
    selectedColor,
    selectedSize,
    loading,
    getProducts,
    getProductsDetails,
    getUniqueColors,
    handleColorChange,
    getUniqueSizes,
    handleSizeChange,
    setSelectedColor,
    setSelectedSize,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
};
