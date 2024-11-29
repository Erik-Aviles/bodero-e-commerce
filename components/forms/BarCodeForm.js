import React from "react";
import { Input, Button, Tooltip } from "@nextui-org/react";
import PrintBarcode from "../PrintBarcode";
import {
  SearchIcon,
  PlusIcon,
  DeleteRIcon,
  PrintIcon,
} from "@/components/Icons";

const BarCodeForm = ({
  query,
  items,
  printRef,
  selectedCode,
  setSelectedCode,
  quantity,
  setQuantity,
  suggestions,
  handleSearchChange,
  handleClick,
  handleClear,
  addProduct,
  handlePrintAllBarCodes,
  handleDeleteAllProducts,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative ">
        <form className="flex flex-col-reverse md:flex-row gap-3 bg-white items-end border-container mt-3">
          <div className="w-full basis-1/2">
            <Input
              isClearable={query}
              value={query}
              readOnly={selectedCode}
              placeholder="Buscar por nombre, marca o códigos"
              startContent={<SearchIcon className="mr-1" />}
              onClear={handleClear}
              onValueChange={handleSearchChange}
            />
          </div>
          <div className="w-full basis-1/4">
            <label className="text-small block mb-2">Código del producto</label>
            <Input
              value={selectedCode}
              readOnly
              placeholder="Código"
              onValueChange={(value) => setSelectedCode(value || "")}
            />
          </div>
          <div className="w-full basis-1/4">
            <label className="text-small block mb-2">
              Cantidad de etiquetas
            </label>
            <Input
              type="number"
              value={quantity}
              placeholder="Cantidad"
              onValueChange={(value) => setQuantity(value || "")}
            />
          </div>
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
                  <span className="text-warning font-bold font-mono">{`${item.code}: `}</span>
                  <span> {item.title}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <div>
        <div className="flex justify-end gap-3 items-center px-[17px]">
          <span className="text-default-400 text-small">
            Total, {items.length} productos agregados.
          </span>
          <Tooltip className="text-error" content="Eliminar todo">
            <Button
              className={"bg-transparent border border-error"}
              isIconOnly
              onClick={handleDeleteAllProducts}
            >
              <DeleteRIcon className=" w-[22px] h-[22px] text-error" />
            </Button>
          </Tooltip>
          <Tooltip className="text-sky-700 " content="Imprimir todo">
            <Button
              isIconOnly
              className={"bg-transparent border border-sky-500"}
              onClick={handlePrintAllBarCodes}
            >
              <PrintIcon className=" w-[22px] h-[22px] fill-sky-700" />

              {items.map((product) => {
                <div className="hidden">
                  <PrintBarcode
                    ref={(el) => (printRef.current[product.code] = el)}
                    product={product}
                  />
                </div>;
              })}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default BarCodeForm;
