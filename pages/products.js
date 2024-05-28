import React, { useContext, useEffect, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import TableProduct from "@/components/TableProduct";
import { capitalize } from "@/utils/utils";
import { useProducts } from "@/context/ProoductsContext";
import Spinner from "@/components/Spinner";

export default withSwal((props, ref) => {
  const { swal } = props;
  const { showNotification } = useContext(NotificationContext);

  /*   const getProducts = async () => {
    const [newProduct, setNewProduct] = useState([]);
    try {
      const response = await axios.get("/api/products");
      setNewProduct(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };
  
  useEffect(() => {
    getProducts();
  }, []); */

  const {
    products,
    error: productsError,
    isValidating: productsLoading,
  } = useProducts();

  if (productsError) return <div>Fallo al cargar los datos</div>;
  if (productsLoading || !products)
    return (
      <div>
        <Spinner /> Cargando productos...
      </div>
    );

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
      });
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
