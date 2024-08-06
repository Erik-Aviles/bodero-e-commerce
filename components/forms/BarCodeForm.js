import { removeAccents, removePluralEnding } from "@/utils/normalized";
import React, { useCallback, useContext, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import { PlusIcon, PrintIcon, SearchIcon } from "../Icons";
import { stopwords } from "@/resources/stopwordsData";
import { Button, Input } from "@nextui-org/react";

const BarCodeForm = ({ products }) => {
  const { showNotification } = useContext(NotificationContext);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [selectProduct, setSelectProduct] = useState([]);

  const handleSearchChange = (value) => {
    setQuery(value);
    const normalizedQuery = removeAccents(value.toLowerCase())
      .split(" ")
      .filter((part) => !stopwords.includes(part))
      .map(removePluralEnding);

    if (value) {
      const filteredSuggestions = products.filter((item) => {
        const fields = [
          item.title,
          item.code,
          item.codeEnterprise,
          item.codeWeb,
          item.brand,
          ...(item.compatibility || []).map((compat) => compat.model),
          ...(item.compatibility || []).map((compat) => compat.title),
        ].map((field) => removeAccents(field.toLowerCase()));

        return normalizedQuery.every((part) =>
          fields.some((field) => field.includes(part))
        );
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const addProduct = () => {
    if (!query || !selectedCode || !selectedQuantity) {
      showNotification({
        open: true,
        msj: "Hay Campos vacíos",
        status: "error",
      });
      return;
    }

    setSelectProduct((prev) => {
      const productExists = prev.some(
        (product) => product.code === selectedCode
      );

      if (productExists) {
        showNotification({
          open: true,
          msj: "El producto ya existe",
          status: "error",
        });
        handleClear();
        return prev;
      }

      const updatedProducts = [
        ...prev,
        { title: query, code: selectedCode, quantity: selectedQuantity },
      ];

      showNotification({
        open: true,
        msj: "Agregado",
        status: "success",
      });

      handleClear();
      return updatedProducts;
    });
  };

  const handleClick = (item) => {
    setQuery(item.title);
    setSelectedCode(item.code);
    setSuggestions([]);
  };

  const handleClear = () => {
    setQuery("");
    setSelectedCode("");
    setSelectedQuantity("");
    setSuggestions([]);
  };

  const onChangeCode = useCallback((value) => setSelectedCode(value || ""), []);
  const onChangeQuantity = useCallback(
    (value) => setSelectedQuantity(value || ""),
    []
  );

  return (
    <div className="relative ">
      <form className=" flex flex-col-reverse md:flex-row gap-3 bg-white items-end border-container mt-3">
        <Input
          isClearable={query}
          value={query}
          readOnly={selectedCode}
          label="Nombre del producto"
          labelPlacement={"outside"}
          className={"basis-1/2 focus:bg-default-200/50 "}
          placeholder="Buscar por nombre, codigo o codigo web"
          startContent={<SearchIcon className="mr-1" />}
          onClear={handleClear}
          onValueChange={handleSearchChange}
        />

        <Input
          value={selectedCode}
          readOnly
          label="Código"
          labelPlacement={"outside"}
          placeholder="Codigo"
          className=" basis-1/4 "
          onValueChange={onChangeCode}
        />
        <Input
          type="number"
          label="Cant. Imprimir"
          labelPlacement={"outside"}
          value={selectedQuantity}
          placeholder="Cantidad"
          className=" basis-1/4 "
          onValueChange={onChangeQuantity}
        />
        <Button
          color="success"
          variant="bordered"
          isIconOnly
          onClick={addProduct}
        >
          <PlusIcon />
        </Button>
      </form>
      {suggestions.length > 0 && (
        <section className="absolute p-2 top-full left-0 w-full md:max-w-[50%] mt-1 border shadow-md bg-black z-50 rounded-md">
          <ul className="overflow-auto scroll max-h-60 transition-opacity duration-300 opacity-100 flex flex-col gap-2">
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => handleClick(item)}
                className="py-2 pl-2 mr-2 cursor-pointer border rounded-md border-[#97a8bc] text-white hover:text-black hover:bg-gray-100 hover:rounded-md capitalize"
              >
                {`${item.code}:  ${item.title}`}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default BarCodeForm;
