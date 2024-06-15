import React, { useContext, useEffect, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import { withSwal } from "react-sweetalert2";
import Spinner from "@/components/Spinner";
import { capitalize } from "@/utils/utils";
import { fetcher } from "@/utils/fetcher";
import Layout from "@/components/Layout";
import Head from "next/head";
import axios from "axios";
import useSWR from "swr";
import TableOrderList from "@/components/tables/TableOrderList";
import useCustomers from "@/hooks/useCustomers";

export default withSwal((props, ref) => {
  const { swal } = props;
  const { showNotification } = useContext(NotificationContext);
  const [newOrdersList, setNewOrdersList] = useState([]);
  const { newCustomers, getCustomers } = useCustomers();

  const {
    data: orderlist,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/orderslist/full", fetcher);

  useEffect(() => {
    if (orderlist) {
      setNewOrdersList(orderlist);
    }
  }, [orderlist]);

  useEffect(() => {
    if (newCustomers) {
      getCustomers();
    }
  }, []);

  const getOrdersList = async () => {
    try {
      const response = await axios.get("/api/orderslist/full");
      setNewOrdersList(response.data);
      mutate(); // Actualizar manualmente la caché de SWR
    } catch (error) {
      console.error("Error al obtener las ordenes:", error);
    }
  };

  if (error) return <div>FalLo al cargar las Ordenes</div>;

  const verifyOrderDelivery = (orderId) => {
    if (orderId) {
      const data = {
        delivered: true,
        orderDeliveryDate: Date.now(),
      };
      try {
        axios.put("/api/orderslist/full", { ...data, _id: orderId });
        showNotification({
          open: true,
          msj: "Pedido ha sido entregado!",
          status: "success",
        });
        getOrdersList();
      } catch (error) {
        console.error(error);
      }
    }
  };

  function deleteOrder(order) {
    swal
      .fire({
        title: "Estas seguro?",
        text: `Eliminar el pedido: "${capitalize(
          order?.articulo.length > 30
            ? order?.articulo.substring(0, 30) + "..."
            : order?.articulo
        )} "Esta acción no se puede deshacer."`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#fe0000",
        confirmButtonText: "Si, Eliminar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = order;
          await axios.delete("/api/orderslist/full?_id=" + _id);
          showNotification({
            open: true,
            msj: `Pedido de "${capitalize(
              order?.customer
            )}", eliminado con exito!`,
            status: "success",
          });
        }
        getOrdersList();
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
              orders={newOrdersList}
              newCustomers={newCustomers}
              fetchOrders={getOrdersList}
              getCustomers={getCustomers}
              deleteOrder={deleteOrder}
              verifyOrderDelivery={verifyOrderDelivery}
            />
          </section>
        )}
      </Layout>
    </>
  );
});
