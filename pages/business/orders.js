import React, { useContext } from "react";
import NotificationContext from "@/context/NotificationContext";
import TableOrder from "@/components/tables/TableOrder";
import Spinner from "@/components/snnipers/Spinner";
import useDeleteItem from "@/hooks/useDeleteItem";
import useProducts from "@/hooks/useProducts";
import { withSwal } from "react-sweetalert2";
import { fetcher } from "@/utils/fetcher";
import Layout from "@/components/Layout";
import useOrder from "@/hooks/useOrder";
import Head from "next/head";
import axios from "axios";
import useSWR from "swr";

const OrdersPage = withSwal(({ swal }) => {
  const { orders, isErrorOrders, isLoadingOrders, mutateOrders } = useOrder();
  const { showNotification } = useContext(NotificationContext);
  const { mutateProducts } = useProducts();
  const deleteItem = useDeleteItem();
  const {
    data: minimalProducts,
    error: errorGetMinimal,
    mutate: getMinimal,
  } = useSWR("/api/products/minimal", fetcher);

  const refreshOrders = async () => {
    try {
      swal.fire({
        title: "Actualizando...",
        text: "Espere mientras se refrescan los datos!",
        allowOutsideClick: false,
        didOpen: async () => {
          swal.showLoading();
          await mutateProducts();
          await mutateOrders();
          await getMinimal();
          swal.close();
          showNotification({
            open: true,
            msj: "Datos han sido actualizados correctamente!",
            status: "success",
          });
        },
      });
    } catch (error) {
      swal.close();
      showNotification({
        open: true,
        msj: "Error al actualizar los Datos.",
        status: "error",
      });
    }
  };

  const reduceQuantityProducts = async (order) => {
    const orderId = order._id;

    if (!minimalProducts || minimalProducts.length === 0) {
      return showNotification({
        open: true,
        msj: "Advertencia: Aun no se cargaron los datos necesarios.",
        status: "warning",
      });
    }

    const productUpdates = order.line_items
      .map((item) => {
        const product = minimalProducts.find(
          (prod) => prod._id === item.info_order.product_data.id
        );

        if (!product) {
          showNotification({
            open: true,
            msj: `Error: No se encontró el producto con ID ${item.info_order.product_data.id}.`,
            status: "error",
          });
          return null;
        }

        const newstock = product.quantity - item.quantity;
        return {
          quantity: newstock,
          quantityUpdated: Date.now(),
          _id: product._id,
          title: product.title,
        };
      })
      .filter(Boolean);

    // Identificar productos con stock negativo
    const negativeStockProducts = productUpdates.filter(
      (element) => element.quantity < 0
    );

    if (negativeStockProducts.length > 0) {
      const productNames = negativeStockProducts
        .map((product) => product._id)
        .join(", ");

      return showNotification({
        open: true,
        msj: `¡Revisar pedido! Hay productos sin stock! ${productNames}`,
        status: "error",
      });
    }

    try {
      swal.fire({
        title: "Procesando...",
        text: "Espere hasta que se termine de procesar",
        allowOutsideClick: false,
        didOpen: async () => {
          swal.showLoading();

          const response = await Promise.allSettled(
            productUpdates.map((update) =>
              axios.put("/api/products/full", update)
            )
          );

          const allSuccess = response.every(
            (res) => res.status === "fulfilled" && res.value.status === 200
          );

          if (allSuccess && orderId) {
            const items = {
              paid: true,
              _id: orderId,
            };

            await axios.put("/api/orders/full", items);
            mutateOrders();

            showNotification({
              open: true,
              msj: "¡Pedido ha sido aprobado!",
              status: "success",
            });

            mutateProducts();
            getMinimal();
            swal.close();
          } else {
            throw new Error("Error al confirmar el pedido.");
          }
        },
      });
    } catch (error) {
      swal.close();
      showNotification({
        open: true,
        msj: error.message || "Error durante el proceso.",
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
              refreshOrders={refreshOrders}
              reduceQuantityProducts={reduceQuantityProducts}
              deleteOrder={handleDeleteOrder}
              downloadPdf={downloadPdf}
              orders={orders}
            />
          </section>
        )}
      </Layout>
    </>
  );
});
export default OrdersPage;

/* if (product) {
  const newstock = product.quantity - item.quantity;
  return {
    quantity: newstock,
    quantityUpdated: Date.now(),
    _id: product._id,
    title: product.title,
  };
} */
