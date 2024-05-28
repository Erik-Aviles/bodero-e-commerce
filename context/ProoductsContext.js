import React, { createContext, useContext } from "react";
import useSWR from "swr";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data: products,
    error,
    isValidating,
    mutate,
  } = useSWR("api/products", fetcher);

  return (
    <ProductsContext.Provider value={{ products, error, isValidating, mutate }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
};
