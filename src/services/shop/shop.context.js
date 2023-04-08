import React, { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Shop, Product } from "../../models";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
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

  const shopContext = {
    shops,
    products,
    loading,
    getShops,
    getProducts,
  };

  return (
    <ShopContext.Provider value={shopContext}>{children}</ShopContext.Provider>
  );
};
