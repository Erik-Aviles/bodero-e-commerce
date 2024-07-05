import React, { useContext } from "react";
import NotificationContext from "@/context/NotificationContext";
import TableOrderList from "@/components/tables/TableOrderList";
import useCustomers from "@/hooks/useCustomers";
import Spinner from "@/components/snnipers/Spinner";
import { withSwal } from "react-sweetalert2";
import { fetcher } from "@/utils/fetcher";
import Layout from "@/components/Layout";
import Head from "next/head";
import axios from "axios";
import useSWR from "swr";
import useDeleteItem from "@/hooks/useDeleteItem";

export default withSwal((props, ref) => {
  const { swal } = props;
  const deleteItem = useDeleteItem();
  const { showNotification } = useContext(NotificationContext);
  const { newCustomers } = useCustomers();

  const {
    data: orderlist,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/orderslist/full", fetcher, { refreshInterval: 300000 });

  if (error) return <div>FalLo al cargar las Ordenes</div>;

  const verifyOrderDelivery = async (orderId) => {
    if (orderId) {
      const items = {
        delivered: true,
        orderDeliveryDate: Date.now(),
        _id: orderId,
      };
      try {
        await axios.put("/api/orderslist/full", items);
        mutate();
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

  function deleteOrder(item) {
    deleteItem({
      swal,
      getItems: mutate,
      item,
      apiEndpoint: "orderslist",
      itemNameKey: "articulo",
    });
  }

  return (
    <>
      <Head>
        <title>Panel | Lista de pedidos</title>
      </Head>
      <Layout>
        <h3>Panel de lista de pedidos</h3>

        {isLoading || !orderlist ? (
          <Spinner />
        ) : (
          <section className="max-w-4xl mx-auto mt-4">
            <TableOrderList
              orders={orderlist}
              newCustomers={newCustomers}
              fetchOrders={mutate}
              deleteOrder={deleteOrder}
              verifyOrderDelivery={verifyOrderDelivery}
            />
          </section>
        )}
      </Layout>
    </>
  );
});
