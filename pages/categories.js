import React, { useContext, useEffect, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import Head from "next/head";
import axios from "axios";
import { Input } from "@nextui-org/react";
import TableCategory from "@/components/TableCategory";
import { capitalize } from "@/utils/utils";
import { DeleteIcon, UpLoadIcon } from "@/components/Icons";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";

function Categories({ swal }) {
  const { showNotification } = useContext(NotificationContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  async function fetchCategories() {
    await axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }

  async function EditCategory(e) {
    e.preventDefault();
    const data = {
      name: name.toLowerCase(),
      description,
      image,
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      showNotification({
        open: true,
        msj: `Categoria:
        ${capitalize(data?.name)}, modificada con exito!`,
        status: "success",
      });
      setEditedCategory(null);
    }
    setName("");
    setDescription("");
    setImage([]);
    fetchCategories();
  }

  function editCategory(value) {
    setEditedCategory(value);
    setName(value?.name);
    setDescription(value?.description);
    setImage(value?.image);
  }

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

  function updateImagesOrder(image) {
    setImage(image);
  }

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
          await axios.delete("/api/categories?_id=" + _id);
          showNotification({
            open: true,
            msj: `Categoria:
              ${capitalize(value?.name)}, eliminada con exito!`,
            status: "success",
          });

          fetchCategories();
        }
      });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Head>
        <title>Panel | Categoria</title>
        <meta
          name="description"
          content="Variedad de productos, estan seccionados por categorias"
        />
      </Head>
      <Layout>
        <div className="h-full flex flex-col gap-3">
          <div className="h-fit max-w-screen-xl pb-4 ">
            <div className="sm:flex sm:items-center sm:justify-between sm:gap-4">
              <h3>Panel de categoria</h3>
            </div>
          </div>
          {editedCategory && (
            <div className="flex items-center justify-center">
              <div className="bg-white p-6 w-72 sm:w-[500px] rounded shadow-md">
                <label className="pb-3">
                  {`Editar categoria "${editedCategory.name}"`}
                </label>
                <form className="lex flex-col gap-2" onSubmit={EditCategory}>
                  <div className="flex flex-col gap-2 w-full ">
                    <div className="border-container w-full">
                      <Input
                        type="text"
                        value={name}
                        placeholder="Escribir nombre"
                        labelPlacement="outside"
                        onChange={(e) => setName(e.target.value)}
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
                      {description?.length === 50 ? (
                        <span className="pt-1 text-success text-[10px] ">
                          A llegado al limite de caracteres.
                        </span>
                      ) : (
                        <span></span>
                      )}
                    </div>

                    <div className="border-container flex justify-center items-center gap-3">
                      <ReactSortable
                        // list={images}
                        list={Array.isArray(image) ? image : []}
                        className="flex flex-wrap gap-1"
                        setList={updateImagesOrder}
                      >
                        {image?.length > 0 &&
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
                      </ReactSortable>
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
                    <div className="flex gap-1 mb-1">
                      <button
                        type="button"
                        className="bg-error basis-1/2 hover:bg-error/60 text-white font-bold py-2 px-4"
                        onClick={() => {
                          setEditedCategory(null);
                          setName("");
                          setDescription("");
                          setImage("");
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="btn-primary py-1 xs:w-40 basis-1/2"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          {!editedCategory && (
            <section className="">
              <div className=" mx-auto max-w-[600px] ">
                <TableCategory
                  fetchCategories={fetchCategories}
                  deleteCaterory={deleteCaterory}
                  editCategory={editCategory}
                  categories={categories}
                />
              </div>
            </section>
          )}
        </div>
      </Layout>
    </>
  );
}
export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
