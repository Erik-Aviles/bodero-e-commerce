import React, { useCallback, useContext, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import { DeleteIcon, UpLoadIcon } from "../Icons";
import useCategories from "@/hooks/useCategories";
import ButtonClose from "../buttons/ButtonClose";
import useLoading from "@/hooks/useLoading";
import { Loader } from "../snnipers/Loader";
import { withSwal } from "react-sweetalert2";
import { capitalize } from "@/utils/utils";
import { Input } from "@nextui-org/react";
import axios from "axios";

const CategoryForm = withSwal(
  ({ swal, category, titulo, textSmall, toggleModal }) => {
    const { isLoading, startLoading, finishtLoading } = useLoading();
    const { mutateCategories } = useCategories();
    const { showNotification } = useContext(NotificationContext);

    const [name, setName] = useState(category?.name || "");
    const [description, setDescription] = useState(category?.description || "");
    const [image, setImage] = useState({
      link: category?.image?.link || "",
      publicId: category?.image?.publicId || "",
    });
    const [isUploading, setIsUploading] = useState(false);

    const resetCategoryForm = () => {
      setName("");
      setDescription("");
      setImage({});
    };

    //registrar categoria
    async function saveCategory(e) {
      e.preventDefault();
      const rest = {
        name: name.toLowerCase(),
        description,
        image,
      };

      try {
        const { data } = await axios.post("/api/categories/full", rest);
        showNotification({
          open: true,
          msj: data?.message,
          status: "success",
        });
        mutateCategories();
        resetCategoryForm();
        toggleModal();
      } catch (error) {
        showNotification({
          open: true,
          msj: error.response.data.message,
          status: "error",
        });
      }
    }

    //editar categoria
    async function edithCategory(e) {
      e.preventDefault();
      let rest = {
        name: name.toLowerCase(),
        description,
        image,
      };
      const _id = category._id;
      if (_id) {
        try {
          const { data } = await axios.put("/api/categories/full", {
            ...rest,
            _id,
          });
          showNotification({
            open: true,
            msj: `Categoria: ${capitalize(rest.name)}, ${data?.message}`,
            status: "success",
          });
          mutateCategories();
          resetCategoryForm();
          toggleModal();
        } catch (error) {
          showNotification({
            open: true,
            msj: error.response.data.message,
            status: "error",
          });
        }
      }
    }

    //subir imagen
    const handleUpload = async (e) => {
      e.preventDefault();
      startLoading();
      const files = e.target?.files;
      if (files?.length > 0) {
        setIsUploading(true);
        const data = new FormData();
        data.append("file", files[0]);

        const res = await axios.post("/api/uploadcloudinary", data);
        setImage((prevState) => ({
          ...prevState,
          link: res.data?.images[0].url, // URL de la imagen
          publicId: res.data?.images[0].public_id, // Public ID para eliminarla
        }));
        console.log(image);
      }
      setIsUploading(false);
      finishtLoading();
    };

    //eliminar imagen
    const deleteImage = async (public_id) => {
      startLoading();
      try {
        const result = await swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará la imagen de forma permanente.",
          text: `¿Realmente desea eliminar la imagen: "${
            name > 30
              ? capitalize(name).substring(0, 30) + "..."
              : capitalize(name)
          }" de la base de datos? Esta acción no se puede deshacer.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#fe0000",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
          setIsUploading(true);
          const response = await axios.delete("/api/deleteImageCloudinary", {
            data: { public_id },
          });

          setImage((prevState) => ({
            ...prevState,
            link: "",
            publicId: "",
          }));

          swal.fire({
            title: "Eliminado!",
            text: response.data.message,
            icon: "success",
          });
        }
        setIsUploading(false);
        finishtLoading();
      } catch (error) {
        console.error(`Error eliminando la imagen: ${public_id}. `, error);
        swal.fire({
          title: "Error",
          text: `No se pudo eliminar solo la imagen. Debe eliminar el Banner: ${
            name > 30
              ? capitalize(name).substring(0, 30) + "..."
              : capitalize(name)
          } completo.`,
          icon: "error",
        });
      }
    };

    const onClear = useCallback(() => {
      setName("");
    }, []);

    return (
      <div className="relative w-full flex flex-col justify-center ">
        <header className=" flex flex-row justify-between">
          <h3 className="text-lg font-semibold">{titulo}</h3>
          <ButtonClose onClick={toggleModal} />
        </header>
        <p className="text-primary text-xs pb-3">{textSmall}</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={!category ? saveCategory : edithCategory}
        >
          <div className=" flex flex-col gap-2 w-full ">
            <div className="bg-grayLight border-container w-full ">
              <label className="block my-1">Nombre (*)</label>
              <Input
                isClearable
                type="text"
                value={name}
                isRequired={true}
                placeholder="Escribir título"
                labelPlacement="outside"
                onClear={() => onClear()}
                onChange={(e) => setName(e.target.value.toLowerCase())}
              />
            </div>
            <div className="bg-grayLight flex flex-col border-container w-full">
              <label className="block my-1">Descripción</label>
              <textarea
                maxLength={50}
                placeholder="Escribir breve descripción"
                value={description}
                className="min-h-[55px]"
                onChange={(e) => setDescription(e.target.value)}
              />
              {description.length === 50 ? (
                <span className="pt-1 text-success text-[10px] ">
                  A llegado al limite de caracteres.
                </span>
              ) : (
                <span></span>
              )}
            </div>

            <div className="bg-grayLight border-container flex justify-center items-center gap-3 ">
              {image?.link && (
                <div className="relative group w-28 h-28 flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md">
                  <img
                    src={image?.link}
                    alt={`Imagen de ${name}`}
                    className="rounded-md object-contain h-32 w-44 p-2"
                  />
                  <div className="absolute top-2 right-2 cursor-pointer opacity-0  group-hover:opacity-100 ">
                    <button
                      type="button"
                      onClick={() => deleteImage(image?.publicId)}
                    >
                      <DeleteIcon className="w-6 h-6 text-red stroke-2 bg-white rounded-full" />
                    </button>
                  </div>
                </div>
              )}
              {isUploading ? (
                <div className="w-28 h-28 flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md">
                  <Loader />
                </div>
              ) : (
                !image.link && (
                  <label className="w-28 h-28 flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md">
                    <UpLoadIcon />
                    <span>Subir imagen</span>
                    <input
                      type="file"
                      onChange={handleUpload}
                      className="hidden"
                    />
                  </label>
                )
              )}
            </div>
          </div>
          <div className="flex gap-1 mb-1">
            <button
              onClick={toggleModal}
              className="bg-secundary basis-1/2 hover:bg-secundary/60 text-white font-bold py-2 px-4"
              disabled={isLoading}
            >
              {isLoading ? "Esperar..." : "Cerrar"}
            </button>
            <button
              type="submit"
              className="btn-primary hover:bg-primary/60 py-1 xs:w-40 basis-1/2"
              disabled={isLoading}
            >
              {isLoading ? "Esperar..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    );
  }
);

export default CategoryForm;
