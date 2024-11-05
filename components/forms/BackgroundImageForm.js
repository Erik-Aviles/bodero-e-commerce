import React, { useContext, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import { DeleteIcon, UpLoadIcon } from "../Icons";
import ButtonClose from "../buttons/ButtonClose";
import useLoading from "@/hooks/useLoading";
import { Loader } from "../snnipers/Loader";
import { withSwal } from "react-sweetalert2";
import { capitalize } from "@/utils/utils";
import axios from "axios";

const BackgroundImageForm = withSwal(
  ({
    swal,
    titulo,
    textSmall,
    companyId,
    backgroundImage,
    mutateBackgroundImage,
    toggleModal,
  }) => {
    const { isLoading, startLoading, finishtLoading } = useLoading();
    const { showNotification } = useContext(NotificationContext);
    const [isUploading, setIsUploading] = useState(false);

    const [description, setDescription] = useState(
      backgroundImage?.description || ""
    );
    const [image, setImage] = useState(backgroundImage?.image || "");
    const [publicId, setPublicId] = useState(backgroundImage?.publicId || "");

    //Agregar imagen de fondo
    async function handleSaveBackgroundImage(e) {
      e.preventDefault();

      const newdata = {
        companyId,
        description,
        publicId,
        image,
      };

      try {
        const { data } = await axios.post(
          "/api/companies/background-image-brands",
          newdata
        );

        showNotification({
          open: true,
          msj: data?.message,
          status: "success",
        });
        mutateBackgroundImage();
        setImage("");
        setDescription("");
        setPublicId("");
        toggleModal();
      } catch (error) {
        showNotification({
          open: true,
          msj:
            error.response.data.message ||
            "Ocurrió un error al guardar la imagen.",
          status: "error",
        });
      }
    }

    // Editar imagen de fondo
    async function handleEdithBackgroundImage(e) {
      e.preventDefault();

      // Validar los campos necesarios antes de hacer la solicitud
      if (!companyId || !description || !image) {
        showNotification({
          open: true,
          msj: "Todos los campos son obligatorios.",
          status: "error",
        });
        return;
      }

      const newData = {
        companyId,
        description,
        publicId,
        image,
      };

      try {
        const { data } = await axios.put(
          "/api/companies/background-image-brands",
          newData
        );

        showNotification({
          open: true,
          msj: `La imagen: ${description}, ${data?.message}`,
          status: "success",
        });
        mutateBackgroundImage();
        setImage("");
        setDescription("");
        setPublicId("");
        toggleModal();
      } catch (error) {
        showNotification({
          open: true,
          msj:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            "Ocurrió un error al actualizar la imagen.",
          status: "error",
        });
      }
    }

    // Subir imagen a CLOUDINARY
    const handleUpload = async (e) => {
      e.preventDefault();
      startLoading();
      const files = e.target?.files;
      if (files?.length > 0) {
        setIsUploading(true);
        const data = new FormData();
        data.append("file", files[0]);

        const res = await axios.post("/api/uploadcloudinary", data);
        // Actualiza stateBanner con el link de la primera imagen
        setImage(res.data?.images[0].url);
        setPublicId(res.data?.images[0].public_id);
      }
      setIsUploading(false);
      finishtLoading();
    };

    // Eliminar imagen de CLOUDINARY
    const deleteImage = async (public_id) => {
      startLoading();
      try {
        const result = await swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará la imagen de forma permanente.",
          text: `¿Realmente desea eliminar la imagen: "${
            description > 30
              ? capitalize(description).substring(0, 30) + "..."
              : capitalize(description)
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

          setImage("");
          setPublicId("");

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
          text: `No se pudo eliminar solo la imagen: ${
            description > 30
              ? capitalize(description).substring(0, 30) + "..."
              : capitalize(description)
          } completo.`,
          icon: "error",
        });
      }
    };

    return (
      <div className="relative w-full flex flex-col justify-center ">
        <header className="flex flex-row justify-between">
          <h3 className="text-md font-semibold">{titulo}</h3>
          <ButtonClose
            onClick={toggleModal}
            disabled={!image}
            className={!image ? "opacity-50 cursor-not-allowed" : ""}
          />
        </header>
        <p className="text-primary text-xs pb-3">{textSmall}</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={
            !backgroundImage
              ? handleSaveBackgroundImage
              : handleEdithBackgroundImage
          }
        >
          <div className=" flex flex-col gap-2 w-full">
            <div className="bg-grayLight flex flex-col border-container w-full">
              <label className="block my-1">Descripción (*)</label>
              <textarea
                maxLength={50}
                name="description"
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

            <div className="bg-grayLight flex flex-col border-container w-full">
              <label className="block my-1">Imagen (*)</label>
              {image && (
                <div className="relative group w-full flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md">
                  <img
                    src={image}
                    alt={`Imagen de ${description}`}
                    className="object-cover rounded-sm p-2"
                  />
                  <div className="absolute top-2 right-2 cursor-pointer opacity-0  group-hover:opacity-100 ">
                    <button type="button" onClick={() => deleteImage(publicId)}>
                      <DeleteIcon className="w-6 h-6 text-red stroke-2 bg-white rounded-full" />
                    </button>
                  </div>
                </div>
              )}
              {isUploading ? (
                <div className="w-full h-[118.83px] flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md">
                  <Loader />
                </div>
              ) : (
                !image && (
                  <label className="w-full h-[200px] flex flex-col m-0 gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md">
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
              className={`bg-secundary basis-1/2 text-white font-bold py-2 px-4 
              ${
                !image
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-secundary/60"
              }`}
              disabled={isLoading || !image}
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

export default BackgroundImageForm;
