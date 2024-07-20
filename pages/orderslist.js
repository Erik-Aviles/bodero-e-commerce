import React, { useContext } from "react";
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
  const { customers } = useCustomers();

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

  if (isErrorOrderList) return <div>FalLo al cargar las Ordenes</div>;

  return (
    <>
      <Head>
        <title>Panel | Lista de pedidos</title>
      </Head>
      <Layout>
        <h3>Panel de lista de pedidos</h3>

        {isLoadingOrderList || !orderlist ? (
          <Spinner />
        ) : (
          <section className="max-w-4xl mx-auto mt-4">
            <TableOrderList
              orders={orderlist}
              newCustomers={customers}
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
