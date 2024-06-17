import React, { createContext, useState, useEffect, useContext } from "react";
import NotificationContext from "./NotificationContext";
import { fetcher } from "@/utils/fetcher";
import { withSwal } from "react-sweetalert2";
import useSWR from "swr";
import axios from "axios";
import { capitalize } from "@/utils/utils";

const CategoryContext = createContext();

const CategoryProvider = withSwal(({ children, swal }) => {
  const { showNotification } = useContext(NotificationContext);

  const [newCategories, setNewCategories] = useState([]);

  const {
    data: categories,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/categories/full", fetcher);

  useEffect(() => {
    if (categories) {
      setNewCategories(categories);
    }
  }, [categories]);

  const getCategories = async () => {
    try {
      const response = await axios.get("/api/categories/full");
      setNewCategories(response.data);
      mutate(); // Actualizar manualmente la caché de SWR
    } catch (error) {
      console.error("Error al obtener las categorias:", error);
    }
  };
  function deleteCaterory(value) {
    swal
      .fire({
        title: "Estas seguro?",
        text: `Quires eliminar "${value.name}"?`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#fe0000",
        confirmButtonText: "Si, Eliminar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = value;
          await axios.delete("/api/categories/full?_id=" + _id);
          showNotification({
            open: true,
            msj: `Categoria:
              ${capitalize(value?.name)}, eliminada con exito!`,
            status: "success",
          });

          getCategories();
        }
      });
  }

  return (
    <CategoryContext.Provider
      value={{
        newCategories,
        error,
        isLoading,
        getCategories,
        deleteCaterory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
});

export default CategoryContext;
export { CategoryProvider };
