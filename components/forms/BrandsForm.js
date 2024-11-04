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
import { Input } from "@nextui-org/react";

const BrandsForm = withSwal(
  ({ swal, brand, titulo, textSmall, toggleModal, companyId, mutateBrand }) => {
    const { isLoading, startLoading, finishtLoading } = useLoading();
    const { showNotification } = useContext(NotificationContext);
    const [isUploading, setIsUploading] = useState(false);

    const [stateBrand, setStateBrand] = useState({
      brandId: brand?.brandId || "",
      name: brand?.name || "",
      image: brand?.image || "",
      public_id: brand?.public_id || "",
    });

    //Agregar brand
    async function handleSaveBrand(e) {
      e.preventDefault();

      const brandData = {
        companyId,
        stateBrand: {
          ...stateBrand,
          brandId: uuidv4(),
        },
      };

      try {
        const { data } = await axios.post("/api/companies/brands", brandData);

        showNotification({
          open: true,
          msj: data?.message,
          status: "success",
        });
        mutateBrand();
        setStateBrand({ image: "", public_id: "", name: "" });
        toggleModal();
      } catch (error) {
        showNotification({
          open: true,
          msj:
            error.response.data.message ||
            "Ocurrió un error al guardar la Marca.",
          status: "error",
        });
      }
    }

    // Editar brand
    async function handleEdithBrand(e) {
      e.preventDefault();
      const brandData = {
        companyId,
        stateBrand,
        brandId: brand.brandId,
      };

      try {
        const { data } = await axios.put("/api/companies/brands", brandData);

        showNotification({
          open: true,
          msj: `Marca: ${stateBrand.name}, ${data?.message}`,
          status: "success",
        });
        mutateBrand();
        setStateBrand({
          image: "",
          public_id: "",
          name: "",
          brandId: "",
        });
        toggleModal();
      } catch (error) {
        showNotification({
          open: true,
          msj:
            error.response.data.message ||
            "Ocurrió un error al actualizar la Marca.",
          status: "error",
        });
      }
    }

    const handleBrandChange = (e) => {
      const { name, value } = e.target;
      setStateBrand((prevBrand) => ({
        ...prevBrand,
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

        // Actualiza stateBrand con el link de la primera imagen
        setStateBrand((prevState) => ({
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
      startLoading();
      try {
        const result = await swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará la imagen de forma permanente.",
          text: `¿Realmente desea eliminar la imagen: "${
            stateBrand?.name > 30
              ? capitalize(stateBrand?.name).substring(0, 30) + "..."
              : capitalize(stateBrand?.name)
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

          setStateBrand((prevState) => ({
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
        setIsUploading(false);
        finishtLoading();
      } catch (error) {
        console.error(`Error eliminando la imagen: ${public_id}. `, error);
        swal.fire({
          title: "Error",
          text: `No se pudo eliminar solo la imagen. Debe eliminar la Marca: ${
            stateBrand?.name > 30
              ? capitalize(stateBrand?.name).substring(0, 30) + "..."
              : capitalize(stateBrand?.name)
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
          onSubmit={!brand ? handleSaveBrand : handleEdithBrand}
        >
          <div className=" flex flex-col gap-2 w-full">
            <div className="bg-grayLight flex flex-col border-container w-full">
              <label className="block my-1">Nombre (*)</label>
              <Input
                isClearable
                type="text"
                name="name"
                value={stateBrand.name}
                isRequired={true}
                placeholder="Escribir nombre"
                labelPlacement="outside"
                onClear={() => onClear()}
                onChange={handleBrandChange}
              />
            </div>

            <div className="bg-grayLight flex flex-col border-container w-full">
              <label className="block my-1">Imagen (*)</label>
              {stateBrand?.image && (
                <div className="relative group w-full h-[118.83px] flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md">
                  <img
                    src={stateBrand?.image}
                    alt={`Imagen de ${stateBrand?.name}`}
                    className="rounded-sm p-2"
                  />
                  <div className="absolute top-2 right-2 cursor-pointer opacity-0  group-hover:opacity-100 ">
                    <button
                      type="button"
                      onClick={() => deleteImage(stateBrand?.public_id)}
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
                !stateBrand?.image && (
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

export default BrandsForm;
