import React, { useCallback, useContext, useMemo, useState } from "react";
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
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import {
  PlusIcon,
  SearchIcon,
  ChevronDownIcon,
  DeleteRIcon,
} from "@/components/Icons";

import { columnsProduct } from "@/resources/data";
import Link from "next/link";
import { capitalize } from "@/utils/utils";
import ModalEditProducts from "./ModalEditProducts";
import ModalNewProducts from "./ModalNewProducts";
import removeAccents from "@/utils/removeAccents";

const INITIAL_VISIBLE_COLUMNS = [
  "title",
  "code",
  "salePrice",
  "quantity",
  "location",
  "compatibility",
  "actions",
];

export default function TableProduct({
  products,
  deleteProduct,
  formatPrice,
  fetchProducts,
}) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columnsProduct.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          removeAccents(product.title.toLowerCase()).includes(
            removeAccents(filterValue.toLowerCase())
          ) ||
          removeAccents(product.code.toLowerCase()).includes(
            removeAccents(filterValue.toLowerCase())
          ) ||
          removeAccents(product.codeWeb.toLowerCase()).includes(
            removeAccents(filterValue.toLowerCase())
          ) ||
          removeAccents(product.codeEnterprise.toLowerCase()).includes(
            removeAccents(filterValue.toLowerCase())
          )
      );
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
            className="justify-start min-w-[200px]"
            avatarProps={{ radius: "lg", src: product.images?.[0] }}
            description={capitalize(product?.brand)}
            name={capitalize(cellValue)}
          >
            {product?.title}
          </User>
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
            <p className="text-bold text-small text-purple-700">{cellValue}</p>
            <p className="text-bold text-tiny text-pink-700">
              {product?.codeWeb}
            </p>
            <p className="text-bold text-tiny text-sky-700">
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
          <div className="">
            <p
              className={`text-bold w-full text-small ${
                cellValue < 3
                  ? "text-error"
                  : cellValue <= 5
                  ? "text-warning"
                  : ""
              }`}
            >
              {cellValue}
            </p>
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
                : cellValue.map((item, index) => (
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
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-3">
              <ModalEditProducts
                product={product}
                fetchProducts={fetchProducts}
              />
            </div>
            <Tooltip color="danger" content="Eliminar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteRIcon onClick={() => deleteProduct(product)} />
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
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[45%] order-1"
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
                  endContent={<ChevronDownIcon className="-z-0 text-small" />}
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
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <ModalNewProducts fetchProducts={fetchProducts} />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div>
              <span className="text-default-400 text-small ">
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
              </span>
            </div>
            <span className="text-default-400 text-small">
              Total, {products.length} Productos.
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
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Esto es una tabla de productos"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "-z-1 max-h-[440px]  ",
        th: "text-warning uppercase",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
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
