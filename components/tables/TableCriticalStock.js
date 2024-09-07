import React, { useCallback, useMemo, useState } from "react";
import ModalRegisterStockProduct from "../modals/ModalRegisterStockProduct";
import { removeAccents, removePluralEnding } from "@/utils/normalized";
import { SearchIcon, ChevronDownIcon } from "@/components/Icons";
import { columnsCriticalStock } from "@/resources/columnTables";
import BottomPaginationContent from "../BottomPaginationContent";
import { getStockStatus } from "@/utils/getStockStatus";
import { stopwords } from "@/resources/stopwordsData";
import { capitalize } from "@/utils/utils";
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
} from "@nextui-org/react";
import {
  statusColorDotMap,
  statusColorQuantityMap,
  statusColorTextMap,
  statusOptions,
} from "@/resources/statusMap";

export default function TableCriticalStock({ products }) {
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

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

        const matchesAllParts = searchParts.every((part) => {
          return (
            title.includes(part) ||
            code.includes(part) ||
            codeEnterprise.includes(part) ||
            codeWeb.includes(part) ||
            brand.includes(part)
          );
        });
        return matchesAllParts;
      });
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredProducts = filteredProducts.filter((product) => {
        const status = getStockStatus(product.quantity);
        return status && Array.from(statusFilter).includes(status);
      });
    }
    return filteredProducts;
  }, [products, filterValue, statusFilter]);

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
      case "status":
        return (
          <div
            className={`max-w-fit py-1 px-2 flex items-center gap-1 capitalize rounded-2xl text-tiny cursor-default border ${
              product.quantity > 2
                ? "border-yellow text-yellow"
                : statusColorQuantityMap[getStockStatus(product.quantity)]
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                statusColorDotMap[getStockStatus(product.quantity)]
              }`}
            ></div>
            {getStockStatus(product.quantity)}
          </div>
        );
      case "title":
        return (
          <div className="flex flex-col capitalize">
            <p className="text-default-700 ">{cellValue}</p>
            <p className="text-tiny text-default-400">{product?.brand}</p>
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
                statusColorTextMap[getStockStatus(product.quantity)]
              }`}
            >
              {cellValue
                ? cellValue + (cellValue > 1 ? " Uds." : " U.")
                : "0 U."}
            </p>
          </div>
        );
      case "lastquantity":
        return (
          <div className="flex flex-col">
            <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
              {cellValue
                ? new Date(product?.lastquantityUpdated).toLocaleString()
                : "No hay registro"}
            </span>
            <p className={`text-bold whitespace-nowrap text-small`}>
              {cellValue
                ? cellValue + (cellValue > 1 ? " Uds." : " U.")
                : "0 U."}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center gap-3">
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
            isClearable
            className="w-full lg:max-w-[44%]"
            placeholder="Buscar por nombre, codigo o codigo web"
            startContent={<SearchIcon className="mr-1" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <div className="flex items-center text-small">
              Filas:
              <select
                className="w-[60px] cursor-pointer bg-transparent outline-none text-default-400 text-small ml-3"
                onChange={onRowsPerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between gap-5 items-center">
            <div className="flex items-center space-x-2 text-default-400 text-tiny ">
              <span className="flex flex-col sm:flex-row items-center gap-1">
                Bajo= 2
                <article className="w-3 h-3 bg-yellow rounded-full"></article>
              </span>
              <div className="text-default"> | </div>
              <span className="flex flex-col sm:flex-row items-center gap-1">
                Critico= 1
                <article className="w-3 h-3 bg-warning rounded-full"></article>
              </span>
              <div className="text-default"> | </div>
              <span className="flex flex-col sm:flex-row items-center gap-1">
                Agotado= 0
                <article className="w-3 h-3 bg-error rounded-full"></article>
              </span>
            </div>

            <span className="text-center text-default-400 text-small">
              Total, {filteredItems.length} Productos.
            </span>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
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
            {...{
              page,
              pages,
              setPage,
              onNextPage,
              onPreviousPage,
              hasSearchFilter,
            }}
          />
        ) : null
      }
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "-z-1 sm:h-[calc(100vh-300px)] sm:overflow-auto scroll",
        th: "text-warning uppercase",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={columnsCriticalStock}>
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
      <TableBody
        emptyContent={"No hay productos en riesgo de agotarse!"}
        items={sortedItems}
      >
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
