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
} from "@nextui-org/react";

import { DeleteRIcon, EdithIcon, PlusIcon, SearchIcon } from "./Icons";
import { columnsCategory } from "@/resources/data";
import { capitalize } from "@/utils/utils";
import Link from "next/link";
import ModalCategories from "./ModalCategories";

export default function TableCategory({
  deleteCaterory,
  editCategory,
  categories,
  fetchCategories,
}) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let resultadoFiltrado = [...categories];

    if (hasSearchFilter) {
      resultadoFiltrado = resultadoFiltrado.filter((objeto) =>
        objeto.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return resultadoFiltrado;
  }, [categories, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = useCallback((category, columnKey) => {
    const cellValue = category[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col ">
            <p className=" break-words text-bold text-small capitalize">
              {capitalize(cellValue)}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-around">
            <Tooltip content="Editar">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EdithIcon
                  onClick={() => editCategory(category)}
                  fill="secondary"
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteRIcon onClick={(e) => deleteCaterory(category)} />
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
            Total, {categories.length} Categorias
          </span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-end">
          <div className="flex gap-3 ">
            <Button
              href={"/products/new"}
              as={Link}
              color="primary"
              startContent={<PlusIcon />}
            >
              Producto
            </Button>
            <ModalCategories fetchCategories={fetchCategories} />
          </div>
          <Input
            isClearable
            className="w-full sm:max-w-[45%] order-1"
            placeholder="Buscar categorias"
            startContent={<SearchIcon className="mr-1" />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
      </div>
    );
  }, [filterValue, categories.length, onSearchChange, hasSearchFilter]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los elementos seleccionados"
            : `${selectedKeys.size} de ${categories.length} selección`}
        </span>
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
  }, [selectedKeys, items.length, page, pages]);

  return (
    <Table
      aria-label="Es una tabla de categrias"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "min-h-[280px]  ",
        th: "text-warning uppercase",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={columnsCategory}>
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
