import React, { useCallback, useMemo, useState } from "react";
import { removeAccents, removePluralEnding } from "@/utils/normalized";
import { statusColorMap, statusSVGMap } from "@/resources/statusMap";
import ModalOrderListProduct from "../modals/ModalOrderListProduct";
import { columnsOrdersList } from "@/resources/columnTables";
import { justFirstWord } from "@/utils/justFirstWord";
import { stopwords } from "@/resources/stopwordsData";
import { DeleteRIcon, SearchIcon } from "../Icons";
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
  Chip,
} from "@nextui-org/react";
import BottomPaginationContent from "../BottomPaginationContent";

export default function TableOrderList({
  verifyOrderDelivery,
  orders,
  customers,
  deleteOrder,
}) {
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    if (!orders) return [];
    let resultadoFiltrado = [...orders];

    const searchParts = removeAccents(filterValue.toLowerCase())
      .split(" ")
      .filter((part) => !stopwords.includes(part))
      .map((part) => removePluralEnding(part));

    if (hasSearchFilter) {
      resultadoFiltrado = resultadoFiltrado.filter((item) => {
        const articulo = removeAccents(item.articulo.toLowerCase());
        const customer = removeAccents(item.customer.toLowerCase());

        const matchesAllParts = searchParts.every((part) => {
          return articulo.includes(part) || customer.includes(part);
        });
        return matchesAllParts;
      });
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

      const filteredResult = customers?.filter((objeto) =>
        objeto?._id.includes(order?.customer)
      );

      switch (columnKey) {
        case "customer":
          return (
            <div className="flex flex-col ">
              {filteredResult?.length > 0 ? (
                <>
                  <p className="text-bold text-tiny text-primary-400 whitespace-nowrap">
                    {`${justFirstWord(capitalize(filteredResult[0]?.name))} ` +
                      `${justFirstWord(
                        capitalize(filteredResult[0]?.lastname)
                      )}`}
                  </p>
                  <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                    {filteredResult[0]?.phone
                      ? `Cel: ${filteredResult[0].phone}`
                      : "Sin teléfono"}
                  </span>
                  <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                    {filteredResult[0]?.identifications
                      ? `ID: ${capitalize(filteredResult[0]?.identifications)}`
                      : "Sin cedula"}
                  </span>
                  <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                    <span className="text-bold text-tiny text-default-400"></span>
                    {filteredResult[0]?.address
                      ? `Dir: ${capitalize(filteredResult[0]?.address)}`
                      : "Sin dirección"}
                  </span>
                </>
              ) : (
                <p className=" break-words text-error text-bold text-tiny capitalize">
                  {"Cliente"}
                </p>
              )}
            </div>
          );

        case "articulo":
          return (
            <div className="flex flex-col min-w-[150px] max-w-[315px]">
              <p className=" break-words text-bold text-tiny capitalize">
                {cellValue}
              </p>
            </div>
          );
        case "orderEntryDate":
          return (
            <div className="flex flex-col">
              <p className=" break-words text-bold text-tiny whitespace-nowrap">
                {new Date(order?.orderEntryDate).toLocaleString(
                  ("es-ES", { timeZone: "America/Guayaquil" })
                )}
              </p>
            </div>
          );
        case "delivered":
          return (
            <div className="flex flex-col gap-1">
              {cellValue === true && (
                <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
                  {new Date(order?.orderDeliveryDate).toLocaleString(
                    ("es-ES", { timeZone: "America/Guayaquil" })
                  )}
                </span>
              )}
              <Chip
                className={`text-tiny cursor-pointer ${statusColorMap[cellValue]}`}
                startContent={statusSVGMap[cellValue]}
                variant="bordered"
                isDisabled={cellValue}
                onClick={() => verifyOrderDelivery(order?._id)}
              >
                {cellValue === false ? "Pendiente" : "Entregado"}
              </Chip>
            </div>
          );
        case "actions":
          return (
            <div className="flex items-center gap-3 ">
              <ModalOrderListProduct order={order} />
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
    },
    [customers]
  );

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
          <ModalOrderListProduct />
        </div>

        <Input
          isClearable
          className="w-full sm:max-w-[45%] order-1"
          placeholder="Búsqueda por nombre o cedula..."
          startContent={<SearchIcon className="mr-1" />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
      </div>
    );
  }, [filterValue, orders.length, onSearchChange, hasSearchFilter]);

  return (
    <Table
      aria-label="Es una tabla de pedidos"
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
        wrapper: "-z-1 sm:h-[calc(100vh-315px)] sm:overflow-auto scroll",
        th: "text-warning uppercase",
      }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columnsOrdersList}>
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
