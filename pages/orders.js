import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <Layout>
      <h3>Pedidos</h3>
      <table className="basic">
        <thead>
          <tr>
            <th>Nro</th>
            <th>Pagado</th>
            <th>Fecha</th>
            <th>Destinatario</th>
            <th>Productos</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.paid ? "SI" : "NO"}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  Usuario: {order.name} <br />
                  Email: {order.email} <br />
                  Telefono: {order.phone} <br />
                  Ciudad: {order.city} <br />
                  Codigo Postal: {order.postalCode} <br />
                  Pais: {order.country} <br />
                  Dirección: {order.streetAddress} <br />
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      Cant: {l.quantity}
                      <br />
                      Nombre: {l.price_data?.product_data?.name}
                      <br />
                      Precio: {l.price_data?.unit_amount}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
