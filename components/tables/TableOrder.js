import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  statusColorMap,
  statusOrder,
  statusSVGMap,
} from "@/resources/statusMap";
import { formatToCurrency } from "@/utils/formatToCurrency";
import { columnsOrder } from "@/resources/columnTables";
import ShowOrderDetail from "../show/ShowOrderDetail";
import {
  ChevronDownIcon,
  DeleteRIcon,
  RefreshIcon,
  SearchIcon,
} from "../Icons";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Input,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import BottomPaginationContent from "../BottomPaginationContent";
import { calcularQuantity, calcularTotal } from "@/utils/order/calculations";
import { capitalize } from "@/utils/utils";

const INITIAL_VISIBLE_COLUMNS = [
  "processes",
  "paid",
  "status",
  "orderNumber",
  "customerName",
  "createdAt",
  "amount",
  "quantity",
  "actions",
];

export default function TableOrder({
  reduceQuantityProducts,
  deleteOrder,
  orders,
  updateStateChanges,
}) {
  const inputRef = useRef(null);
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

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Enfocar el input cuando el modal se cierre
    }
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columnsOrder;

    return columnsOrder.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    if (!orders) return [];
    let resultadoFiltrado = [...orders];

    if (hasSearchFilter) {
      resultadoFiltrado = resultadoFiltrado.filter((objeto) =>
        objeto.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return resultadoFiltrado;
  }, [orders, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = useCallback(
    (order, columnKey) => {
      const cellValue = order[columnKey];

      const quantity = calcularQuantity(order.line_items);

      // Obtener el cantidad de producto
      const total = calcularTotal(order.line_items);

      switch (columnKey) {
        case "customerName":
          return (
            <div className="flex flex-col ">
              <p className="text-bold text-tiny text-primary-400 whitespace-nowrap capitalize">
                {order?.customerName} {order?.customerLastName}
              </p>
              <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                {order?.customerPhone
                  ? `Teléfono: ${order?.customerPhone}`
                  : "Sin teléfono"}
              </span>
              <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                {order?.customerIdDocument
                  ? `Cedula: ${order?.customerIdDocument}`
                  : "Sin cedula"}
              </span>
            </div>
          );
        case "name":
          return (
            <div className="flex flex-col ">
              <p className="text-bold text-tiny text-primary-400 whitespace-nowrap capitalize">
                {order?.name} {order?.lastname}
              </p>
              <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                {order?.email ? `Correo: ${order?.email}` : "Sin correo"}
              </span>
              <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                {order?.phone ? `Teléfono: ${order?.phone}` : "Sin teléfono"}
              </span>
              <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                {order?.idDocument
                  ? `Cedula: ${order?.idDocument}`
                  : "Sin cedula"}
              </span>
              <span className="text-bold text-tiny text-default-400 whitespace-nowrap capitalize">
                {order?.streetAddress ||
                order?.city ||
                order?.province ||
                order?.country
                  ? `Dirección: ${order?.streetAddress},  ${order?.city},  ${order?.province},  ${order?.country}`
                  : "Sin dirección"}
              </span>
              <span className="text-bold text-tiny text-default-400 whitespace-nowrap capitalize">
                {order?.postal
                  ? `Codigo postal: ${order?.postal}`
                  : "Sin postal"}
              </span>
            </div>
          );
        case "customerBillingAddress":
          return (
            <div className="flex flex-col ">
              <p className="text-bold text-tiny text-primary-400 whitespace-nowrap capitalize">
                {order?.customerBillingAddress?.name}
                {order?.customerBillingAddress?.lastname}
              </p>
              <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                {order?.customerBillingAddress?.email
                  ? `Correo: ${order?.customerBillingAddress?.email}`
                  : "Sin correo"}
              </span>
              <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                {order?.customerBillingAddress?.phone
                  ? `Teléfono: ${order?.customerBillingAddress?.phone}`
                  : "Sin teléfono"}
              </span>
              <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                {order?.customerBillingAddress?.idDocument
                  ? `Cedula: ${order?.customerBillingAddress?.idDocument}`
                  : "Sin cedula"}
              </span>
              <span className="text-bold text-tiny text-default-400 whitespace-nowrap capitalize">
                {order?.customerBillingAddress?.streetAddress ||
                order?.customerBillingAddress?.canton ||
                order?.customerBillingAddress?.province ||
                order?.customerBillingAddress?.country
                  ? `Dirección: ${order?.customerBillingAddress?.streetAddress},  ${order?.customerBillingAddress?.canton},  ${order?.customerBillingAddress?.province},  ${order?.customerBillingAddress?.country}`
                  : "Sin dirección"}
              </span>
              <span className="text-bold text-tiny text-default-400 whitespace-nowrap capitalize">
                {order?.customerBillingAddress?.postal
                  ? `Codigo postal: ${order?.customerBillingAddress?.postal}`
                  : "Sin postal"}
              </span>
            </div>
          );
        case "amount":
          return (
            <div className="flex flex-col">
              <p className=" break-words text-bold text-tiny capitalize">
                {formatToCurrency(total)}
              </p>
            </div>
          );
        case "orderNumber":
          return (
            <div className="flex flex-col">
              <p className=" break-words text-bold text-tiny capitalize">
                {order?.orderNumber ? order?.orderNumber : order?._id}
              </p>
            </div>
          );
        case "quantity":
          return (
            <div className="flex flex-col">
              <p className=" break-words text-bold text-tiny capitalize">
                {quantity}
                {" ud."}
              </p>
            </div>
          );
        case "createdAt":
          return (
            <div className="flex flex-col">
              <p className=" break-words text-bold text-tiny capitalize">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          );
        case "paid":
          return (
            <div className="flex flex-col">
              <p
                className={`break-words text-bold text-tiny capitalize ${
                  cellValue ? "text-success" : "text-error"
                }`}
              >
                {cellValue ? "Pagado" : "Pendiente"}
              </p>
            </div>
          );
        case "status":
          return (
            <div className="flex flex-col">
              <p
                className={`break-words text-bold text-tiny capitalize ${statusOrder[cellValue]} `}
              >
                {cellValue === "delivered"
                  ? "Entregado"
                  : cellValue === "sending"
                  ? "Enviado"
                  : cellValue === "processing"
                  ? "Procesado"
                  : cellValue === "pending"
                  ? "Pendiente"
                  : "Cancelado"}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="flex items-center gap-3 ">
              <ShowOrderDetail order={order} />
              <Tooltip className="text-error" content="Eliminar">
                <span className="text-lg text-error cursor-pointer active:opacity-50">
                  <DeleteRIcon
                    className=" w-[22px] h-[22px]"
                    onClick={() => deleteOrder(order)}
                  />
                </span>
              </Tooltip>
            </div>
          );
        case "processes":
          return (
            <div className="flex items-center gap-3 ">
              <div className="flex flex-col gap-2 ">
                {order.status !== "canceled" && (
                  <Chip
                    className={`text-tiny capitalize cursor-pointer border-blue-500  text-blue-500 `}
                    variant="bordered"
                    isDisabled={order?.status !== "pending"}
                    onClick={() => reduceQuantityProducts(order)}
                  >
                    {order.status === "pending" ? "Procesar" : "Procesado"}
                  </Chip>
                )}
                {(order.status === "pending" ||
                  order.status === "canceled") && (
                  <Chip
                    className={`text-tiny capitalize cursor-pointer border-error text-error`}
                    variant="bordered"
                    isDisabled={order?.status !== "pending"}
                    onClick={() =>
                      updateStateChanges(
                        order?._id,
                        "canceled",
                        order?.customerId,
                        order?.orderNumber
                      )
                    }
                  >
                    {order.status === "canceled" ? "Cancelado" : "Cancelar"}
                  </Chip>
                )}

                {order.status !== "pending" && order.status !== "canceled" && (
                  <Chip
                    className={`text-tiny capitalize cursor-pointer text-success border-success `}
                    variant="bordered"
                    isDisabled={order?.status === "delivered"}
                    onClick={() =>
                      updateStateChanges(
                        order?._id,
                        "delivered",
                        order?.customerId,
                        order?.orderNumber
                      )
                    }
                  >
                    {order.status === "processing" ? "Entregar" : "Entregado"}
                  </Chip>
                )}
              </div>
            </div>
          );

        default:
          return cellValue;
      }
    },
    [deleteOrder, formatToCurrency, reduceQuantityProducts]
  );

  //sigiente
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
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-5 justify-end pt-2">
        <div className="flex  items-center gap-3 text-tiny">
          <span className="text-default-400 ">
            Total, {orders.length} Ordenes.
          </span>{" "}
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
              {columnsOrder.map((column) => (
                <DropdownItem key={column.uid}>
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }, [
    filterValue,
    orders.length,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
    visibleColumns,
  ]);

  return (
    <Table
      aria-label="Tabla de Ordenes"
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
        wrapper: "-z-1 sm:h-[calc(100vh-340px)] scroll",
        th: "text-warning uppercase",
        td: "text-tiny",
      }}
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
      <TableBody items={items}>
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
