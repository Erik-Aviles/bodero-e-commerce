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

  const handeDeleteImage = async (index) => {
    const updateImages = image[index];
    try {
      const data = await axios.delete(
        `/api/uploadcat?url=${encodeURIComponent(updateImages)}`
      );
      const updatedImages = image.filter((img, idx) => idx !== index);
      setImage(updatedImages);
    } catch (error) {
      showNotification({
        open: true,
        msj: "Hubo un error al eliminar imagen",
        status: "error",
      });
    }
  };

  const handleUpload = async (e) => {
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      try {
        const res = await axios.post("/api/uploadcat", data);
        setImage((oldImages) => [...oldImages, ...res.data?.links]);
      } catch (error) {
        console.error("Error cargando la imagen:", error);
      }
      setIsUploading(false);
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
        handleUpload,
        handeDeleteImage,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
});

export default CategoryContext;
export { CategoryProvider };
