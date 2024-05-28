/* import React, { createContext, useContext } from "react";
import useSWR from "swr";

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data: services,
    error,
    isValidating,
    mutate,
  } = useSWR("api/services", fetcher);

  return (
    <ServicesContext.Provider value={{ services, error, isValidating, mutate }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  return useContext(ServicesContext);
};
 */
