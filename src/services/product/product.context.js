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
      const productDetailsPromises = filteredProducts.map(async (product) => {
        const details = await DataStore.query(ProductDetail, (p) =>
          p.productID.eq(product.id)
        );
        return { ...product, details };
      });

      const productsWithDetails = await Promise.all(productDetailsPromises);
      setProducts(productsWithDetails);
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
    setSelectedSize(null);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(selectedSize === size ? null : size);
  };

  const getSelectedProductPrice = () => {
    if (selectedColor && selectedSize) {
      const selectedProductDetail = productsDetails.find(
        (detail) =>
          detail.color === selectedColor && detail.size === selectedSize
      );
      return selectedProductDetail ? selectedProductDetail.price : null;
    }
    return null;
  };

  const getSelectedProductDetail = () => {
    if (!selectedColor || !selectedSize) return null;

    return productsDetails.find(
      (detail) => detail.color === selectedColor && detail.size === selectedSize
    );
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
    getSelectedProductDetail,
    getSelectedProductPrice,
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
