import React, { useCallback, useMemo, useState } from "react";
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
  User,
} from "@nextui-org/react";

import { DeleteRIcon, SearchIcon } from "../Icons";
import { columnUser } from "@/resources/columnTables";
import { removeAccents } from "@/utils/normalized";
import ModalUsers from "../modals/ModalUsers";
import BottomPaginationContent from "../BottomPaginationContent";

export default function TableUser({ users, deleteUser }) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    if (!users) return [];
    let resultadoFiltrado = [...users];

    if (hasSearchFilter) {
      resultadoFiltrado = resultadoFiltrado.filter((objeto) =>
        removeAccents(objeto.fullname.toLowerCase()).includes(
          removeAccents(filterValue.toLowerCase())
        )
      );
    }
    return resultadoFiltrado;
  }, [users, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "fullname":
        return (
          <User
            className="flex text-small flex-row-reverse justify-between whitespace-nowrap min-w-[100px]"
            avatarProps={{
              radius: "lg",
              src: user?.avatar[0],
            }}
            description={user?.email.toLowerCase()}
            name={cellValue.toUpperCase()}
          >
            {cellValue}
          </User>
        );
      case "createdAt":
        return (
          <div className="flex flex-col min-w-[140px]">
            <p className="text-bold text-small ">
              {new Date(user?.createdAt).toLocaleString()}
            </p>
            <span className="text-bold text-tiny text-default-400 break-all capitalize">
              {new Date(user?.updatedAt).toLocaleString()}
            </span>
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col min-w-[140px]">
            <p className="text-bold text-small capitalize">
              {cellValue === "user" ? "Secretari@" : "Administrador"}
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
                  onClick={(e) => deleteUser(user)}
                />
              </span>
            </Tooltip>
            <ModalUsers user={user} />
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
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className=" flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-end">
          <div className=" flex items-end gap-4">
            <span className="text-default-400 text-small">
              Total, {users.length} Usuarios.
            </span>
            <ModalUsers />
          </div>
          <Input
            isClearable
            className="w-full sm:max-w-[45%] order-1"
            placeholder="Buscar nombre"
            startContent={<SearchIcon className="mr-1" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [filterValue, users.length, onSearchChange, hasSearchFilter]);

  return (
    <Table
      aria-label="Es una tabla de usuarios"
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
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={columnUser}>
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
