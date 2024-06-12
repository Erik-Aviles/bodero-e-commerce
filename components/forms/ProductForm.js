import React, { useContext, useEffect, useState } from "react";
import { profitabilityToChoose, taxToChoose } from "@/resources/valuesToChoose";
import NotificationContext from "@/context/NotificationContext";
import { ReactSortable } from "react-sortablejs";
import { DeleteIcon, UpLoadIcon } from "../Icons";
import Spinner from "../Spinner";
import axios from "axios";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { capitalize } from "@/utils/utils";
import ModalCategories from "../modals/ModalCategories";
import ButtonClose from "../buttons/ButtonClose";
import useProducts from "@/hooks/useProducts";
import useCategories from "@/hooks/useCategories";

const ProductForm = ({ product, titulo, textSmall, toggleModal }) => {
  const { getProducts } = useProducts();
  const { newCategories } = useCategories();
  const { showNotification } = useContext(NotificationContext);

  const [codeVerify, setCodeVerify] = useState("");
  const [codeWebVerify, setCodeWebVerify] = useState("");
  const [codeEnterpriseVerify, setCodeEnterpriseVerify] = useState("");

  const [title, setTitle] = useState(product?.title || "");
  const [code, setCode] = useState(product?.code || "");
  const [codeEnterprise, setCodeEnterprise] = useState(
    product?.codeEnterprise || ""
  );
  const [codeWeb, setCodeWeb] = useState(product?.codeWeb || "");

  const [price, setPrice] = useState(product?.price || "");
  const [tax, setTax] = useState(product?.tax || 0);
  const [profitability, setProfitability] = useState(
    product?.profitability || 0
  );
  const [netPrice, setNetPrice] = useState(product?.netPrice || "");
  const [salePrice, setSalePrice] = useState(product?.salePrice || "");
  const [offerPrice, setOfferPrice] = useState(product?.offerPrice || "");
  const [profit, setProfit] = useState(product?.profit || 0);
  const [brand, setBrand] = useState(product?.brand || "");
  const [category, setCategory] = useState(product?.category || "");
  const [quantity, setQuantity] = useState(product?.quantity || 0);

  const [location, setLocation] = useState(product?.location || "");
  const [compatibility, setCompatibility] = useState(
    product?.compatibility || []
  );
  const [description, setDescription] = useState(product?.description || "");
  const [descriptionAdditional, setDescriptionAdditional] = useState(
    product?.descriptionAdditional || ""
  );
  const [images, setImages] = useState(product?.images || []);

  const [color, setColor] = useState(product?.color || []);
  const [size, setSize] = useState(product?.size || []);

  const [isUpLoanding, setIsUpLoanding] = useState(false);
  const [verify, setVerify] = useState(false);
  const [verifyWeb, setWebVerify] = useState(false);
  const [verifyEnterprise, setEnterpriseVerify] = useState(false);

  useEffect(() => {
    axios.get("/api/products/full").then((res) => {
      const data = res.data;
      const code = data.map((item) => item.code);
      const codeWeb = data.map((item) => item.codeWeb);
      const codeEnterprise = data.map((item) => item.codeEnterprise);

      setCodeVerify(code);
      setCodeWebVerify(codeWeb);
      setCodeEnterpriseVerify(codeEnterprise);
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

  const handleChangeCode = (e) => {
    const { value } = e.target;
    setCode(value);
    const exists = codeVerify.some(
      (item) => item.toLowerCase() === value.toLowerCase() && item !== ""
    );
    if (exists) {
      setVerify(true);
    } else {
      setVerify(false);
    }
  };

  const handleChangeCodeWeb = (e) => {
    const { value } = e.target;
    setCodeWeb(value);
    const exists = codeWebVerify.some(
      (item) => item.toLowerCase() === value.toLowerCase() && item !== ""
    );
    if (exists) {
      setWebVerify(true);
    } else {
      setWebVerify(false);
    }
  };

  const handleChangeCodeEnterprise = (e) => {
    const { value } = e.target;
    setCodeEnterprise(value);
    const exists = codeEnterpriseVerify.some(
      (item) => item.toLowerCase() === value.toLowerCase() && item !== ""
    );
    if (exists) {
      setEnterpriseVerify(true);
    } else {
      setEnterpriseVerify(false);
    }
  };

  //guardar producto
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
      lastquantity: quantity,
      location,
      compatibility,
      description,
      descriptionAdditional,
      images,
    };
    try {
      const res = await axios.post("/api/products/full", data);
      getProducts();
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
      setOfferPrice("");
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

  //editar producto
  async function edithProduct(e) {
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
      location,
      compatibility,
      description,
      descriptionAdditional,
      images,
    };
    const _id = product?._id;
    if (_id) {
      try {
        await axios.put("/api/products/full", { ...data, _id });
        showNotification({
          open: true,
          msj: `"${capitalize(data.title)}", editado con exito!`,
          status: "success",
        });
        getProducts();
        toggleModal();
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
  const handleOfferPriceChange = (event) => {
    const newOfferPrice = parseFloat(event.target.value);
    setOfferPrice(newOfferPrice);
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
    <div className="relative w-full flex flex-col justify-center ">
      <div className="flex justify-end items-center">
        <ButtonClose onClick={toggleModal} />
      </div>
      <div className="sm:flex sm:items-center sm:justify-between sm:gap-4">
        <div className="flex flex-col pb-2">
          <h3 className="text-lg font-semibold">{titulo}</h3>
          <p className="text-xs text-primary">{textSmall}</p>
        </div>
        <ModalCategories />
      </div>
      <form
        onSubmit={!product ? saveProduct : edithProduct}
        className="w-fit flex flex-col gap-2 lg:grid lg:gap-5 lg:grid-cols-3 sm:border-container "
      >
        {/* Columna de codigos y descripcion*/}
        <div className="gap-2 flex flex-col">
          {/* Codigos */}

          <fieldset className="bg-grayLight flex flex-col border-container ">
            <legend className="text-center text-secondary">CÓDIGOS</legend>
            <div>
              <label className="block my-1">Código (*)</label>
              <Input
                type="text"
                labelPlacement="outside"
                value={code}
                placeholder="Código principal (*)"
                onChange={handleChangeCode}
                // onChange={(e) => setCode(e.target.value)}
              />
            </div>
            {!verify ? (
              <span></span>
            ) : (
              <span className="text-error text-small">Código ya existe!</span>
            )}
            <div>
              <label className="block my-1">Código Web</label>
              <Input
                type="text"
                value={codeWeb}
                placeholder="Código"
                labelPlacement="outside"
                onChange={handleChangeCodeWeb}
              />
            </div>
            {!verifyWeb ? (
              <span></span>
            ) : (
              <span className="text-error text-small">
                Código Web ya existe!
              </span>
            )}
            <div>
              <label className="block my-1">Código Empresa</label>
              <Input
                type="text"
                value={codeEnterprise}
                placeholder="Código"
                labelPlacement="outside"
                onChange={handleChangeCodeEnterprise}
              />
            </div>
            {!verifyEnterprise ? (
              <span></span>
            ) : (
              <span className="text-error text-small">
                Código Empresarial ya existe!
              </span>
            )}
          </fieldset>

          {/* Compatibilidad */}
          <fieldset className=" bg-grayLight  border-container ">
            <legend className="text-center text-secondary">
              COMPATIBILIDADES
            </legend>
            <button
              type="button"
              className="btn-default text-sm mb-2"
              onClick={addCompatibility}
            >
              Agregar compatibilidad
            </button>
            {compatibility.length > 0 &&
              compatibility.map((item, index) => (
                <div key={index} className="flex pb-3">
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
          </fieldset>

          {/* Categorias */}
          <fieldset className="bg-grayLight  border-container ">
            <legend className="text-center text-secondary">
              SELECCIONAR CATEGORIA
            </legend>
            <Autocomplete
              aria-label="Seleccion de categorias"
              inputValue={category}
              onInputChange={(value) => setCategory(value)}
            >
              {newCategories.length > 0 &&
                newCategories
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((category) => (
                    <AutocompleteItem
                      className="max-w-xs "
                      key={category._id}
                      value={category._id}
                    >
                      {capitalize(category?.name)}
                    </AutocompleteItem>
                  ))}
            </Autocomplete>
          </fieldset>
        </div>

        {/* Columna de datos personales y descripcion*/}
        <div className="gap-2 flex flex-col">
          <fieldset className="bg-grayLight border-container">
            <legend className="text-center text-secondary">
              DATOS PRINCIPALES
            </legend>
            {/* nombre*/}
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
            {/* marca */}
            <div>
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

            {/* ubicacion y cantidad*/}
            <div className="xs:flex sm:gap-2 ">
              <div className="basis-1/2 mr-1 sm:mr-0">
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
              {!product ? (
                <div className="basis-1/2">
                  <label className="my-1 block">Cantidad</label>
                  <Input
                    type="number"
                    value={quantity}
                    placeholder="Cantidad"
                    labelPlacement="outside"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              ) : (
                <div className="basis-1/2 flex gap-2">
                  <div>
                    <label className="my-1 block">Stock</label>
                    <Input
                      type="number"
                      labelPlacement="outside"
                      style={{ cursor: "no-drop" }}
                      value={product?.quantity}
                    />
                  </div>
                  <div>
                    <label className="my-1 block">Ulm. cant.</label>
                    <Input
                      type="number"
                      labelPlacement="outside"
                      style={{ cursor: "no-drop" }}
                      value={product?.lastquantity}
                    />
                  </div>
                </div>
              )}
            </div>
            {/* tamaño y color*/}
            <div className="xs:flex sm:gap-2 ">
              <div className="basis-1/2 mr-1 sm:mr-0">
                <label className="my-1 block">Tamaño/s</label>
                <Input
                  type="text"
                  value={size}
                  placeholder="Separados por (,)"
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
                  placeholder="Separados por (,)"
                  labelPlacement="outside"
                  onChange={handleColorChange}
                />
              </div>
            </div>
          </fieldset>

          {/* Descripciones*/}
          <fieldset className="bg-grayLight border-container">
            <legend className="text-center text-secondary">
              DESCRIPCIONES
            </legend>
            <div>
              <label className="my-1 block">Descripción (*)</label>
              <textarea
                placeholder="Escribir descripción"
                value={description}
                className="min-h-[70px] "
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="my-1 block">Descripción adicional</label>
              <textarea
                placeholder="Escribir observación"
                value={descriptionAdditional}
                className="min-h-[70px] "
                onChange={(e) => setDescriptionAdditional(e.target.value)}
              />
            </div>
          </fieldset>
        </div>

        {/* Columna de valores y imagen*/}
        <div className="gap-2 flex flex-col">
          {/* Valores */}
          <fieldset className="bg-grayLight flex flex-col gap-2 border-container">
            <legend className="text-center text-secondary">
              CÁLCULO DE VALORES
            </legend>
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
                  className="text-sm"
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
                      <span className="text-default-400 text-sm">$</span>
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
                  className="text-sm"
                  id="profitabilitySelect"
                  value={profitability}
                  onChange={handleProfitabilityChange}
                >
                  {profitabilityToChoose.length &&
                    profitabilityToChoose.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.profitability}
                      </option>
                    ))}
                </select>
              </div>
              <div className="basis-2/6 mr-1 sm:mr-0">
                <label className="my-1 block">P. Venta</label>
                <Input
                  title="No editable"
                  type="number"
                  labelPlacement="outside"
                  startContent={
                    <div className="flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  value={!price ? 0 : salePrice}
                  placeholder="0.00"
                  onChange={(e) => setSalePrice(e.target.value)}
                />
              </div>
              <div className="basis-2/6">
                <label className="my-1 block">Utilidad</label>
                <Input
                  title="No editable"
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
            <div className="flex sm:gap-2 ">
              <div className="basis-2/6 mr-1 sm:mr-0">
                <label className="my-1 block">P. Oferta</label>
                <Input
                  title="Debe ser (>) a costo"
                  type="number"
                  labelPlacement="outside"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  value={offerPrice}
                  onChange={handleOfferPriceChange}
                  placeholder="0.00"
                />
              </div>
            </div>
            <span
              className={
                !offerPrice || offerPrice === 0
                  ? "text-primary text-small"
                  : offerPrice > netPrice
                  ? "text-success text-small"
                  : "text-error text-small"
              }
            >
              {!offerPrice || offerPrice === 0
                ? "Registra una oferta!"
                : offerPrice > netPrice
                ? "Oferta aceptada!"
                : "Oferta no recomendada!"}
            </span>
          </fieldset>
          {/* imagenes*/}
          <fieldset className="bg-grayLight h-fit mb-[12px] border-2 border-secundary rounded-md flex justify-center items-center flex-wrap gap-3 p-2 ">
            <legend className="text-center text-secondary">IMAGENES</legend>
            <ReactSortable
              // list={images}
              list={Array.isArray(images) ? images : []}
              className="flex flex-wrap gap-1"
              setList={updateImagesOrder}
            >
              {!!images?.length &&
                images.map((link, index) => (
                  <div
                    key={index}
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
          </fieldset>
          {/* botones */}
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
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
