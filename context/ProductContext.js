import React, { createContext } from "react";
import { fetcher } from "@/utils/fetcher";
import { withSwal } from "react-sweetalert2";
import useSWR from "swr";
import useDeleteItem from "@/hooks/useDeleteItem";

const ProductContext = createContext();

const ProductProvider = withSwal(({ children, swal }) => {
  const deleteItem = useDeleteItem();
  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/products/full", fetcher);

  function formatPrice(price) {
    let precioFormateado = new Intl.NumberFormat("es-EC", {
      style: "currency",
      currency: "USD",
    }).format(price);
    return precioFormateado;
  }

  function deleteProduct(item) {
    deleteItem({
      swal,
      getItems: mutate,
      item,
      apiEndpoint: "products",
      itemNameKey: "title",
    });
  }

  return (
    <ProductContext.Provider
      value={{
        newProduct: products,
        error,
        isLoading,
        getProducts: mutate,
        formatPrice,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
});

export default ProductContext;
export { ProductProvider };
