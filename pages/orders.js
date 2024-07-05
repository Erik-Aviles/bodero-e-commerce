import React, { useContext, useEffect, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import TableOrder from "@/components/tables/TableOrder";
import Spinner from "@/components/snnipers/Spinner";
import useDeleteItem from "@/hooks/useDeleteItem";
import useProducts from "@/hooks/useProducts";
import { withSwal } from "react-sweetalert2";
import { fetcher } from "@/utils/fetcher";
import Layout from "@/components/Layout";
import Head from "next/head";
import axios from "axios";
import useSWR from "swr";

export default withSwal((props, ref) => {
  const { swal } = props;
  const { getProducts } = useProducts();
  const { showNotification } = useContext(NotificationContext);
  const deleteItem = useDeleteItem();

  const {
    data: minimalProducts,
    error: errorGetMinimal,
    mutate: getMinimal,
  } = useSWR("/api/products/minimal", fetcher);

  const {
    data: orders,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/orders/full", fetcher);

  if (errorGetMinimal) return <div>FalLo al cargar los Productos</div>;

  if (error) return <div>FalLo al cargar las Ordenes</div>;

  const reduceQuantityProducts = async (order) => {
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

    if (productUpdates.length > 0) {
      try {
        await Promise.all(
          productUpdates.map((update) =>
            axios.put("/api/products/full", update)
          )
        );
        showNotification({
          open: true,
          msj: "Pedido ha sido aprobado!",
          status: "success",
        });
        getProducts();
        getMinimal();
        if (orderId) {
          const items = {
            paid: true,
            _id: orderId,
          };
          try {
            await axios.put("/api/orders/full", items);
            mutate();
          } catch (error) {
            showNotification({
              open: true,
              msj: "Error al actualizar el pedido.",
              status: "error",
            });
          }
        }
      } catch (error) {
        showNotification({
          open: true,
          msj: "Error al actualizar los productos.",
          status: "error",
        });
      }
    } else {
      showNotification({
        open: true,
        msj: "No se encontraron productos para actualizar.",
        status: "error",
      });
    }
  };

  function deleteOrder(item) {
    deleteItem({
      swal,
      getItems: mutate,
      item,
      apiEndpoint: "orders",
      itemNameKey: "name",
    });
  }

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

        {isLoading || !orders ? (
          <Spinner />
        ) : (
          <section className="max-w-4xl mx-auto mt-4">
            <TableOrder
              downloadPdf={downloadPdf}
              reduceQuantityProducts={reduceQuantityProducts}
              orders={orders}
              deleteOrder={deleteOrder}
            />
          </section>
        )}
      </Layout>
    </>
  );
});
