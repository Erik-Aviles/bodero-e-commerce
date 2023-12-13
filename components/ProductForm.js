import React, { useEffect, useState } from "react";
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
  images: exitingImages,
  category: assignedCategory,
  quantity: existingQuantity,
  description: existingDescription,
  properties: assignedProperties,
}) => {
  const [name, setName] = useState(existingName || "");
  const [code, setCode] = useState(existingCode || "");
  const [price, setPrice] = useState(exitingPrice || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [images, setImages] = useState(exitingImages || []);
  const [quantity, setQuantity] = useState(existingQuantity || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [categories, setCategories] = useState([]);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUpLoanding, setIsUpLoanding] = useState(false);

  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  async function saveProduct(e) {
    e.preventDefault();
    const data = {
      name,
      code,
      price,
      category,
      quantity,
      images,
      description,
      properties: productProperties,
    };
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

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo?.properties);
    while (catInfo?.parent?._id) {
      const parenCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parenCat.properties);
      catInfo = parenCat;
    }
  }

  return (
    <form onSubmit={saveProduct} className="grid sm:grid-cols-2">
      <div className="col-span-1 sm:py-4 sm:pr-4">
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
        <label>Categoria</label>
        <select
          className=""
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Sin categoria principal</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p, index) => (
            <div className="flex items-center gap-2">
              <label key={index + p.name} className="mb-2">
                {p.name[0].toUpperCase() + p.name.substring(1)}
              </label>
              <div className="w-full">
                <select
                  className="w-full"
                  value={productProperties[p.name]}
                  onChange={(e) => setProductProp(p.name, e.target.value)}
                >
                  {p.values.map((v, index) => (
                    <option key={index} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
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
      <div className="col-span-1 sm:p-4 flex flex-col ">
        <label>Imagen(es)</label>
        <div className="h-full mb-[12px] border-2 border-secundary rounded-sm flex justify-center items-center flex-wrap gap-3 p-2 ">
          <ReactSortable
            list={images}
            className="flex flex-wrap gap-1"
            setList={updateImagesOrder}
          >
            {!!images?.length &&
              images.map((link) => (
                <div
                  key={link}
                  className="w-24 h-24 flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md"
                >
                  <img src={link} alt="imagen" className="rounded-lg" />
                </div>
              ))}
          </ReactSortable>
          {isUpLoanding ? (
            <div className="w-24 h-24 text-center flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md">
              <Spinner />
            </div>
          ) : (
            <label className="w-24 h-24 text-center flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md">
              <UpLoadIcon />
              <span>Cargar imagen</span>
              <input onChange={upLoadImages} type="file" className="hidden" />
            </label>
          )}
        </div>
      </div>
      <div className="flex justify-around">
        <button
          type="button"
          className="btn-delete  mx-1"
          onClick={() => {
            setGoToProducts(true);
          }}
        >
          Cancelar
        </button>
        <button type="submit" className="btn-primary mx-1">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
