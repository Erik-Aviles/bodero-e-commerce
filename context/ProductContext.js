import React, { createContext, useState, useEffect, useContext } from "react";
import NotificationContext from "./NotificationContext";
import { fetcher } from "@/utils/fetcher";
import { withSwal } from "react-sweetalert2";
import useSWR from "swr";
import axios from "axios";
import { capitalize } from "@/utils/utils";

const ProductContext = createContext();

const ProductProvider = withSwal(({ children, swal }) => {
  const { showNotification } = useContext(NotificationContext);

  const [newProduct, setNewProduct] = useState([]);

  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/products/full", fetcher);

  useEffect(() => {
    if (products) {
      setNewProduct(products);
    }
  }, [products]);

  const getProducts = async () => {
    try {
      const response = await axios.get("/api/products/full");
      setNewProduct(response.data);
      mutate(); // Actualizar manualmente la caché de SWR
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  function formatPrice(price) {
    let precioFormateado = new Intl.NumberFormat("es-EC", {
      style: "currency",
      currency: "USD",
    }).format(price);
    return precioFormateado;
  }

  function deleteProduct(product) {
    swal
      .fire({
        title: "Estas seguro?",
        text: `¿Realmente desea eliminar "${capitalize(
          product?.title
        )}" de la base de datos? Esta acción no se puede deshacer.`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#fe0000",
        confirmButtonText: "Si, Eliminar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = product;
          await axios.delete("/api/products/full?_id=" + _id);
          showNotification({
            open: true,
            msj: `Producto: "${capitalize(
              product?.title
            )}", eliminado con exito!`,
            status: "success",
          });
        }
        getProducts();
      });
  }
  return (
    <ProductContext.Provider
      value={{
        newProduct,
        error,
        isLoading,
        getProducts,
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
