import React, { useContext, useEffect, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import Head from "next/head";
import axios from "axios";
import TableOrder from "@/components/TableOrder";
import { Product } from "@/models/Product";
import { moogoseConnect } from "@/lib/mongoose";

export default withSwal((props, ref) => {
  const { swal, products } = props;
  const [orders, setOrder] = useState([]);
  const { showNotification } = useContext(NotificationContext);
  const { isValidate, setIsValidate } = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    await axios.get("/api/orders").then((res) => {
      setOrder(res.data);
    });
  }

  const disminuirCantidadProductos = async (orderId) => {
    let newstock = 0;
    let data = {};
    let _id = [];

    orderId.line_items.forEach((item) => {
      const producto = products.find(
        (producto) => producto._id === item.info_order.product_data.id
      );
      _id = producto._id;
      newstock = producto.quantity - item.quantity;
      data = {
        ...data,
        quantity: newstock,
      };
      // Guardar los cambios en la API

      if (_id) {
        try {
          axios.put("/api/products", { ...data, _id });
          showNotification({
            open: true,
            msj: "Cambios guardados con exito!",
            status: "success",
          });
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  /*   function deleteProduct(order) {
    swal
      .fire({
        title: "Estas seguro?",
        text: `¿Realmente desea eliminar "${capitalize(
          product?.title
        )}" de la base de datos? Esta acción no se puede deshacer.`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#fe0000",
        confirmButtonText: "Si, Eliminar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = product;
          await axios.delete("/api/orders?_id=" + _id);
          showNotification({
            open: true,
            msj: `Producto: "${capitalize(
              product?.title
            )}", eliminado con exito!`,
            status: "success",
          });
        }
        goBack();
      });
  } */

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
        <TableOrder
          fetchOrders={fetchOrders}
          downloadPdf={downloadPdf}
          disminuirCantidadProductos={disminuirCantidadProductos}
          orders={orders}
          setIsValidate={setIsValidate}
          isValidate={isValidate}
        />
      </Layout>
    </>
  );
});

export async function getServerSideProps() {
  // Conectar a la base de datos MongoDB
  await moogoseConnect();

  let products = [];

  try {
    // Consultar la base de datos para obtener solo los campos de ID y cantidad de todos los productos
    products = await Product.find(
      {},
      { _id: 1, quantity: 1, title: 1 },
      { sort: { _id: -1 } }
    );
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }

  return {
    props: {
      // Convertir los productos en un objeto plano para que sea serializable
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
