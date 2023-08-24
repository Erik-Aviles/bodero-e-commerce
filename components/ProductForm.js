import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UpLoadIcon } from "./Icons";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  _id,
  name: existingName,
  code: existingCode,
  price: exitingPrice,
  quantity: existingQuantity,
  images: exitingImages,
  description: existingDescription,
}) => {
  const [name, setName] = useState(existingName || "");
  const [code, setCode] = useState(existingCode || "");
  const [price, setPrice] = useState(exitingPrice || "");
  const [quantity, setQuantity] = useState(existingQuantity || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [images, setImages] = useState(exitingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUpLoanding, setIsUpLoanding] = useState(false);

  const router = useRouter();

  async function saveProduct(e) {
    e.preventDefault();
    const data = { name, code, price, quantity, images, description };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }

  async function upLoadImages(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUpLoanding(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data?.links];
      });
    }
    setIsUpLoanding(false);
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  return (
    <form onSubmit={saveProduct} className="grid grid-cols-2">
      <div className="col-span-1 p-4">
        <label>Articulos</label>
        <input
          type="text"
          placeholder="Ej: Tuerca"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Codigo</label>
        <input
          type="text"
          placeholder="Ej: G8087"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <label>Precio (en USD)</label>
        <input
          type="number"
          placeholder="Ej: 1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Cantidad</label>
        <input
          type="number"
          placeholder="Ej: 1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <label>Descripcion</label>
        <textarea
          placeholder="Ej: Con hilos aislado"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="col-span-1 p-4 flex flex-col ">
        <label>Imagen(es)</label>
        <div className="h-full mb-[12px] border-2 rounded-lg flex justify-center items-center flex-wrap gap-3 ">
          <ReactSortable
            list={images}
            className="flex flex-wrap gap-1"
            setList={updateImagesOrder}
          >
            {!!images?.length &&
              images.map((link) => (
                <div key={link} className="h-24">
                  <img src={link} alt="imagen" className="rounded-lg" />
                </div>
              ))}
          </ReactSortable>
          {isUpLoanding ? (
            <div className="w-24 h-24 bg-gray-100 flex rounded-lg items-center justify-center ">
              <Spinner />
            </div>
          ) : (
            <label className="w-24 h-24 flex flex-col gap-2 justify-center items-center cursor-pointer text-xs text-gray-500 rounded-lg bg-gray-100 ">
              <UpLoadIcon />
              <span>Cargar imagen</span>
              <input onChange={upLoadImages} type="file" className="hidden" />
            </label>
          )}
        </div>
      </div>

      <button type="submit" className="btn-primary">
        Guardar
      </button>
    </form>
  );
};

export default ProductForm;
