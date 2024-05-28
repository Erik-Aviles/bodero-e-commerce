import React, { createContext, useContext } from "react";
import useSWR from "swr";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data: users,
    error,
    isValidating,
    mutate,
  } = useSWR("api/users", fetcher);

  return (
    <UsersContext.Provider value={{ users, error, isValidating, mutate }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(UsersContext);
};
