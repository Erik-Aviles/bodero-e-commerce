import React, { useEffect, useState } from "react";
import axios from "axios";
import { UpLoadIcon } from "./Icons";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

const CategoryForm = ({
  _id,
  name,
  images,
  parent,
  description,
  setParentCategory,
  categories,
}) => {
  const [isUpLoanding, setIsUpLoanding] = useState(false);

  async function saveCategory(e) {
    e.preventDefault();
    const data = { name, parent, images, description };
    if (editedCategory) {
      await axios.put("/api/categories", data);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setDescription("");
    setParentCategory("");
    setImages([]);
    fetchCategories();
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
    <form onSubmit={saveCategory} className="flex flex-col gap-3">
      <div className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder="Escribir nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="mb-0"
          value={parent}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value="">Sin categoria principal</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id}>{category?.name}</option>
            ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-1 h-48">
        <div className="col-span-1 flex flex-col">
          <label>Descripcion</label>
          <textarea
            placeholder="Ej: Con hilos aislado"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-full mb-0"
          ></textarea>
        </div>
        <div className="col-span-1 flex flex-col">
          <label>Imagen(es)</label>
          <div className="h-full border-2 rounded-lg flex justify-center items-center flex-wrap gap-3 ">
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
      </div>
      <button type="submit" className="btn-primary mb-4">
        Guardar
      </button>
    </form>
  );
};

export default CategoryForm;
