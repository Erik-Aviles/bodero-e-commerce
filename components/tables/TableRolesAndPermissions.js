import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  User,
} from "@nextui-org/react";

import BottomPaginationContent from "../BottomPaginationContent";
import { columnsRolesPermissions } from "@/resources/columnTables";
import ModalCategories from "../modals/ModalCategories";
import { removeAccents } from "@/utils/normalized";
import { DeleteRIcon } from "../Icons";
import { capitalize } from "@/utils/utils";

export default function TableRolesAndPermissions({ roleList, deleteCaterory }) {
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    if (!roleList) return [];
    let resultadoFiltrado = [...roleList];

    if (hasSearchFilter) {
      resultadoFiltrado = resultadoFiltrado.filter((objeto) =>
        removeAccents(objeto.name.toLowerCase()).includes(
          removeAccents(filterValue.toLowerCase())
        )
      );
    }
    return resultadoFiltrado;
  }, [roleList, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = useCallback((rol, columnKey) => {
    const cellValue = rol[columnKey];

    switch (columnKey) {
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
        <div className="flex justify-between gap-3 items-end">
          <h4>Roles y Permisos</h4>
          <span className="text-default-400 text-small">
            Total, {roleList ? roleList?.length : 0} Roles.
          </span>
        </div>
      </div>
    );
  }, [filterValue, roleList?.length, onSearchChange, hasSearchFilter]);

  return (
    <Table
      aria-label="Es una tabla de categrias"
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
        wrapper: "-z-1 sm:h-[calc(100vh-350px)] sm:overflow-auto scroll",
        th: "text-warning uppercase",
      }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columnsRolesPermissions}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Sin datos..."} items={items}>
        {(item) => (
          <TableRow key={item.rol}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
