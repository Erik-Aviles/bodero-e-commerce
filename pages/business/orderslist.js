import React, { useContext, useEffect } from "react";
import NotificationContext from "@/context/NotificationContext";
import TableOrderList from "@/components/tables/TableOrderList";
import Spinner from "@/components/snnipers/Spinner";
import useDeleteItem from "@/hooks/useDeleteItem";
import useCustomers from "@/hooks/useCustomers";
import useOrderList from "@/hooks/useOrderList";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import Head from "next/head";
import axios from "axios";

const OrderListPage = withSwal(({ swal }) => {
  const { orderlist, isErrorOrderList, isLoadingOrderList, mutateOrderList } =
    useOrderList();
  const { showNotification } = useContext(NotificationContext);
  const deleteItem = useDeleteItem();
  const { customers, isLoadingCustomers } = useCustomers();

  const verifyOrderDelivery = async (orderId) => {
    if (orderId) {
      const items = {
        delivered: true,
        orderDeliveryDate: Date.now(),
        _id: orderId,
      };
      try {
        await axios.put("/api/orderslist/full", items);
        mutateOrderList();
        showNotification({
          open: true,
          msj: "Pedido ha sido entregado!",
          status: "success",
        });
      } catch (error) {
        console.error(error);
        showNotification({
          open: true,
          msj: "Error al marcar pedido como entregado.",
          status: "error",
        });
      }
    }
  };

  const handleDeleteOrder = (item) => {
    deleteItem({
      swal,
      getItems: mutateOrderList,
      item,
      apiEndpoint: "orderslist",
      itemNameKey: "articulo",
    });
  };

  return (
    <>
      <Head>
        <title>Panel | Lista de pedidos</title>
      </Head>
      <Layout>
        <h3>Panel de lista de pedidos</h3>

        {isLoadingOrderList || !orderlist || isLoadingCustomers ? (
          <Spinner />
        ) : (
          <section className="w-full md:px-4 lg:px-8">
            <TableOrderList
              orders={orderlist}
              customers={customers}
              deleteOrder={handleDeleteOrder}
              verifyOrderDelivery={verifyOrderDelivery}
            />
          </section>
        )}
      </Layout>
    </>
  );
});
export default OrderListPage;
