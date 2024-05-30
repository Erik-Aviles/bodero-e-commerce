import React, { useContext, useEffect, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import TableOrder from "@/components/TableOrder";
import { withSwal } from "react-sweetalert2";
import Spinner from "@/components/Spinner";
import { capitalize } from "@/utils/utils";
import { fetcher } from "@/utils/fetcher";
import Layout from "@/components/Layout";
import Head from "next/head";
import axios from "axios";
import useSWR from "swr";

export default withSwal((props, ref) => {
  const { swal } = props;
  const { showNotification } = useContext(NotificationContext);
  const [newOrders, setNewOrders] = useState([]);

  const { data: minimalProducts, error: errorGetMinimal } = useSWR(
    "/api/products/minimal",
    fetcher
  );

  const {
    data: orders,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/orders/full", fetcher);

  useEffect(() => {
    if (orders) {
      setNewOrders(orders);
    }
  }, [orders]);

  const getOrders = async () => {
    try {
      const response = await axios.get("/api/orders/full");
      setNewOrders(response.data);
      mutate(); // Actualizar manualmente la caché de SWR
    } catch (error) {
      console.error("Error al obtener las ordenes:", error);
    }
  };

  if (errorGetMinimal) return <div>FalLo al cargar los productos</div>;

  if (error) return <div>FalLo al cargar las Ordenes</div>;

  const disminuirCantidadProductos = (orderId) => {
    let newstock = 0;
    let data = {};
    let item = {};
    let _id = [];
    let id = orderId._id;

    orderId.line_items.forEach((item) => {
      const producto = minimalProducts.find(
        (producto) => producto._id === item.info_order.product_data.id
      );
      _id = producto._id;
      newstock = producto.quantity - item?.quantity;
      data = {
        ...data,
        quantity: newstock,
        quantityUpdated: Date.now(),
      };

      if (_id) {
        try {
          axios.put("/api/products/full", { ...data, _id });
          showNotification({
            open: true,
            msj: "Pedido ha sido aprobado!",
            status: "success",
          });
        } catch (error) {
          console.error(error);
        }
      }
    });

    if (id) {
      item = {
        ...newOrders,
        paid: true,
      };
      try {
        axios.put("/api/orders/full", { ...item, _id: id });
        getOrders();
      } catch (error) {
        console.error(error);
      }
    }
  };

  function deleteOrder(order) {
    swal
      .fire({
        title: "Estas seguro?",
        text: `¿Realmente desea eliminar el pedido de "${capitalize(
          order?.name
        )}" de la base de datos? Esta acción no se puede deshacer.`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#fe0000",
        confirmButtonText: "Si, Eliminar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = order;
          await axios.delete("/api/orders/full?_id=" + _id);
          showNotification({
            open: true,
            msj: `Pedido de "${capitalize(order?.name)}", eliminado con exito!`,
            status: "success",
          });
        }
        getOrders();
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
          <TableOrder
            fetchOrders={getOrders}
            downloadPdf={downloadPdf}
            disminuirCantidadProductos={disminuirCantidadProductos}
            orders={newOrders}
            deleteOrder={deleteOrder}
          />
        )}
      </Layout>
    </>
  );
});
