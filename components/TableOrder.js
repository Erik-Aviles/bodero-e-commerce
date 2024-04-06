import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  getKeyValue,
  Pagination,
  Button,
  Input,
  Chip,
} from "@nextui-org/react";

import {
  DeleteRIcon,
  DownloadIcon,
  EyeIcon,
  PlusIcon,
  SearchIcon,
  VerifyIcon,
} from "./Icons";
import { columnsOrder } from "@/resources/data";
import { capitalize } from "@/utils/utils";
import Link from "next/link";
import ShowOrderDetail from "./ShowOrderDetail";
import { formatToCurrency } from "@/utils/formatToCurrency";

const statusColorMap = {
  true: "success",
  false: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "createdAt",
  "amount",
  "quantity",
  "paid",
  "actions",
];

export default function TableOrder({
  disminuirCantidadProductos,
  downloadPdf,
  orders,
  deleteOrder,
}) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columnsOrder.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
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
    console.log(order._id);

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col ">
            <p className="text-bold text-tiny text-primary-400">
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
        return (
          <Chip
            className="text-tiny py-[0.5px] px-1 cursor-pointer"
            startContent={cellValue === true ? <VerifyIcon size={18} /> : ""}
            variant="faded"
            isDisabled={cellValue === true ? true : false}
            color={statusColorMap[order?.paid]}
            onClick={() => disminuirCantidadProductos(order)}
          >
            {cellValue === false ? "No" : "Sí"}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center justify-between gap-2 ">
            <div className="flex gap-3 ">
              <ShowOrderDetail order={order} />
            </div>
            <Tooltip color="danger" content="Eliminar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteRIcon onClick={(e) => deleteOrder(order)} />
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

  const bottomContent = useMemo(() => {
    return (
      <div className="-z-10 py-2 px-2 flex justify-between items-center">
        <Pagination
          className=""
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
  }, [selectedKeys, items.length, page, pages]);
  return (
    <Table
      aria-label="Es una tabla de categrias"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[440px]",
        th: "text-warning uppercase",
      }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={headerColumns}>
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
