import React, { createContext } from "react";
import { fetcher } from "@/utils/fetcher";
import { withSwal } from "react-sweetalert2";
import useSWR from "swr";
import useDeleteItem from "@/hooks/useDeleteItem";

const UserContext = createContext();

const UserProvider = withSwal(({ children, swal }) => {
  const deleteItem = useDeleteItem();
  const {
    data: users,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/users/full", fetcher);

  function deleteUser(item) {
    deleteItem({
      swal,
      getItems: mutate,
      item,
      apiEndpoint: "users",
      itemNameKey: "fullname",
    });
  }

  return (
    <UserContext.Provider
      value={{
        newUsers: users,
        error,
        isLoading,
        getUsers: mutate,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
});

export default UserContext;
export { UserProvider };
