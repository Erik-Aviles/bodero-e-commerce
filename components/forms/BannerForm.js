import React, { useContext, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import { DeleteIcon, UpLoadIcon } from "../Icons";
import ButtonClose from "../buttons/ButtonClose";
import useLoading from "@/hooks/useLoading";
import { Loader } from "../snnipers/Loader";
import { withSwal } from "react-sweetalert2";
import { capitalize } from "@/utils/utils";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const BannerForm = withSwal(
  ({
    swal,
    banner,
    titulo,
    textSmall,
    toggleModal,
    companyId,
    mutateBanner,
  }) => {
    const { isLoading, startLoading, finishtLoading } = useLoading();
    const { showNotification } = useContext(NotificationContext);
    const [isUploading, setIsUploading] = useState(false);

    const [stateBanner, setStateBanner] = useState({
      bannerId: banner?.bannerId || "",
      description: banner?.description || "",
      image: banner?.image || "",
      public_id: banner?.public_id || "",
    });

    //Agregar banner
    async function handleSaveBanner(e) {
      e.preventDefault();

      const bannerData = {
        companyId,
        stateBanner: {
          ...stateBanner,
          bannerId: uuidv4(), 
        },
      };

      try {
        const { data } = await axios.post("/api/companies/banners", bannerData);

        showNotification({
          open: true,
          msj: data?.message,
          status: "success",
        });
        mutateBanner();
        setStateBanner({ image: "", public_id: "", description: "" });
        toggleModal();
      } catch (error) {
        showNotification({
          open: true,
          msj:
            error.response.data.message ||
            "Ocurrió un error al guardar el banner.",
          status: "error",
        });
      }
    }

    // Editar banner
    async function handleEdithBanner(e) {
      e.preventDefault();
      const bannerData = {
        companyId,
        stateBanner,
        bannerId: banner.bannerId,
      };

      try {
        const { data } = await axios.put("/api/companies/banners", bannerData);

        showNotification({
          open: true,
          msj: `Banner: ${stateBanner.description}, ${data?.message}`,
          status: "success",
        });
        mutateBanner();
        setStateBanner({
          image: "",
          public_id: "",
          description: "",
          bannerId: "",
        });
        toggleModal();
      } catch (error) {
        showNotification({
          open: true,
          msj:
            error.response.data.message ||
            "Ocurrió un error al actualizar el banner.",
          status: "error",
        });
      }
    }

    const handleBannerChange = (e) => {
      const { name, value } = e.target;
      setStateBanner((prevBanner) => ({
        ...prevBanner,
        [name]: value,
      }));
    };

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
        setStateBanner((prevState) => ({
          ...prevState,
          image: res.data?.images[0].url, // URL de la imagen
          public_id: res.data?.images[0].public_id, // Public ID para eliminarla
        }));
      }

      setIsUploading(false);
      finishtLoading();
    };

    // Eliminar imagen de CLOUDINARY
    const deleteImage = async (public_id) => {
      try {
        const result = await swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará la imagen de forma permanente.",
          text: `¿Realmente desea eliminar la imagen: "${
            stateBanner?.description > 30
              ? capitalize(stateBanner?.description).substring(0, 30) + "..."
              : capitalize(stateBanner?.description)
          }" de la base de datos? Esta acción no se puede deshacer.`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#fe0000",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
          const response = await axios.delete("/api/deleteImageCloudinary", {
            data: { public_id },
          });

          setStateBanner((prevState) => ({
            ...prevState,
            image: "",
            public_id: "",
          }));

          swal.fire({
            title: "Eliminado!",
            text: response.data.message,
            icon: "success",
          });
        }
      } catch (error) {
        console.error(`Error eliminando la imagen: ${public_id}. `, error);
        swal.fire({
          title: "Error",
          text: `No se pudo eliminar solo la imagen. Debe eliminar el Banner: ${
            stateBanner?.description > 30
              ? capitalize(stateBanner?.description).substring(0, 30) + "..."
              : capitalize(stateBanner?.description)
          } completo.`,
          icon: "error",
        });
      }
    };

    return (
      <div className="relative w-full flex flex-col justify-center ">
        <header className="flex flex-row justify-between">
          <h3 className="text-lg font-semibold">{titulo}</h3>
          <ButtonClose onClick={toggleModal} />
        </header>
        <p className="text-primary text-xs pb-3">{textSmall}</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={!banner ? handleSaveBanner : handleEdithBanner}
        >
          <div className=" flex flex-col gap-2 w-full">
            <div className="bg-grayLight flex flex-col border-container w-full">
              <label className="block my-1">Descripción</label>
              <textarea
                maxLength={50}
                name="description"
                placeholder="Escribir breve descripción"
                value={stateBanner?.description}
                className="min-h-[55px]"
                onChange={handleBannerChange}
              />
              {stateBanner?.description.length === 50 ? (
                <span className="pt-1 text-success text-[10px] ">
                  A llegado al limite de caracteres.
                </span>
              ) : (
                <span></span>
              )}
            </div>

            <div className="bg-grayLight flex flex-col border-container w-full">
              <label className="block my-1">Imagen (*)</label>
              {stateBanner?.image && (
                <div className="relative group w-full h-[118.83px] flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md">
                  <img
                    name="image"
                    src={stateBanner?.image}
                    alt={`Imagen de ${stateBanner?.description}`}
                    className="rounded-sm p-2"
                  />
                  <div className="absolute top-2 right-2 cursor-pointer opacity-0  group-hover:opacity-100 ">
                    <button
                      type="button"
                      onClick={() => deleteImage(stateBanner?.public_id)}
                    >
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
                !stateBanner?.image && (
                  <label className="w-full h-[118.83px] flex flex-col m-0 gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md">
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
            >
              Cerrar
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

export default BannerForm;
