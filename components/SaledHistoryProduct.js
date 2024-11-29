import React from "react";
import useProducts from "@/hooks/useProducts";
import TableSaledHistoryProduct from "./tables/TableSaledHistoryProduct";
import useOrder from "@/hooks/useOrder";
import Spinner from "./snnipers/Spinner";

const SaledHistoryProduct = () => {
  const { products, isErrorProducts, isLoadingProducts, mutateProducts } =
    useProducts();
  const { orders, isErrorOrders, isLoadingOrders, mutateOrders } = useOrder();
  return (
    <>
      {isLoadingProducts || isLoadingOrders || !products ? (
        <Spinner className="pt-3 pb-3" />
      ) : (
        <TableSaledHistoryProduct products={products} orders={orders} />
      )}
    </>
  );
};

export default SaledHistoryProduct;
