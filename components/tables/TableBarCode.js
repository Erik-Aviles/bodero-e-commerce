import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { removeAccents, removePluralEnding } from "@/utils/normalized";
import NotificationContext from "@/context/NotificationContext";
import { columnsBarCode } from "@/resources/columnTables";
import { stopwords } from "@/resources/stopwordsData";
import Barcode from "react-barcode";
import {
  SearchIcon,
  DeleteRIcon,
  PlusIcon,
  PrintIcon,
  VerifyIcon,
} from "@/components/Icons";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Input,
  Button,
  Pagination,
  Tooltip,
  Chip,
} from "@nextui-org/react";

export default function TableBarCode({ products }) {
  const { showNotification } = useContext(NotificationContext);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");
  const [status, setStatus] = useState(false);
  const [selectProduct, setSelectProduct] = useState([]);

  const [page, setPage] = useState(1);

  const statusColorMap = {
    true: "text-success border-success",
    false: "text-error border-error",
  };

  useEffect(() => {
    const savedProducts = localStorage.getItem("selectProduct");
    if (savedProducts) {
      setSelectProduct(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectProduct", JSON.stringify(selectProduct));
  }, [selectProduct]);

  const handleSearchChange = (value) => {
    setQuery(value);
    const normalizedQuery = removeAccents(value.toLowerCase())
      .split(" ")
      .filter((part) => !stopwords.includes(part))
      .map(removePluralEnding);

    if (value.length >= 3) {
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
    if (selectedQuantity <= 0) {
      showNotification({
        open: true,
        msj: "La cantidad debe de ser mayor a 0",
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
        {
          title: query,
          code: selectedCode,
          quantity: selectedQuantity,
          status: status,
        },
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

  const handleDeleteProduct = (productCode) => {
    setSelectProduct((prev) => {
      const pos = prev.indexOf(productCode); // imprime el indice
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      localStorage.setItem("selectProduct", JSON.stringify(prev));
      return prev;
    });
    showNotification({
      open: true,
      msj: "Producto eliminado",
      status: "success",
    });
  };

  const modifyStatusItem = (item) => {
    setSelectProduct((prev) => {
      const updatedArray = prev.map((product) => {
        if (product.code === item.code && product.status === false) {
          return { ...product, status: true };
        }
        return product;
      });
      return updatedArray;
    });
    showNotification({
      open: true,
      msj: "Etiquetas Impresas!",
      status: "success",
    });
  };

  const handlePrint = (item) => {
    console.log("Solo imprimiendo", item.title);
    if (item.status === false) {
      console.log("Usando funcion de status");
      modifyStatusItem(item);
    }
  };

  const handleDeleteAllProducts = () => {
    if (selectProduct.length <= 0) {
      return showNotification({
        open: true,
        msj: "No hay productos registrados",
        status: "error",
      });
    } else {
      localStorage.setItem("selectProduct", JSON.stringify([]));
      setSelectProduct([]);

      showNotification({
        open: true,
        msj: "Todos los productos han sido eliminados",
        status: "success",
      });
    }
  };
  const pages = Math.ceil(selectProduct.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return selectProduct.slice(start, end);
  }, [page, selectProduct, rowsPerPage]);

  const renderCell = useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "status":
        return (
          <Chip
            className={`cursor-pointer capitalize border ${statusColorMap[cellValue]}`}
            size="sm"
            startContent={cellValue === true ? <VerifyIcon /> : ""}
            variant="flat"
            isDisabled={cellValue === true ? true : false}
          >
            {cellValue === false ? "Pending" : "Printed"}
          </Chip>
        );
      case "title":
        return (
          <div className="uppercase min-w-[230px] max-w-[315px]">
            {cellValue}
          </div>
        );
      case "code":
        return <div className="whitespace-nowrap">{cellValue}</div>;
      case "barCode":
        return (
          <div className="whitespace-nowrap">
            {
              <Barcode
                value={product.code}
                width={1}
                height={50}
                fontSize={12}
                font={"mono"}
                background="#fff"
              />
            }
          </div>
        );

      case "actions":
        return (
          <div className="flex items-center gap-3">
            <Tooltip className="text-error" content="Eliminar">
              <span
                className="text-lg text-error cursor-pointer active:opacity-50"
                onClick={() => handleDeleteProduct(product)}
              >
                <DeleteRIcon className=" w-[22px] h-[22px]" />
              </span>
            </Tooltip>
            <Tooltip
              className="text-sky-700 "
              color="#05aae1"
              content="Imprimir"
            >
              <span className="text-lg text-sky-700 cursor-pointer active:opacity-50">
                <PrintIcon
                  className=" w-[22px] h-[22px] fill-sky-700"
                  onClick={() => handlePrint(product)}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

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

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative ">
          <form className=" flex flex-col-reverse md:flex-row gap-3 bg-white items-end border-container mt-3">
            <Input
              isClearable={query}
              value={query}
              readOnly={selectedCode}
              label="Nombre del producto"
              labelPlacement={"outside"}
              className={"basis-1/2 focus:bg-default-200/50"}
              placeholder="Buscar por nombre, marca o codigos"
              startContent={<SearchIcon className="mr-1" />}
              onClear={handleClear}
              onValueChange={handleSearchChange}
            />

            <Input
              value={selectedCode}
              readOnly
              label="Código del producto"
              labelPlacement={"outside"}
              placeholder="Código"
              className=" basis-1/4 "
              onValueChange={onChangeCode}
            />
            <Input
              type="number"
              label="Cantidad de etiquetas"
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
              Total, {selectProduct.length} productos agregados.
            </span>{" "}
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
              >
                <PrintIcon className=" w-[22px] h-[22px] fill-sky-500" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }, [query, selectedCode, handleSearchChange]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages]);

  return (
    <Table
      aria-label="Esto es una tabla de codigo de barra"
      isHeaderSticky
      bottomContent={selectProduct === [] ? null : bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "-z-1 sm:h-[calc(100vh-350px)] sm:overflow-auto scroll",
        th: "text-warning uppercase",
        td: "border-b border-warning",
      }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columnsBarCode}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Sin registro..."} items={items}>
        {(item) => (
          <TableRow key={item.code}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
