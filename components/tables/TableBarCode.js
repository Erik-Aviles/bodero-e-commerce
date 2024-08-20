import React, { useCallback } from "react";
import useProductSelectionBarCode from "@/hooks/useProductSelectionBarCode";
import { statusColorMap, statusSVGMap } from "@/resources/statusMap";
import BottomPaginationContent from "../BottomPaginationContent";
import { DeleteRIcon, PrintIcon } from "@/components/Icons";
import { columnsBarCode } from "@/resources/columnTables";
import BarCodeForm from "../forms/BarCodeForm";
import PrintBarcode from "../PrintBarcode";
import ReactToPrint from "react-to-print";
import Barcode from "react-barcode";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
} from "@nextui-org/react";

export default function TableBarCode({ products }) {
  const {
    topContent,
    items,
    printRef,
    page,
    setPage,
    pages,
    handlePrintBarCodes,
    handleDeleteProduct,
    onNextPage,
    onPreviousPage,
  } = useProductSelectionBarCode(products);

  const renderCell = useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "status":
        return (
          <Chip
            className={`text-tiny cursor-pointer capitalize ${statusColorMap[cellValue]}`}
            startContent={statusSVGMap[cellValue]}
            variant="faded"
            isDisabled={cellValue}
          >
            {cellValue === false ? "Pendiente" : "Imprimido"}
          </Chip>
        );
      case "title":
        return (
          <div className="uppercase min-w-[230px] max-w-[315px]">
            {cellValue}
          </div>
        );
      case "code":
        return <div className="whitespace-nowrap">{cellValue}</div>;
      case "barCode":
        return (
          <div className="whitespace-nowrap">
            <Barcode
              value={product.code}
              width={1}
              height={50}
              fontSize={12}
              font="mono"
              background="#fff"
            />
          </div>
        );

      case "actions":
        return (
          <div className="flex items-center gap-3">
            <Tooltip className="text-error" content="Eliminar">
              <span
                className="text-lg text-error cursor-pointer active:opacity-50"
                onClick={() => handleDeleteProduct(product)}
              >
                <DeleteRIcon className=" w-[22px] h-[22px]" />
              </span>
            </Tooltip>
            <Tooltip
              className="text-sky-700 "
              color="#05aae1"
              content="Imprimir"
            >
              <span
                className="text-lg text-sky-700 cursor-pointer active:opacity-50"
                onClick={() => handlePrintBarCodes(product)}
              >
                <ReactToPrint
                  trigger={() => {
                    return (
                      <PrintIcon className=" w-[22px] h-[22px] fill-sky-700" />
                    );
                  }}
                  content={() => printRef.current[product.code]}
                />

                <div className="hidden">
                  <PrintBarcode
                    ref={(el) => (printRef.current[product.code] = el)}
                    product={product}
                  />
                </div>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Esto es una tabla de codigo de barra"
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
        td: "border-b border-warning",
      }}
      topContent={<BarCodeForm {...topContent} />}
      topContentPlacement="outside"
    >
      <TableHeader columns={columnsBarCode}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Sin registro..."} items={items}>
        {(item) => (
          <TableRow key={item.code}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
