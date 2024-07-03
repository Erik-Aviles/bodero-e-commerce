import React, { createContext } from "react";
import { fetcher } from "@/utils/fetcher";
import { withSwal } from "react-sweetalert2";
import useSWR from "swr";
import useDeleteItem from "@/hooks/useDeleteItem";

const CategoryContext = createContext();

const CategoryProvider = withSwal(({ children, swal }) => {
  const deleteItem = useDeleteItem();
  const {
    data: categories,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/categories/full", fetcher);

  function deleteCaterory(item) {
    deleteItem({
      swal,
      getItems: mutate,
      item,
      apiEndpoint: "categories",
      itemNameKey: "name",
    });
  }

  return (
    <CategoryContext.Provider
      value={{
        newCategories: categories,
        error,
        isLoading,
        getCategories: mutate,
        deleteCaterory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
});

export default CategoryContext;
export { CategoryProvider };
