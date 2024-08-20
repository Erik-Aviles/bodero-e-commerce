import React, { useContext } from "react";
import NotificationContext from "@/context/NotificationContext";
import TableOrder from "@/components/tables/TableOrder";
import Spinner from "@/components/snnipers/Spinner";
import useDeleteItem from "@/hooks/useDeleteItem";
import useProducts from "@/hooks/useProducts";
import { withSwal } from "react-sweetalert2";
import useLoading from "@/hooks/useLoading";
import { fetcher } from "@/utils/fetcher";
import Layout from "@/components/Layout";
import useOrder from "@/hooks/useOrder";
import Head from "next/head";
import axios from "axios";
import useSWR from "swr";

const OrdersPage = withSwal(({ swal }) => {
  const { isLoading, startLoading, finishtLoading } = useLoading();
  const { orders, isErrorOrders, isLoadingOrders, mutateOrders } = useOrder();
  const { showNotification } = useContext(NotificationContext);
  const { mutateProducts } = useProducts();
  const deleteItem = useDeleteItem();
  const {
    data: minimalProducts,
    error: errorGetMinimal,
    mutate: getMinimal,
  } = useSWR("/api/products/minimal", fetcher);

  const reduceQuantityProducts = async (order) => {
    startLoading();
    const orderId = order._id;
    const productUpdates = order.line_items
      .map((item) => {
        const product = minimalProducts.find(
          (prod) => prod._id === item.info_order.product_data.id
        );

        if (product) {
          const newstock = product.quantity - item.quantity;
          const data = {
            quantity: newstock,
            quantityUpdated: Date.now(),
            _id: product._id,
          };
          return data;
        }
        return null;
      })
      .filter(Boolean);

    const verify = productUpdates.some((element) => element.quantity < 0);

    if (verify) {
      return showNotification({
        open: true,
        msj: "Revisar pedido! Hay productos sin stock!",
        status: "error",
      });
    }
    try {
      await Promise.all(
        productUpdates.map((update) => axios.put("/api/products/full", update))
      );
      showNotification({
        open: true,
        msj: "Pedido ha sido aprobado!",
        status: "success",
      });
      mutateProducts();
      getMinimal();
      if (orderId) {
        const items = {
          paid: true,
          _id: orderId,
        };
        try {
          await axios.put("/api/orders/full", items);
          mutateOrders();
        } catch (error) {
          showNotification({
            open: true,
            msj: "Error al actualizar el pedido.",
            status: "error",
          });
        }
      }
      finishtLoading();
      console.log("Respuesta completada", isLoading);
    } catch (error) {
      showNotification({
        open: true,
        msj: "Error al actualizar los productos.",
        status: "error",
      });
    }
  };

  const handleDeleteOrder = (item) => {
    deleteItem({
      swal,
      getItems: mutateOrders,
      item,
      apiEndpoint: "orders",
      itemNameKey: "name",
    });
  };

  function downloadPdf() {
    showNotification({
      open: true,
      msj: `Descargando pdf!`,
      status: "success",
    });
  }

  return (
    <>
      <Head>
        <title>Panel | Ordenes</title>
      </Head>
      <Layout>
        <h3>Panel de ordenes</h3>

        {isLoadingOrders || !orders ? (
          <Spinner />
        ) : (
          <section className="w-full md:px-4 lg:px-8">
            <TableOrder
              reduceQuantityProducts={reduceQuantityProducts}
              deleteOrder={handleDeleteOrder}
              downloadPdf={downloadPdf}
              isLoading={isLoading}
              orders={orders}
            />
          </section>
        )}
      </Layout>
    </>
  );
});
export default OrdersPage;
