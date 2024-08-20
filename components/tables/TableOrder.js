import React, { useCallback, useMemo, useState } from "react";
import { statusColorMap, statusSVGMap } from "@/resources/statusMap";
import { formatToCurrency } from "@/utils/formatToCurrency";
import { columnsOrder } from "@/resources/columnTables";
import ShowOrderDetail from "../show/ShowOrderDetail";
import { DeleteRIcon, VerifyIcon } from "../Icons";
import { Loader } from "../snnipers/Loader";
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
  Chip,
} from "@nextui-org/react";
import BottomPaginationContent from "../BottomPaginationContent";

const INITIAL_VISIBLE_COLUMNS = [
  "paid",
  "name",
  "createdAt",
  "amount",
  "quantity",
  "actions",
];

export default function TableOrder({
  reduceQuantityProducts,
  downloadPdf,
  deleteOrder,
  orders,
  isLoading,
}) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

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

  const renderCell = useCallback((order, columnKey) => {
    const cellValue = order[columnKey];

    function calcularTotal(lineItems) {
      let total = 0;
      lineItems.forEach((pro) => {
        total += pro.info_order.unit_amount;
      });
      return total;
    }
    function calcularQuantity(lineItems) {
      let total = 0;
      lineItems.forEach((pro) => {
        total += pro.quantity;
      });
      return total;
    }
    const quantity = calcularQuantity(order.line_items);

    // Obtener el cantidad de producto
    const total = calcularTotal(order.line_items);

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col ">
            <p className="text-bold text-tiny text-primary-400 capitalize">
              {order?.name}
            </p>
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
        return isLoading ? (
          <div className="flex items-center pl-[15px]">
            <Loader />
          </div>
        ) : (
          <Chip
            className={`text-tiny capitalize cursor-pointer ${statusColorMap[cellValue]}`}
            startContent={statusSVGMap[cellValue]}
            variant="faded"
            isDisabled={cellValue}
            onClick={() => reduceQuantityProducts(order)}
          >
            {cellValue === false ? "Pendiente" : "Confirmado"}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-3 ">
            <ShowOrderDetail order={order} />
            <Tooltip className="text-error" content="Eliminar">
              <span className="text-lg text-error cursor-pointer active:opacity-50">
                <DeleteRIcon
                  className=" w-[22px] h-[22px]"
                  onClick={(e) => deleteOrder(order)}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
      <div className=" flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total, {orders.length} Ordenes.
          </span>
        </div>
        {/*   <div className="flex flex-col sm:flex-row justify-between gap-3 items-end">
          <div className="flex gap-3 ">
       <Input
            isClearable
            className="w-full sm:max-w-[45%] order-1"
            placeholder="Buscar orden..."
            startContent={<SearchIcon className="mr-1" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          /> 
        </div> */}
      </div>
    );
  }, [filterValue, orders.length, onSearchChange, hasSearchFilter]);

  return (
    <Table
      aria-label="Es una tabla de ventas"
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
        wrapper: "-z-1 sm:h-[calc(100vh-225px)] scroll",
        th: "text-warning uppercase",
      }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columnsOrder}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
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
