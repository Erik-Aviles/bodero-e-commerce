import React, { createContext, useContext } from "react";
import useSWR from "swr";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data: orders,
    error,
    isValidating,
    mutate,
  } = useSWR("api/orders", fetcher);

  return (
    <OrdersContext.Provider value={{ orders, error, isValidating, mutate }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  return useContext(OrdersContext);
};
