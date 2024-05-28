import React, { createContext, useContext } from "react";
import useSWR from "swr";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data: categories,
    error,
    isValidating,
    mutate,
  } = useSWR("api/categories", fetcher);

  return (
    <CategoriesContext.Provider
      value={{ categories, error, isValidating, mutate }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  return useContext(CategoriesContext);
};
