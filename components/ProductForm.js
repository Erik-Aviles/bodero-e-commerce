import React, { useContext, useEffect, useState } from "react";
import { profitabilityToChoose, taxToChoose } from "@/resources/data";
import NotificationContext from "@/context/NotificationContext";
import { ReactSortable } from "react-sortablejs";
import { DeleteIcon, UpLoadIcon } from "./Icons";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import axios from "axios";
import { Input } from "@nextui-org/react";
import { capitalize } from "@/utils/utils";
import Image from "next/image";

const ProductForm = ({
  _id,
  title: existingTitle,
  code: existingCode,
  codeEnterprise: existingCodeEnterprise,
  codeWeb: existingCodeWeb,
  price: exitingPrice,
  tax: assignedTax,
  profitability: assignedProfitability,
  netPrice: exitingNetPrice,
  salePrice: exitingSalePrice,
  offerPrice: exitingOfferPrice,
  profit: exitingProfit,
  brand: exitingBrand,
  category: assignedCategory,
  color: exitingColor,
  size: exitingSize,
  quantity: existingQuantity,
  location: existingLocation,
  compatibility: existingCompatibility,
  description: existingDescription,
  descriptionAdditional: existingDescriptionAdditional,
  images: exitingImages,
}) => {
  const { showNotification } = useContext(NotificationContext);
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [code, setCode] = useState(existingCode || "");
  const [codeEnterprise, setCodeEnterprise] = useState(
    existingCodeEnterprise || ""
  );
  const [codeWeb, setCodeWeb] = useState(existingCodeWeb || "");
  const [price, setPrice] = useState(exitingPrice || "");
  const [tax, setTax] = useState(assignedTax || 0);
  const [profitability, setProfitability] = useState(
    assignedProfitability || 0
  );
  const [netPrice, setNetPrice] = useState(exitingNetPrice || "");
  const [salePrice, setSalePrice] = useState(exitingSalePrice || "");
  const [offerPrice, setOfferPrice] = useState(exitingOfferPrice || "");
  const [profit, setProfit] = useState(exitingProfit || 0);
  const [brand, setBrand] = useState(exitingBrand || "");
  const [category, setCategory] = useState(assignedCategory || "");

  const [quantity, setQuantity] = useState(existingQuantity || "");
  const [location, setLocation] = useState(existingLocation || "");
  const [compatibility, setCompatibility] = useState(
    existingCompatibility || []
  );
  const [description, setDescription] = useState(existingDescription || "");
  const [descriptionAdditional, setDescriptionAdditional] = useState(
    existingDescriptionAdditional || ""
  );
  const [images, setImages] = useState(exitingImages || []);

  const [color, setColor] = useState(exitingColor || []);
  const [size, setSize] = useState(exitingSize || []);

  const [categories, setCategories] = useState([]);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUpLoanding, setIsUpLoanding] = useState(false);

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    if (!price) {
      setTax(0);
      setProfitability(0);
      setSalePrice(0);
    }
  }, [price]);

  useEffect(() => {
    calcularPrecioVenta(netPrice, profitability);
  }, [tax, price]);

  useEffect(() => {
    calcularProfit(salePrice, netPrice);
  }, [salePrice]);

  async function saveProduct(e) {
    e.preventDefault();
    let data = {
      title: title.toLowerCase(),
      code,
      codeEnterprise,
      codeWeb,
      price,
      tax,
      profitability,
      netPrice,
      salePrice,
      profit,
      offerPrice,
      brand,
      category,
      color,
      size,
      quantity,
      location,
      compatibility,
      description,
      descriptionAdditional,
      images,
    };
    if (_id) {
      try {
        await axios.put("/api/products", { ...data, _id });
        showNotification({
          open: true,
          msj: `"${capitalize(data.title)}", editado con exito!`,
          status: "success",
        });

        setGoToProducts(true);
      } catch (error) {
        showNotification({
          open: true,
          msj: error.response.data.message,
          status: "error",
        });
      }
    } else {
      try {
        const res = await axios.post("/api/products", data);
        showNotification({
          open: true,
          msj: res.data.message,
          status: "success",
        });
        setTitle("");
        setCode("");
        setCodeEnterprise("");
        setCodeWeb("");
        setPrice("");
        setTax(0);
        setProfitability(0);
        setNetPrice("");
        setSalePrice("");
        setProfit("");
        setBrand("");
        setCategory("");
        setQuantity("");
        setLocation("");
        setCompatibility([]);
        setDescription("");
        setDescriptionAdditional("");
        setImages([]);
        setColor("");
        setSize("");
      } catch (error) {
        showNotification({
          open: true,
          msj: error.response.data.message,
          status: "error",
        });
      }
    }
  }

  function addCompatibility() {
    setCompatibility((prev) => {
      return [...prev, { title: "", model: "" }];
    });
  }

  function handleCompatibilityTitleChange(index, compatibility, newTitle) {
    setCompatibility((prev) => {
      const compatibility = [...prev];
      compatibility[index].title = newTitle;
      return compatibility;
    });
  }

  function handleCompatibilityModelChange(index, compatibility, newModel) {
    setCompatibility((prev) => {
      const compatibility = [...prev];
      compatibility[index].model = newModel;
      return compatibility;
    });
  }
  function removerCompatibility(indexRemove) {
    setCompatibility((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexRemove;
      });
    });
  }
  if (goToProducts) {
    router.push("/products");
    return null;
  }

  function handleColorChange(event) {
    setColor(event.target.value);
  }

  function handleSizeChange(event) {
    setSize(event.target.value);
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

  function handeDeleteImage(index) {
    const updateImages = [...images];
    updateImages.splice(index, 1);
    setImages(updateImages);
    showNotification({
      open: true,
      msj: "Imagen eliminada con exito!",
      status: "success",
    });
  }

  const handlePrecioChange = (event) => {
    const nuevoPrice = parseFloat(event.target.value);
    setPrice(nuevoPrice);
    calcularPrecioNeto(nuevoPrice, tax);
  };

  const handlePorcentajeChange = (event) => {
    const nuevoPorcentaje = parseInt(event.target.value);
    setTax(nuevoPorcentaje);
    calcularPrecioNeto(price, nuevoPorcentaje);
  };

  const handleProfitabilityChange = (event) => {
    const newProfitability = parseInt(event.target.value);
    setProfitability(newProfitability);
    calcularPrecioVenta(netPrice, newProfitability);
  };

  function calcularPorcentaje(valor, porc) {
    if (valor && porc) {
      const resultado = (valor * porc) / 100;
      return resultado;
    }
  }

  const calcularPrecioNeto = (price, tax) => {
    if (tax === 0) {
      setNetPrice(price);
    } else {
      const precioFloat = parseFloat(price);
      const calcTax = parseFloat(calcularPorcentaje(precioFloat, tax));
      const precioNeto = precioFloat + calcTax;
      setNetPrice(precioNeto.toFixed(2));
    }
  };

  const calcularPrecioVenta = (netPrice, profitability) => {
    if (profitability === 0) {
      setSalePrice(netPrice);
    } else {
      const newPrice = parseFloat(netPrice);
      const calcSalePrice = newPrice * (100 / (100 - profitability));
      setSalePrice(calcSalePrice.toFixed(2));
    }
  };

  const calcularProfit = (salePrice, netPrice) => {
    if (salePrice === 0) {
      setProfit("");
    } else {
      const newSalePrice = parseFloat(salePrice);
      const newNetPrice = parseFloat(netPrice);
      const calcProfit = newSalePrice - newNetPrice;
      setProfit(calcProfit.toFixed(2));
    }
  };

  return (
    <div className="relative w-full flex justify-center ">
      <form
        onSubmit={saveProduct}
        className="w-fit lg:grid lg:gap-6 lg:grid-cols-2 border-container "
      >
        <div className="col-span-1 flex flex-col gap-3 max-w-sm">
          <p className="text-sm text-red/60">
            Los campos con (*) son obligatorios.
            <br />
          </p>
          <div>
            <label className="my-1 block">Nombre (*)</label>
            <Input
              type="text"
              value={title}
              placeholder="Nombre"
              labelPlacement="outside"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="xs:flex sm:gap-2 ">
            <div className="basis-3/5 mr-1 sm:mr-0">
              <label className="my-1 block">Marca (*)</label>
              <Input
                type="text"
                value={brand}
                placeholder="Marca"
                labelPlacement="outside"
                className="mb-3.5 xs:mb-0"
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="basis-2/5 ">
              <label className="my-1 block">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option key={"sincategory"} value="">
                  Sin categoria
                </option>
                {categories.length > 0 &&
                  categories.map((category, index) => (
                    <option key={category._id} value={category._id}>
                      {category?.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="xs:flex sm:gap-2 ">
            <div className="basis-3/5 mr-1 sm:mr-0">
              <label className="my-1 block">Ubicación</label>
              <Input
                type="text"
                value={location}
                placeholder="Ubicación"
                labelPlacement="outside"
                className="mb-3.5 xs:mb-0"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="basis-2/5">
              <label className="my-1 block">Cantidad</label>
              <Input
                type="number"
                value={quantity}
                placeholder="Cantidad"
                labelPlacement="outside"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>
          <div className="xs:flex sm:gap-2 ">
            <div className="basis-1/2 mr-1 sm:mr-0">
              <label className="my-1 block">Tamaño/s</label>
              <Input
                type="text"
                value={size}
                placeholder="Valores separados por (,)"
                labelPlacement="outside"
                className="mb-3.5 xs:mb-0"
                onChange={handleSizeChange}
              />
            </div>
            <div className="basis-1/2">
              <label className="my-1  block">Color/es</label>
              <Input
                type="text"
                value={color}
                placeholder="Valores separados por (,)"
                labelPlacement="outside"
                onChange={handleColorChange}
              />
            </div>
          </div>

          <div className="border-container ">
            <button
              type="button"
              className="btn-default text-sm mb-2"
              onClick={addCompatibility}
            >
              Agregar compatibilidad
            </button>
            {compatibility.length > 0 &&
              compatibility.map((item, index) => (
                <div key={index + "1"} className="flex pb-3">
                  <div className="flex flex-col sm:basis-[95%] gap-1 w-full  ">
                    <Input
                      type="text"
                      value={item.title}
                      placeholder="Nombre"
                      labelPlacement="outside"
                      onChange={(e) =>
                        handleCompatibilityTitleChange(
                          index,
                          item,
                          e.target.value
                        )
                      }
                    />
                    <Input
                      type="text"
                      value={item.model}
                      placeholder="Modelos, separados por (,)"
                      labelPlacement="outside"
                      onChange={(e) =>
                        handleCompatibilityModelChange(
                          index,
                          item,
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <button
                    type="button"
                    className=" text-white rounded-sm px-2 btn-delete sm:basis-[5%] "
                    onClick={() => removerCompatibility(index)}
                  >
                    <DeleteIcon className=" w-5 h-5 m-auto" />
                  </button>
                </div>
              ))}
          </div>

          <div className="flex flex-col gap-3 border-container mt-4">
            <p className="hidden md:block text-center text-secondary">
              {"CÓDIGOS "}
            </p>
            <Input
              type="text"
              value={code}
              label="Código"
              placeholder="Código principal (*)"
              labelPlacement="outside"
              onChange={(e) => setCode(e.target.value)}
            />
            <Input
              type="text"
              value={codeWeb}
              label="Código web"
              placeholder="Código"
              labelPlacement="outside"
              onChange={(e) => setCodeWeb(e.target.value)}
            />
            <Input
              type="text"
              value={codeEnterprise}
              label="Código empresa"
              placeholder="Código"
              labelPlacement="outside"
              onChange={(e) => setCodeEnterprise(e.target.value)}
            />
          </div>
        </div>

        <div className="col-span-1 max-w-sm flex flex-col">
          <div className="flex flex-col gap-3 border-container mt-2">
            <p className="hidden md:block text-center text-secondary">
              {"CÁLCULO DE VALORES"}
            </p>
            <div className="flex sm:gap-2 ">
              <div className="basis-2/6 mr-1 sm:mr-0">
                <label className="my-1 block">P. Costo (*)</label>
                <Input
                  type="number"
                  labelPlacement="outside"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  value={price}
                  onChange={handlePrecioChange}
                  placeholder="0.00"
                />
              </div>
              <div className="basis-2/6 mr-1 sm:mr-0">
                <label className="my-1 block">IVA</label>
                <select
                  id="taxSelect"
                  value={tax}
                  onChange={handlePorcentajeChange}
                >
                  {taxToChoose.length &&
                    taxToChoose.map((item, index) => (
                      <option key={index + item.value} value={item.value}>
                        {item.tax}
                      </option>
                    ))}
                </select>
              </div>
              <div className="basis-2/6">
                <label className="my-1 block">P. Neto</label>
                <Input
                  type="number"
                  labelPlacement="outside"
                  style={{ cursor: "no-drop" }}
                  startContent={
                    <div className="cursor-not-allowed flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  value={!price ? 0 : netPrice}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="flex sm:gap-2">
              <div className="basis-2/6 mr-1 sm:mr-0">
                <label className="my-1 block" id="profitabilitySelect">
                  Margen (*)
                </label>
                <select
                  id="profitabilitySelect"
                  value={profitability}
                  onChange={handleProfitabilityChange}
                >
                  {profitabilityToChoose.length &&
                    profitabilityToChoose.map((item, index) => (
                      <option key={index + item.value} value={item.value}>
                        {item.profitability}
                      </option>
                    ))}
                </select>
              </div>
              <div className="basis-2/6 mr-1 sm:mr-0">
                <label className="my-1 block">P. Venta</label>
                <Input
                  type="number"
                  labelPlacement="outside"
                  style={{ cursor: "no-drop" }}
                  startContent={
                    <div className="flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  value={!price ? 0 : salePrice}
                  placeholder="0.00"
                />
              </div>
              <div className="basis-2/6">
                <label className="my-1 block">Utilidad</label>
                <Input
                  type="number"
                  labelPlacement="outside"
                  style={{ cursor: "no-drop" }}
                  startContent={
                    <div className=" flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  value={!salePrice ? 0 : profit}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="my-1 block">Descripción (*)</label>
            <textarea
              rows={5}
              placeholder="Escribir descripción"
              value={description}
              className="h-[120px] mb-3.5 xs:mb-0"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="my-1 block">Descripción adicional</label>
            <textarea
              rows={5}
              placeholder="Escribir observación"
              value={descriptionAdditional}
              className="h-[120px]"
              onChange={(e) => setDescriptionAdditional(e.target.value)}
            />
          </div>

          <label className="my-1 block">Imagen(es)</label>
          <div className="h-fit mb-[12px] border-2 border-secundary rounded-sm flex justify-center items-center flex-wrap gap-3 p-2 ">
            <ReactSortable
              // list={images}
              list={Array.isArray(images) ? images : []}
              className="flex flex-wrap gap-1"
              setList={updateImagesOrder}
            >
              {!!images?.length &&
                images.map((link, index) => (
                  <div
                    key={link._id}
                    className="relative group w-24 h-24 flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md"
                  >
                    <img
                      src={link}
                      alt="imagen"
                      className="rounded-md object-contain h-32 w-44 p-1"
                    />
                    <div className="absolute top-2 right-2 cursor-pointer opacity-0  group-hover:opacity-100 ">
                      <button onClick={() => handeDeleteImage(index)}>
                        <DeleteIcon className="w-6 h-6 text-red stroke-2 bg-white rounded-full" />
                      </button>
                    </div>
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
        <div className="col-span-2 gap-4 flex justify-center">
          <button
            type="button"
            className="btn-delete whitespace-nowrap text-white px-2  md:px-4 py-1 rounded-sm mx-1"
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
    </div>
  );
};

export default ProductForm;
