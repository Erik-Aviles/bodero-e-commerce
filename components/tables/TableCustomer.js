import React, { useCallback, useMemo, useState } from "react";
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
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import { SearchIcon, ChevronDownIcon, DeleteRIcon } from "@/components/Icons";
import { columnsCustomer } from "@/resources/columnTables";
import { capitalize } from "@/utils/utils";
import { removeAccents } from "@/utils/normalized";
import ModalCustomers from "../modals/ModalCustomers";
import BottomPaginationContent from "../BottomPaginationContent";

const INITIAL_VISIBLE_COLUMNS = [
  "actions",
  "name",
  "identifications",
  "phone",
  "myVehicles_list",
  "myProductOrder_list",
  "myShopping_list",
];

export default function TableCustomer({ customers, deleteCustomer }) {
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

    return columnsCustomer.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    if (!customers) return [];
    let filteredCustomers = [...customers];

    if (hasSearchFilter) {
      filteredCustomers = filteredCustomers.filter(
        (customer) =>
          removeAccents(customer.name.toLowerCase()).includes(
            removeAccents(filterValue.toLowerCase())
          ) ||
          removeAccents(customer.identifications.toLowerCase()).includes(
            removeAccents(filterValue.toLowerCase())
          )
      );
    }

    return filteredCustomers;
  }, [customers, filterValue]);

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

  const renderCell = useCallback((customer, columnKey) => {
    const cellValue = customer[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small whitespace-nowrap capitalize">
              {cellValue}
            </p>
            <span className="text-bold text-tiny text-default-400 whitespace-nowrap capitalize">
              {customer?.lastname ? customer?.lastname : "Sin apellido"}
            </span>
          </div>
        );
      case "identifications":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small whitespace-nowrap">
              {cellValue ? cellValue : "Sin cedula"}
            </p>
            <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
              {customer?.email ? customer?.email : "Sin correo"}
            </span>
          </div>
        );
      case "phone":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small whitespace-nowrap">
              {cellValue ? cellValue : "Sin teléfono"}
            </p>
            <span className="text-bold text-tiny text-default-400">
              {customer?.address ? capitalize(customer?.address) : "Sin dirección"}
            </span>
          </div>
        );
      case "observations":
        return (
          <div className="flex flex-col ">
            <p className="min-w-[250px] max-w-[280px] break-words text-bold text-small">
              {cellValue ? cellValue : "Sin observación"}
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
                  onClick={() => deleteCustomer(customer)}
                />
              </span>
            </Tooltip>
            <ModalCustomers customer={customer} />
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 sm:flex-row justify-between items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[45%] order-1"
            placeholder="Buscar por nombre o cédula... "
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
                {columnsCustomer.map((column) => (
                  <DropdownItem
                    key={column.uid}
                    className="text-[8px] capitalize"
                  >
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <ModalCustomers />
          </div>
        </div>
        <div>
          <div className="flex justify-between gap-5 items-center">
            <span className="text-default-400 text-small">
              Total, {customers.length} Clientes.
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
    customers.length,
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
        wrapper: "-z-1 sm:h-[calc(100vh-300px)] scroll",
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
