import React, { useContext, useEffect, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import Head from "next/head";
import axios from "axios";
import TableOrder from "@/components/TableOrder";

function OrdersPage({ swal }) {
  const { showNotification } = useContext(NotificationContext);
  const [orders, setOrder] = useState([]);

  async function fetchOrders() {
    await axios.get("/api/orders").then((res) => {
      setOrder(res.data);
    });
  }

  function downloadPdf() {
    showNotification({
      open: true,
      msj: `Descargando pdf!`,
      status: "success",
    });
  }
  function verifyOrder() {
    showNotification({
      open: true,
      msj: `Orden pagada!`,
      status: "success",
    });
  }

  useEffect(() => {
    fetchOrders();
  }, []);

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
          verifyOrder={verifyOrder}
          orders={orders}
        />
      </Layout>
    </>
  );
}
export default withSwal(({ swal }, ref) => <OrdersPage swal={swal} />);
