import { profitabilityToChoose, taxToChoose } from "@/resources/valuesToChoose";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import ModalCategories from "../modals/ModalCategories";
import useCategories from "@/hooks/useCategories";
import ButtonClose from "../buttons/ButtonClose";
import { DeleteIcon, UpLoadIcon } from "../Icons";
import { ReactSortable } from "react-sortablejs";
import useProducts from "@/hooks/useProducts";
import { Loader } from "../snnipers/Loader";
import useLoading from "@/hooks/useLoading";
import { capitalize } from "@/utils/utils";
import axios from "axios";

const ProductForm = ({ product, titulo, textSmall, toggleModal }) => {
  const { isLoading, startLoading, finishtLoading } = useLoading();
  const { showNotification } = useContext(NotificationContext);
  const { mutateProducts } = useProducts();
  const { categories } = useCategories();

  const initialCodes = { code: [], codeWeb: [], codeEnterprise: [] };
  const [codes, setCodes] = useState(initialCodes);

  const [code, setCode] = useState(product?.code || "");
  const [codeEnterprise, setCodeEnterprise] = useState(
    product?.codeEnterprise || ""
  );
  const [codeWeb, setCodeWeb] = useState(product?.codeWeb || "");

  const [title, setTitle] = useState(product?.title || "");
  const [price, setPrice] = useState(product?.price || "");
  const [minPrice, setMinPrice] = useState(product?.minPrice || "");
  const [tax, setTax] = useState(product?.tax || 0);
  const [profitability, setProfitability] = useState(
    product?.profitability || 0
  );
  const [netPrice, setNetPrice] = useState(product?.netPrice || "");
  const [salePrice, setSalePrice] = useState(product?.salePrice || "");
  const [offerPrice, setOfferPrice] = useState(product?.offerPrice || "");
  const [profit, setProfit] = useState(product?.profit || 0);
  const [brand, setBrand] = useState(product?.brand || "");
  const [quantity, setQuantity] = useState(product?.quantity || 0);
  const [category, setCategory] = useState(product?.category || "");

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

  const [maxMInPrice, setMaxMInPrice] = useState(0);
  const [maxOffert, setMaxOffert] = useState(0);

  const fetchDataCodes = async (signal) => {
    try {
      const response = await axios.get("/api/products/full", { signal });
      const data = response.data;

      const updatedCodes = data.reduce(
        (acc, item) => {
          acc.code.push(item.code.toLowerCase());
          acc.codeWeb.push(item.codeWeb.toLowerCase());
          acc.codeEnterprise.push(item.codeEnterprise.toLowerCase());
          return acc;
        },
        { code: [], codeWeb: [], codeEnterprise: [] }
      );

      setCodes(updatedCodes);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Respuesta cancelada:", error.message);
      } else {
        console.error("Error obteniendo los codigos: ", error);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchDataCodes(signal);

    return () => {
      controller.abort();
    };
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

  useEffect(() => {
    calcularMaxMIn(netPrice, 3, setMaxMInPrice);
  }, [netPrice, minPrice]);

  useEffect(() => {
    calcularMaxMIn(minPrice, 3, setMaxOffert);
  }, [minPrice, offerPrice]);

  //registrar producto
  async function saveProduct(e) {
    e.preventDefault();
    let rest = {
      title: title.toLowerCase(),
      code,
      codeEnterprise,
      codeWeb,
      price,
      minPrice,
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
      const { data } = await axios.post(`/api/products/full`, rest);
      showNotification({
        open: true,
        msj: data?.message,
        status: "success",
      });
      mutateProducts();
      resetCodesVerified();
      fetchDataCodes();
      setTitle("");
      setCode("");
      setCodeEnterprise("");
      setCodeWeb("");
      setPrice("");
      setMinPrice(0);
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
    let rest = {
      title: title.toLowerCase(),
      code,
      codeEnterprise,
      codeWeb,
      price,
      minPrice,
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
        const { data } = await axios.put("/api/products/full", {
          ...rest,
          _id,
        });
        showNotification({
          open: true,
          msj: `Producto: ${capitalize(rest.title)}, ${data?.message}`,
          status: "success",
        });
        mutateProducts();
        toggleModal();
      } catch (error) {
        showNotification({
          open: true,
          msj: error.response?.data?.message,
          status: "error",
        });
      }
    }
  }

  //subir imagen
  async function upLoadImages(e) {
    startLoading();
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
    finishtLoading();
  }

  //cambiar orden imagen
  function updateImagesOrder(images) {
    setImages(images);
  }

  //eliminar imagen
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

  function addCompatibility() {
    setCompatibility((prev) => {
      return [...prev, { title: "", model: "" }];
    });
  }

  const handleChangeCode = (e) => {
    const value = e.target.value.toLowerCase();
    setCode(value);
    setVerify(codes.code.includes(value));
  };

  const handleChangeCodeWeb = (e) => {
    const value = e.target.value.toLowerCase();
    setCodeWeb(value);
    setWebVerify(codes.codeWeb.includes(value));
  };

  const handleChangeCodeEnterprise = (e) => {
    const value = e.target.value.toLowerCase();
    setCodeEnterprise(value);
    setEnterpriseVerify(codes.codeEnterprise.includes(value));
  };

  const resetCodesVerified = () => {
    setCodes(initialCodes);
  };

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

  const handlePrecioChange = (event) => {
    const nuevoPrice = parseFloat(event.target.value);
    setPrice(nuevoPrice);
    calcularPrecioNeto(nuevoPrice, tax);
  };

  const handleMinPrecioChange = (event) => {
    const newMinPrice = parseFloat(event.target.value);
    setMinPrice(newMinPrice);
  };

  const handleOfferPriceChange = (event) => {
    const newOfferPrice = parseFloat(event.target.value);
    setOfferPrice(newOfferPrice);
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

  function calcularMaxMIn(valor, porc, setMaxMin) {
    if (valor) {
      const value = parseFloat(calcularPorcentaje(valor, porc));
      setMaxMin(valor + value);
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
                isRequired={true}
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
            {!verifyWeb || codeWeb.length === 0 ? (
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
            {!verifyEnterprise || codeEnterprise.length === 0 ? (
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
              aria-label="Seleccion de categoria"
              label="Selecionar"
              defaultItems={categories?.sort((a, b) =>
                a.name.localeCompare(b.name)
              )}
              selectedKey={category}
              onSelectionChange={setCategory}
            >
              {(item) => (
                <AutocompleteItem key={item._id} value={item._id}>
                  {capitalize(item.name)}
                </AutocompleteItem>
              )}
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
                isRequired={true}
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
                isRequired={true}
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
                    isRequired={true}
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
                      title="No editable"
                      labelPlacement="outside"
                      isReadOnly={true}
                      value={product?.quantity}
                      style={{ cursor: "no-drop" }}
                    />
                  </div>
                  <div>
                    <label className="my-1 block">Ulm. cant.</label>
                    <Input
                      type="number"
                      title="No editable"
                      labelPlacement="outside"
                      value={product?.lastquantity}
                      style={{ cursor: "no-drop" }}
                      isReadOnly={true}
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
                required={true}
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
                  isRequired={true}
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
                  title="No editable"
                  type="number"
                  labelPlacement="outside"
                  style={{ cursor: "no-drop" }}
                  startContent={
                    <div className="flex items-center">
                      <span className="text-default-400 text-sm">$</span>
                    </div>
                  }
                  value={!price ? 0 : netPrice}
                  isReadOnly={true}
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
                  required={true}
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
                  isReadOnly={true}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="flex sm:gap-2 ">
              <div className="basis-2/6 mr-1 sm:mr-0">
                <label className="my-1 block">P. Minimo P</label>
                <Input
                  title="Debe ser (>) a costo"
                  type="number"
                  labelPlacement="outside"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  value={minPrice}
                  onChange={handleMinPrecioChange}
                  placeholder="0.00"
                />
              </div>
              <div className="basis-2/6 mr-1 sm:mr-0">
                <label className="my-1 block">P. Oferta P.</label>
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
              <div className="basis-2/6 mr-1 sm:mr-0">{""}</div>
            </div>
            <div className="flex sm:gap-2 ">
              <div className="basis-2/6 mr-1 sm:mr-0">
                <span
                  className={
                    !minPrice || minPrice === 0
                      ? "text-primary text-small"
                      : minPrice >= maxMInPrice
                      ? "text-success text-small"
                      : "text-error text-small"
                  }
                >
                  {!minPrice || minPrice === 0
                    ? "Aplicar precio minimo!"
                    : minPrice >= maxMInPrice
                    ? "Minimo aceptado!"
                    : "Minimo no recomendado!"}
                </span>
              </div>
              <div className="basis-2/6 mr-1 sm:mr-0">
                <span
                  className={
                    !offerPrice || offerPrice === 0
                      ? "text-primary text-small"
                      : offerPrice >= maxOffert
                      ? "text-success text-small"
                      : "text-error text-small"
                  }
                >
                  {!offerPrice || offerPrice === 0
                    ? "Aplica una oferta!"
                    : offerPrice >= maxOffert
                    ? "Oferta aceptada!"
                    : "Oferta no recomendada!"}
                </span>
              </div>
            </div>
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
                <Loader />
              </div>
            ) : (
              <label className="w-24 h-24 text-center flex flex-col gap-1 justify-center items-center cursor-pointer text-xs text-grayDark rounded-lg bg-gray-100 shadow-md">
                <UpLoadIcon />
                <span>Subir imagen</span>
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
              disabled={isLoading}
            >
              {isLoading ? "Esperar..." : "Guardar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
