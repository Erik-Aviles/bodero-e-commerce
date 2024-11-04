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
import { columnsBanners } from "@/resources/columnTables";
import { DeleteRIcon } from "../Icons";
import ModalBanners from "../modals/ModalBanners";

export default function TableBanner({
  banners,
  mutateBanner,
  handleDeleteBanner,
  companyId,
}) {
  const renderCell = useCallback((banner, columnKey) => {
    const cellValue = banner[columnKey];

    switch (columnKey) {
      case "position":
        return <span>{1}</span>;
      case "description":
        return (
          <div className="min-w-[80px] max-w-[130px] capitalize">
            {cellValue}
          </div>
        );
      case "image":
        return (
          <div className="min-w-[230px]">
            <Image
              radius="sm"
              width={350}
              height={200}
              alt={banner?.description}
              src={cellValue}
            />
             <span className="text-bold text-tiny text-default-400 whitespace-nowrap">{banner?.public_id}</span>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <ModalBanners
              banner={banner}
              companyId={companyId}
              mutateBanner={mutateBanner}
            />
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteRIcon
                  className=" w-[22px] h-[22px]"
                  onClick={() => handleDeleteBanner(banner)}
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
      <TableHeader columns={columnsBanners}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Sin registro..."} items={banners}>
        {(item) => (
          <TableRow key={item.bannerId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
