import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";

import { DeleteRIcon, EdithIcon } from "./Icons";
import { columnsCategory } from "@/resources/data";
import { capitalize } from "@/utils/utils";

export default function TableCategory({
  categories,
  deleteCaterory,
  editCategory,
}) {
  const renderCell = useCallback((category, columnKey) => {
    const cellValue = category[columnKey];

    switch (columnKey) {
      case "description":
        return (
          <div className="flex flex-col ">
            <p className="min-w-[250px] max-w-[280px] break-words text-bold text-small capitalize">
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

  return (
    <Table aria-label="Es una tabla de categrias">
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
      <TableBody items={categories}>
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
