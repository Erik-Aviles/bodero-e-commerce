import React, { useCallback, useContext, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import { DeleteIcon, UpLoadIcon } from "../Icons";
import Spinner from "../Spinner";
import { Input } from "@nextui-org/react";
import ButtonClose from "../buttons/ButtonClose";
import useAuthFetch from "@/hooks/useAuthFetch";
import useCategories from "@/hooks/useCategories";
import axios from "axios";
import { capitalize } from "@/utils/utils";

const CategoryForm = ({ category, titulo, textSmall, toggleModal }) => {
  const { getCategories } = useCategories();
  const { showNotification } = useContext(NotificationContext);
  const authRouter = useAuthFetch();

  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [image, setImage] = useState(category?.image || []);
  const [isUploading, setIsUploading] = useState(false);

  async function saveCategory(e) {
    e.preventDefault();
    const data = {
      name: name.toLowerCase(),
      description,
      image,
    };
    await authRouter({
      endpoint: "categories/full",
      formData: data,
    });
    getCategories();
    setImage("");
    setDescription("");
    setName("");
    toggleModal();
  }

  async function edithCategory(e) {
    e.preventDefault();
    let data = {
      name: name.toLowerCase(),
      description,
      image,
    };
    const _id = category._id;
    if (_id) {
      try {
        await axios.put("/api/categories/full", { ...data, _id });
        showNotification({
          open: true,
          msj: `Categoria: ${capitalize(data.name)}, modificada con exito!`,
          status: "success",
        });
        getCategories();
        setImage("");
        setDescription("");
        setName("");
        toggleModal();
      } catch (error) {
        console.log(error);
        showNotification({
          open: true,
          msj: error.response.data.message,
          status: "error",
        });
      }
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/uploadcloudinary", data);
      setImage((oldImages) => {
        return [...oldImages, ...res.data?.links];
      });
    }

    setIsUploading(false);
  };

  function handeDeleteImage(index) {
    const updateImages = [...image];
    updateImages.splice(index, 1);
    setImage(updateImages);
    showNotification({
      open: true,
      msj: "Imagen eliminada con exito!",
      status: "success",
    });
  }

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
            {!!image?.length &&
              image.map((link, index) => (
                <div
                  key={link}
                  className="relative group w-24 h-24 flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md"
                >
                  <img
                    src={link}
                    alt={`Imagen de ${name}`}
                    className="rounded-md object-contain h-32 w-44 p-2"
                  />
                  <div className="absolute top-2 right-2 cursor-pointer opacity-0  group-hover:opacity-100 ">
                    <button
                      type="button"
                      onClick={() => handeDeleteImage(index)}
                    >
                      <DeleteIcon className="w-6 h-6 text-red stroke-2 bg-white rounded-full" />
                    </button>
                  </div>
                </div>
              ))}
            {isUploading ? (
              <div className="w-24 h-24 flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md">
                <Spinner />
              </div>
            ) : (
              <label className="w-24 h-24 flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md">
                <UpLoadIcon />
                <span>Subir imagen</span>
                <input type="file" onChange={handleUpload} className="hidden" />
              </label>
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
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
