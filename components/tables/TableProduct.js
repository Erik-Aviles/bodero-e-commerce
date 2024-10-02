import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SearchIcon, ChevronDownIcon, DeleteRIcon } from "@/components/Icons";
import ModalRegisterStockProduct from "../modals/ModalRegisterStockProduct";
import { removeAccents, removePluralEnding } from "@/utils/normalized";
import { columnsProduct } from "@/resources/columnTables";
import ModalProducts from "../modals/ModalProducts";
import { capitalize } from "@/utils/utils";
import { useRouter } from "next/router";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Tooltip,
} from "@nextui-org/react";
import { formatPrice } from "@/utils/formatPrice";
import { stopwords } from "@/resources/stopwordsData";
import BottomPaginationContent from "../BottomPaginationContent";

const INITIAL_VISIBLE_COLUMNS = [
  "actions",
  "title",
  "code",
  "createdAt",
  "salePrice",
  "lastquantity",
  "quantity",
  "location",
  "compatibility",
];

export default function TableProduct({ products, deleteProduct }) {
  const router = useRouter();
  const inputRef = useRef(null); // Hook para mantener el ref del input
  const [filterValue, setFilterValue] = useState("");

  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [filterValue]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columnsProduct;

    return columnsProduct.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    if (!products) return [];
    let filteredProducts = [...products];

    const searchParts = removeAccents(filterValue.toLowerCase())
      .split(" ")
      .filter((part) => !stopwords.includes(part))
      .map((part) => removePluralEnding(part));

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((item) => {
        const title = removeAccents(item.title.toLowerCase());
        const code = removeAccents(item.code.toLowerCase());
        const codeEnterprise = removeAccents(item.codeEnterprise.toLowerCase());
        const codeWeb = removeAccents(item.codeWeb.toLowerCase());
        const brand = removeAccents(item.brand.toLowerCase());
        const compatibilityModels = (item.compatibility || []).map((compat) =>
          removeAccents(compat.model.toLowerCase())
        );
        const compatibilityTitle = (item.compatibility || []).map((compat) =>
          removeAccents(compat.title.toLowerCase())
        );

        const matchesAllParts = searchParts.every((part) => {
          return (
            title.includes(part) ||
            code.includes(part) ||
            codeEnterprise.includes(part) ||
            codeWeb.includes(part) ||
            brand.includes(part) ||
            compatibilityModels.some((model) => model.includes(part)) ||
            compatibilityTitle.some((title) => title.includes(part))
          );
        });
        return matchesAllParts;
      });
    }

    return filteredProducts;
  }, [products, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    if (!items) return [];
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <User
            className="flex flex-row-reverse justify-between min-w-[230px] max-w-[315px] capitalize"
            avatarProps={{
              radius: "lg",
              src: product?.images?.at(0),
            }}
            description={product?.brand}
            name={cellValue}
          />
        );
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small text-purple-700">{cellValue}</p>
            <p className="text-bold text-tiny text-pink-700">{product?._id}</p>
          </div>
        );
      case "code":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small whitespace-nowrap text-purple-700">
              {cellValue}
            </p>
            <p className="text-bold text-tiny whitespace-nowrap text-pink-700">
              {product?.codeWeb}
            </p>
            <p className="text-bold text-tiny whitespace-nowrap text-sky-700">
              {product?.codeEnterprise}
            </p>
          </div>
        );
      case "compatibility":
        return (
          <>
            {cellValue.length > 0 &&
              cellValue.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[250px] max-w-[280px] flex gap-1 items-center"
                >
                  <p className="text-bold text-small pr-1 capitalize">
                    {item.title + ":"}
                  </p>
                  <span className="text-bold text-tiny text-default-400 break-all capitalize">
                    {Array.isArray(item.model)
                      ? item.model.join(", ")
                      : item.model}
                  </span>
                </div>
              ))}
          </>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatPrice(cellValue)}</p>
            <p className="text-bold text-tiny  text-default-400">
              {product?.tax ? "%" + product?.tax : ""}
            </p>
          </div>
        );
      case "profit":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatPrice(cellValue)}</p>
            <p className="text-bold text-tiny  text-default-400">
              {product?.profitability ? "%" + product?.profitability : ""}
            </p>
          </div>
        );
      case "netPrice":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatPrice(cellValue)}</p>
          </div>
        );
      case "profitability":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small text-default-400">
              {product?.profitability ? "%" + cellValue : cellValue}
            </p>
          </div>
        );
      case "salePrice":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small ">{formatPrice(cellValue)}</p>
          </div>
        );
      case "quantity":
        return (
          <div className="flex flex-col">
            <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
              {product?.quantityUpdated
                ? new Date(product?.quantityUpdated).toLocaleString()
                : "Sin venta"}
            </span>
            <p
              className={`text-bold whitespace-nowrap text-small ${
                cellValue < 3
                  ? "text-error"
                  : cellValue <= 5
                  ? "text-warning"
                  : ""
              }`}
            >
              {cellValue
                ? cellValue + (cellValue > 1 ? " Uds." : " U.")
                : "0 U."}
            </p>
          </div>
        );
      case "quantityUpdated":
        return (
          <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
            {cellValue
              ? new Date(cellValue).toLocaleString()
              : "No hay registro"}
          </span>
        );
      case "lastquantity":
        return (
          <div className="flex flex-col">
            <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
              {cellValue
                ? new Date(product?.lastquantityUpdated).toLocaleString()
                : ""}
            </span>
            <p className="text-bold text-small ">
              {cellValue > 0 ? (
                cellValue + (cellValue > 1 ? " Uds." : " U.")
              ) : (
                <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                  Sin registro
                </span>
              )}
            </p>
          </div>
        );
      case "lastquantityUpdated":
        return (
          <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
            {product?.lastquantity
              ? new Date(cellValue).toLocaleString()
              : "Sin registro"}
          </span>
        );
      case "createdAt":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small whitespace-nowrap">
              {new Date(product?.createdAt).toLocaleString()}
            </p>
            <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
              {new Date(product?.updatedAt).toLocaleString()}
            </span>
          </div>
        );
      case "offerPrice":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-success text-small ">
              {formatPrice(cellValue)}
            </p>
          </div>
        );
      case "color":
        return (
          <div className="flex flex-col ">
            <p className="max-w-[200px]  break-words text-bold text-small ">
              {cellValue}
            </p>
          </div>
        );
      case "size":
        return (
          <div className="flex flex-col ">
            <p className="max-w-[200px] break-words text-bold text-small">
              {cellValue}
            </p>
          </div>
        );
      case "description":
        return (
          <div className="flex flex-col ">
            <p className="min-w-[250px] max-w-[280px] break-words text-bold text-small">
              {cellValue}
            </p>
          </div>
        );
      case "descriptionAdditional":
        return (
          <div className="flex flex-col ">
            <p className="min-w-[250px] max-w-[280px]  break-words text-bold text-small ">
              {cellValue}
            </p>
          </div>
        );
      case "images":
        return (
          <div className="flex flex-col ">
            <p className="max-w-[250px] min-w-[200px] break-words text-bold text-small ">
              {cellValue?.length === 0
                ? cellValue
                : cellValue?.map((item, index) => (
                    <span key={index}>
                      {item}
                      <br />
                    </span>
                  ))}
              <b />
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center gap-3">
            <Tooltip className="text-error" content="Eliminar">
              <span className="text-lg text-error cursor-pointer active:opacity-50">
                <DeleteRIcon
                  className=" w-[22px] h-[22px]"
                  onClick={() => deleteProduct(product)}
                />
              </span>
            </Tooltip>
            <ModalProducts product={product} />
            <ModalRegisterStockProduct product={product} />
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

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 sm:flex-row justify-between items-end">
          <Input
            ref={inputRef}
            autoFocus
            className={"order-1 focus:bg-default-200/50"}
            placeholder="Buscar por nombre, codigo o codigo web"
            startContent={<SearchIcon className="mr-1" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3 sm:order-1">
            <Dropdown>
              <DropdownTrigger className="flex ">
                <Button
                  endContent={<ChevronDownIcon className=" text-small" />}
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Menu de la tabla"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columnsProduct.map((column) => (
                  <DropdownItem
                    key={column.uid}
                    className="text-[8px] capitalize"
                  >
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <ModalProducts />
          </div>
        </div>
        <div>
          <div className="flex justify-between gap-5 items-center">
            <div className="flex flex-wrap items-center gap-2 text-default-400 text-small ">
              <span className="flex items-center gap-1">
                Principal:
                <article className="w-4 h-4 bg-purple-700 rounded-full"></article>
              </span>
              <span className="flex items-center gap-1">
                Web:
                <article className="w-4 h-4 bg-pink-700 rounded-full"></article>
              </span>
              <span className="flex items-center gap-1">
                Empresarial:
                <article className="w-4 h-4 bg-sky-700 rounded-full"></article>
              </span>
            </div>

            <span className="text-default-400 text-small">
              Total, {filteredItems.length} Productos.
            </span>
            <label className="flex items-center text-default-400 text-small">
              Filas:
              <select
                className="bg-transparent outline-none text-default-400 text-small ml-3"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onRowsPerPageChange,
    products.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  return (
    <Table
      aria-label="Esto es una tabla de productos"
      isHeaderSticky
      bottomContent={
        items.length > 0 ? (
          <BottomPaginationContent
            {...{ page, pages, setPage, onNextPage, onPreviousPage }}
          />
        ) : null
      }
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "-z-1 sm:h-[calc(100vh-300px)] sm:overflow-auto scroll",
        th: "text-warning uppercase",
        td: "outline-none",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Sin registro..."} items={sortedItems}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
