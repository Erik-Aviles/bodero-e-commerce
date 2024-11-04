import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  Image,
} from "@nextui-org/react";

import BottomPaginationContent from "../BottomPaginationContent";
import { columnsCategory } from "@/resources/columnTables";
import ModalCategories from "../modals/ModalCategories";
import { removeAccents } from "@/utils/normalized";
import { DeleteRIcon, SearchIcon } from "../Icons";
import { capitalize } from "@/utils/utils";

export default function TableCategory({ categories, deleteCaterory }) {
  const inpCatRef = useRef(null); // Hook para mantener el ref del input
  
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const [page, setPage] = useState(1);

  const focusInput = () => {
    if (inpCatRef.current) {
      inpCatRef.current.focus(); // Enfocar el input cuando el modal se cierre
    }
  };

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let resultadoFiltrado = [...categories];

    if (hasSearchFilter) {
      resultadoFiltrado = resultadoFiltrado.filter((objeto) =>
        removeAccents(objeto.name.toLowerCase()).includes(
          removeAccents(filterValue.toLowerCase())
        )
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
    console.log(category)

    switch (columnKey) {
      case "name":
        return (
          <div className="min-w-[80px] max-w-[130px] capitalize">
            {capitalize(cellValue)}
          </div>
        );
      case "image":
        return (
          <div className="">
            <Image
              radius="sm"
              width={90}
              height={90}
              alt={category?.name}
              src={cellValue?.link}
            />
            <span className="text-bold text-tiny text-default-400 whitespace-nowrap">{category?.image?.publicId}</span>
          </div>
        );
      case "createdAt":
        return (
          <div className="flex flex-col min-w-[200px]">
            <p className="text-bold text-small ">
              {new Date(category?.createdAt).toLocaleString()}
            </p>
            <span className="text-bold text-tiny text-default-400 break-all">
              {new Date(category?.updatedAt).toLocaleString()}
            </span>
          </div>
        );
      case "description":
        return (
          <div className="flex flex-col ">
            <p className="min-w-[250px] max-w-[280px] break-words text-bold text-small capitalize">
              {cellValue}
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
                  onClick={() => deleteCaterory(category)}
                />
              </span>
            </Tooltip>
            <ModalCategories category={category} focusInput={focusInput}/>
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
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-end">
          <div className=" flex items-end gap-4">
            <span className="text-default-400 text-small">
              Total, {categories.length} Categorias.
            </span>
            <ModalCategories focusInput={focusInput} />
          </div>
          <Input
            ref={inpCatRef}
            autoFocus
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
        wrapper: "-z-1 sm:h-[calc(100vh-250px)] sm:overflow-auto scroll",
        th: "text-warning uppercase",
      }}
      topContent={topContent}
      topContentPlacement="outside"
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
