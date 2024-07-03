import React, { createContext } from "react";
import { fetcher } from "@/utils/fetcher";
import { withSwal } from "react-sweetalert2";
import useSWR from "swr";
import useDeleteItem from "@/hooks/useDeleteItem";

const CustomerContext = createContext();

const CustomerProvider = withSwal(({ children, swal }) => {
  const deleteItem = useDeleteItem();
  const {
    data: customers,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/customers/full", fetcher);

  function deleteCustomer(item) {
    deleteItem({
      swal,
      getItems: mutate,
      item,
      apiEndpoint: "customers",
      itemNameKey: "name",
    });
  }

  return (
    <CustomerContext.Provider
      value={{
        newCustomers: customers,
        error,
        isLoading,
        getCustomers: mutate,
        deleteCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
});

export default CustomerContext;
export { CustomerProvider };
