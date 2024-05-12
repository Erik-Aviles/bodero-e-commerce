import { useCallback, useContext, useState } from "react";
import { DeleteIcon, PlusIcon, SearchIcon, UpLoadIcon } from "./Icons";
import { Button, Input, Textarea } from "@nextui-org/react";
import useAuthFetch from "@/hooks/useAuthFetch";
import Spinner from "./Spinner";
import axios from "axios";
import NotificationContext from "@/context/NotificationContext";
import Image from "next/image";
import localLoader from "@/utils/localLoader";

const ModalCategories = ({ fetchCategories }) => {
  const { showNotification } = useContext(NotificationContext);
  const authRouter = useAuthFetch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // console.log(data);

  async function saveCategory(e) {
    e.preventDefault();
    const data = {
      name: name.toLowerCase(),
      description,
      image,
    };
    await authRouter({
      endpoint: "categories",
      formData: data,
    });
    setName("");
    setDescription("");
    setImage([]);
    fetchCategories();
  }

  const handeDeleteImage = async (index) => {
    const updateImages = image[index];
    try {
      const data = await axios.delete(
        `/api/uploadcat?url=${encodeURIComponent(updateImages)}`
      );
      const updatedImages = image.filter((img, idx) => idx !== index);
      setImage(updatedImages);
      console.log(data);

      showNotification({
        open: true,
        msj: data.message,
        status: "success",
      });
    } catch (error) {
      showNotification({
        open: true,
        msj: "Ha ocurrido un error",
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

  const toggleModal = () => {
    setName("");
    setDescription("");
    setImage([]);
    setShowModal(!showModal);
  };
  const onClear = useCallback(() => {
    setName("");
  }, []);

  return (
    <div>
      <div className="flex justify-end">
        <section className="w-fit">
          <Button
            onClick={toggleModal}
            color="primary"
            startContent={<PlusIcon />}
          >
            Categoria
          </Button>
        </section>
        {showModal && (
          <>
            <div
              onClick={toggleModal}
              className="fixed inset-0 z-10 bg-gray-500 bg-opacity-50"
            ></div>
            <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
              <div className="bg-white rounded shadow-md">
                <div className="relative p-6 w-72 sm:w-[500px]">
                  <h3 className="text-lg font-semibold">
                    REGISTRO DE CATEGORIAS
                  </h3>
                  <label className="pb-3">Agregar nueva categoria</label>
                  <form className="flex flex-col gap-2" onSubmit={saveCategory}>
                    <div className="flex flex-col gap-2 w-full ">
                      <div className="border-container w-full ">
                        <Input
                          isClearable
                          type="text"
                          value={name}
                          placeholder="Escribir nombre"
                          labelPlacement="outside"
                          onClear={() => onClear()}
                          onChange={(e) =>
                            setName(e.target.value.toLowerCase())
                          }
                        />
                      </div>
                      <div className="flex flex-col border-container w-full">
                        <textarea
                          rows={3}
                          maxLength={50}
                          placeholder="Escribir descripción"
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

                      <div className="border-container flex justify-center items-center gap-3 ">
                        {image.length > 0 &&
                          image?.map((imageUrl, index) => (
                            <div
                              key={index}
                              className="relative group w-24 h-24 flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md"
                            >
                              <img
                                src={imageUrl}
                                alt={`Imagen de ${name}`}
                                className="rounded-md object-contain h-32 w-44 p-2"
                              />

                              {/*  <Image
                                src={imageUrl}
                                alt={`Imagen de ${name}`}
                                title={`Imagen de ${name}`}
                                width={80}
                                height={80}
                                className="rounded-md object-contain h-32 w-44 p-2"
                              /> */}
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
                            <span>Cargar imagen</span>
                            <input
                              type="file"
                              multiple
                              onChange={handleUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 mb-1">
                      <button
                        onClick={toggleModal}
                        className="bg-error basis-1/2 hover:bg-error/60 text-white font-bold py-2 px-4"
                      >
                        Cerrar
                      </button>
                      <button
                        type="submit"
                        className="btn-primary py-1 xs:w-40 basis-1/2"
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                </div>
                <div className="p-4 bg-gray-100 flex justify-end"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalCategories;
