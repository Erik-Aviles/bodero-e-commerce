import React, { useCallback, useMemo, useRef, useState } from "react";
import { removeAccents, removePluralEnding } from "@/utils/normalized";
import { statusOptionsDebts, statusSVGMap } from "@/resources/statusMap";
import { columnsDebts } from "@/resources/columnTables";
import { stopwords } from "@/resources/stopwordsData";
import { ChevronDownIcon, DeleteRIcon, SearchIcon } from "../Icons";
import { capitalize } from "@/utils/utils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import BottomPaginationContent from "../BottomPaginationContent";
import ModalDebts from "../modals/ModalDebts";
import { formatPrice } from "@/utils/formatPrice";

export default function TableDebts({ debts, deleteDebts, handleStatusDebt }) {
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const inputRef = useRef(null);

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    if (!debts) return [];
    let resultadoFiltrado = [...debts];

    const searchParts = removeAccents(filterValue.toLowerCase())
      .split(" ")
      .filter((part) => !stopwords.includes(part))
      .map((part) => removePluralEnding(part));

    if (hasSearchFilter) {
      resultadoFiltrado = resultadoFiltrado.filter((item) => {
        const fullname = removeAccents(item?.customer?.fullname?.toLowerCase());
        const phone = removeAccents(item?.customer?.phone?.toLowerCase());
        const model = removeAccents(item?.vehicle?.model?.toLowerCase());
        const plate = removeAccents(item?.vehicle?.plate?.toLowerCase());
        const concept = removeAccents(item?.concept?.toLowerCase());
        const document = removeAccents(item?.document?.toLowerCase());

        const matchesAllParts = searchParts.every((part) => {
          return (
            fullname.includes(part) ||
            phone.includes(part) ||
            model.includes(part) ||
            plate.includes(part) ||
            concept.includes(part) ||
            document.includes(part)
          );
        });
        return matchesAllParts;
      });
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptionsDebts.length
    ) {
      resultadoFiltrado = resultadoFiltrado.filter((debt) => {
        const status = debt.status;
        return status && Array.from(statusFilter).includes(status);
      });
    }

    return resultadoFiltrado;
  }, [debts, filterValue, , statusFilter]);

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

  const renderCell = useCallback(
    (debt, columnKey) => {
      const cellValue = debt[columnKey];

      switch (columnKey) {
        case "customer":
          return (
            <div className="flex flex-col ">
              <p className="text-bold text-tiny text-primary-400 whitespace-nowrap uppercase">
                {cellValue?.fullname}
              </p>
              <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                {cellValue?.phone}
              </span>
            </div>
          );
        case "amount":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-tiny text-default-400 break-words whitespace-nowrap">
                {new Date(debt?.createdAt).toLocaleString(
                  ("es-ES", { timeZone: "America/Guayaquil" })
                )}
              </p>
              <p className="text-bold text-tiny text-primary-400">
                {formatPrice(cellValue)}
              </p>
            </div>
          );
        case "payments":
          return (
            <>
              {cellValue.length > 0 &&
                cellValue.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <p className="text-primary-400 text-bold text-tiny break-words whitespace-nowrap capitalize">
                      Abono:
                      <span className="pl-2 text-default-400">
                        {formatPrice(item?.amount) + ","}
                      </span>
                    </p>
                    <p className="text-primary-400 text-bold text-tiny break-words whitespace-nowrap capitalize">
                      Fecha:
                      <span className="pl-2 text-default-400">
                        {item?.date}
                      </span>
                    </p>
                  </div>
                ))}
            </>
          );
        case "pay":
          return (
            <div className="flex flex-col">
              <p className="text-default-400 text-bold text-tiny">
                {formatPrice(cellValue)}
              </p>
            </div>
          );
        case "debtBalance":
          return (
            <div className="flex flex-col">
              <p className="text-default-400 text-bold text-tiny">
                {formatPrice(cellValue)}
              </p>
            </div>
          );
        case "concept":
          return (
            <div className="flex flex-col min-w-[150px] max-w-[315px]">
              <p className=" break-words text-bold text-tiny capitalize">
                {cellValue}
              </p>
            </div>
          );
        case "document":
          return (
            <div className="flex flex-col min-w-[110px] max-w-[315px]">
              <p className=" break-words text-bold text-tiny capitalize">
                {cellValue}
              </p>
            </div>
          );
        case "vehicle":
          return (
            <div className="flex flex-col ">
              <p className="text-bold text-tiny text-primary-400 whitespace-nowrap capitalize">
                {cellValue?.model}
              </p>
              <span className="text-bold text-tiny text-default-400 whitespace-nowrap uppercase">
                {cellValue?.plate}
              </span>
            </div>
          );
        case "status":
          return (
            <div className="flex flex-col gap-1">
              {debt?.fullPaymentDate !== null && (
                <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                  {new Date(debt?.fullPaymentDate).toLocaleString("es-ES", {
                    timeZone: "America/Guayaquil",
                  })}
                </span>
              )}
              <Tooltip className="text-success" content={cellValue !== "pagado" && "Pago total"}>
                <button
                  className={`max-w-fit py-1 px-2 flex items-center gap-1 capitalize rounded-2xl text-tiny border ${
                    cellValue === "pagado"
                      ? "border-success text-success cursor-default"
                      : cellValue === "avanzado"
                      ? "border-sky-500 text-sky-500 cursor-pointer"
                      : cellValue === "bajo" || cellValue === "media"
                      ? "border-warning text-warning cursor-pointer"
                      : cellValue === "critico" || cellValue === "pendiente"
                      ? "border-error text-error cursor-pointer"
                      : "border-default-500 text-default-500 cursor-pointer"
                  }`}
                  disabled={cellValue === "pagado"}
                  onClick={() => handleStatusDebt(debt)}
                >
                  {cellValue}
                </button>
              </Tooltip>
            </div>
          );
        case "actions":
          return (
            <div className="flex items-center gap-3 ">
              <ModalDebts debt={debt} focusInput={focusInput} />
              <Tooltip className="text-error" content="Eliminar">
                <span className="text-lg text-error cursor-pointer active:opacity-50">
                  <DeleteRIcon
                    className=" w-[22px] h-[22px]"
                    onClick={() => deleteDebts(debt)}
                  />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [deleteDebts]
  );

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  //siguiente
  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  //anterior
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 sm:flex-row justify-between items-end">
          <Input
            isClearable
            ref={inputRef}
            className="w-full sm:max-w-[45%] order-1"
            placeholder="Búsqueda..."
            startContent={<SearchIcon className="mr-1" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-3 sm:order-1">
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
                {statusOptionsDebts.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <ModalDebts focusInput={focusInput} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total, {filteredItems.length} Deudas.
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
    );
  }, [
    filterValue,
    statusFilter,
    debts.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  return (
    <Table
      aria-label="Es una tabla deudas"
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
      }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columnsDebts}>
        {(column) => (
          <TableColumn key={column.uid} align="start">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Sin registro..."} items={items}>
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
