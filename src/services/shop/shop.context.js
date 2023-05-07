import React, { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Shop } from "../../models";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await getShops();
      console.log("shops");
    }

    fetchData();
  }, []);

  const getShops = async () => {
    const fetchedShops = await DataStore.query(Shop);
    setShops(fetchedShops);
    console.log(shops);
  };

  const shopContext = {
    shops,
    loading,
  };

  return (
    <ShopContext.Provider value={shopContext}>{children}</ShopContext.Provider>
  );
};
