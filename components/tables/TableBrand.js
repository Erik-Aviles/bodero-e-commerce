import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Image,
} from "@nextui-org/react";
import { DeleteRIcon } from "../Icons";
import ModalBrands from "../modals/ModalBrands";
import { columnsBrands } from "@/resources/columnTables";

export default function TableBrand({
  brands,
  mutateBrand,
  handleDeleteBrand,
  companyId,
}) {

  const renderCell = useCallback((brand, columnKey) => {
    const cellValue = brand[columnKey];

    switch (columnKey) {
      case "sort":
        return (
          <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
            {""}
          </span>
        );
      case "name":
        return (
          <div className="min-w-[80px] max-w-[130px] uppercase">
            {cellValue}
          </div>
        );
      case "image":
        return (
          <div className="min-w-[230px]">
            <Image
              radius="sm"
              width={90}
              height={90}
              alt={brand?.name}
              src={cellValue}
            />
            <span className="text-bold text-tiny text-default-400 whitespace-nowrap">
              {brand?.public_id}
            </span>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <ModalBrands
              brand={brand}
              companyId={companyId}
              mutateBrand={mutateBrand}
            />
            <Tooltip color="danger" content="Eliminar marca">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteRIcon
                  className=" w-[22px] h-[22px]"
                  onClick={() => handleDeleteBrand(brand)}
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columnsBrands}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Sin registro..."} items={brands}>
        {(item) => (
          <TableRow key={item.brandId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
