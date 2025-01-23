import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import BottomPaginationContent from "../BottomPaginationContent";
import { columnsSalesHistoryProdutc } from "@/resources/columnTables";

import { ErrorIcon, SearchIcon, VerifyIcon } from "../Icons";
import { capitalize } from "@/utils/utils";
import { removeAccents, removePluralEnding } from "@/utils/normalized";
import { stopwords } from "@/resources/stopwordsData";

export default function TableSaledHistoryProduct({ orders, products }) {
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [matchingOrders, setMatchingOrders] = useState([]);
  const [searchedProduct, setSearchedProduct] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const pages = Math.ceil(matchingOrders.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return matchingOrders.slice(start, end);
  }, [page, matchingOrders, rowsPerPage]);

  const handleSearchChange = (value) => {
    setQuery(value);
    const normalizedQuery = removeAccents(value.toLowerCase())
      .split(" ")
      .filter((part) => !stopwords.includes(part))
      .map(removePluralEnding);

    if (value.length >= 3) {
      const filteredSuggestions = products.filter((item) => {
        const fields = [
          item.title,
          item.code,
          item.codeEnterprise,
          item.codeWeb,
          item.brand,
          ...(item.compatibility || []).map((compat) => compat.model),
          ...(item.compatibility || []).map((compat) => compat.title),
        ].map((field) => removeAccents(field.toLowerCase()));

        return normalizedQuery.every((part) =>
          fields.some((field) => field.includes(part))
        );
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectProduct = (product) => {
    setQuery(product.title);
    setSearchedProduct({
      name: product.title,
      code: product.code,
    });
    setSuggestions([]);
    setIsSearchPerformed(false);
  };

  const handleSearchInOrders = () => {
    if (query) {
      setQuery("");
      setIsSearchPerformed(true); // Marca la búsqueda como realizada
    }

    if (!searchedProduct) return;
    const matchingOrders = orders.filter((order) =>
      order.line_items.some(
        (item) =>
          item.info_order.product_data.code === searchedProduct.code ||
          item.info_order.product_data.name === searchedProduct.name
      )
    );
    let sumQuantity = 0;

    const mappedOrders = matchingOrders.map((order) => {
      const matchingItem = order.line_items.find(
        (item) => item.info_order.product_data.code === searchedProduct.code
      );

      // Sumar la cantidad del producto al total
      if (matchingItem) {
        sumQuantity += matchingItem.quantity;
      }

      return {
        orderId: order._id,
        updatedAt: order.updatedAt,
        customer: {
          name: order.name,
          phone: order.phone,
          email: order.email,
        },
        product: {
          code: searchedProduct.code,
          productId: matchingItem?.info_order.product_data.id,
          quantity: matchingItem?.quantity,
          price: matchingItem?.info_order.product_data.price,
        },
      };
    });

    setMatchingOrders(mappedOrders);

    setTotalQuantity(sumQuantity);
  };

  const renderCell = useCallback((item, columnKey) => {
    if (!item) return null;
    switch (columnKey) {
      case "customer":
        return (
          <div className="flex flex-col ">
            <p className="text-primary-400 text-bold text-tiny break-words whitespace-nowrap capitalize">
              {"Nombre: "}
              <span className="pl-2 text-default-400">
                {item.customer?.name}
              </span>
            </p>
            <p className="text-primary-400 text-bold text-tiny break-words whitespace-nowrap capitalize">
              {"Correo: "}
              <span className="pl-2 text-default-400">
                {item.customer?.email}
              </span>
            </p>
            <p className="text-primary-400 text-bold text-tiny break-words whitespace-nowrap capitalize">
              {"Teléfono: "}
              <span className="pl-2 text-default-400">
                {item.customer?.phone}
              </span>
            </p>
          </div>
        );
      case "updatedAt":
        return <div>{new Date(item?.updatedAt).toLocaleString()}</div>;
      case "productCode":
        return <div>{item.product?.code}</div>;
      case "quantity":
        return <div>{item.product?.quantity}</div>;
      case "price":
        return <div>${item.product?.price?.toFixed(2)}</div>;
      case "order":
        return <div>{item?.orderId}</div>;
      default:
        return item[columnKey] || "---";
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

  const handleClear = () => {
    setQuery("");
    setIsSearchPerformed(false);
  };

  const topContent = useMemo(
    () => (
      <div className="relative pt-3 flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex basis-1/2">
            {searchedProduct && (
              <div className="w-full flex justify-between gap-2 p-2 rounded-lg bg-black text-tiny">
                <div className="flex gap-2 lg:items-center justify-between">
                  <p className="flex gap-1 text-white">
                    <strong>Nombre: </strong>

                    <span className="text-default">
                      {capitalize(searchedProduct?.name)}
                    </span>
                  </p>
                  <p className="flex gap-1 text-white">
                    <strong>Código: </strong>

                    <span className="text-default">
                      {searchedProduct?.code}
                    </span>
                  </p>
                </div>
                {isSearchPerformed &&
                  (matchingOrders.length > 0 ? (
                    <VerifyIcon />
                  ) : (
                    <ErrorIcon fill="#ff0000" />
                  ))}
              </div>
            )}
          </div>
          <div className="flex gap-2 basis-1/2">
            <div className="basis-full">
              <Input
                value={query}
                placeholder="Buscar por nombre o código"
                classNames={{ base: "" }}
                startContent={<SearchIcon />}
                onClear={handleClear}
                onValueChange={handleSearchChange}
              />
            </div>
            {suggestions.length > 0 && (
              <section className="absolute p-2 top-full right-0 lg:w-1/2 mt-3 border shadow-md bg-black z-50 rounded-md">
                <ul className="overflow-auto scroll max-h-60 transition-opacity duration-300 opacity-100 flex flex-col gap-2">
                  {suggestions.map((item) => (
                    <li
                      key={item?.id}
                      onClick={() => handleSelectProduct(item)}
                      className="py-2 pl-2 mr-2 cursor-pointer border rounded-md border-[#97a8bc] text-white hover:text-black hover:bg-gray-100 hover:rounded-md capitalize"
                    >
                      <span className="text-warning font-bold font-mono">{`${item?.code}: `}</span>
                      <span> {item?.title}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <button
              disabled={!query || isSearchPerformed}
              onClick={handleSearchInOrders}
              className={`p-2 h-fit rounded text-white text-sm ${
                query && !isSearchPerformed
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isSearchPerformed ? "Hecho" : "Buscar"}
            </button>
          </div>
        </div>
        <span className="text-default-400 text-small">
          {isSearchPerformed
            ? totalQuantity !== 0
              ? `Total, ${totalQuantity}  Vendidos.`
              : "Producto no registra venta."
            : "Total ventas."}
        </span>
      </div>
    ),
    [query, suggestions, searchedProduct]
  );

  return (
    <Table
      aria-label="Historial de ventas por producto"
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
        wrapper: "-z-1 sm:h-[calc(100vh-400px)] sm:overflow-auto scroll ",
        th: "text-warning uppercase",
        td: "border-b border-warning text-tiny",
      }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columnsSalesHistoryProdutc}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Sin Registro..."}>
        {items.map((order) => (
          <TableRow key={`${order.orderId}-${order.product.productId}`}>
            {(columnKey) => (
              <TableCell>{renderCell(order, columnKey)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
