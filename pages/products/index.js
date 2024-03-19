import React, { useContext } from "react";
import NotificationContext from "@/context/NotificationContext";
import { moogoseConnect } from "@/lib/mongoose";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import TableProduct from "@/components/TableProduct";
import { capitalize } from "@/utils/utils";
import { Product } from "@/models/Product";

export default withSwal((props, ref) => {
  const router = useRouter();

  const { swal, products } = props;
  const { showNotification } = useContext(NotificationContext);

  function deleteProduct(product) {
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
          await axios.delete("/api/products?_id=" + _id);
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
  }
  function goBack() {
    router.push("/products");
  }
  function formatPrice(price) {
    let precioFormateado = new Intl.NumberFormat("es-EC", {
      style: "currency",
      currency: "USD",
    }).format(price);
    return precioFormateado;
  }
  return (
    <>
      <Head>
        <title>Panel | Productos</title>
        <meta
          name="description"
          content="Repuestos Originales en diferentes marcas, en stock o bajo pedidos"
        />
      </Head>
      <Layout>
        <h3>Panel de productos</h3>
        <TableProduct
          products={products}
          deleteProduct={deleteProduct}
          formatPrice={formatPrice}
        />
      </Layout>
    </>
  );
});

export async function getServerSideProps() {
  await moogoseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
