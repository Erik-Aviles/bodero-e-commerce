import React, { useContext, useEffect, useState } from "react";
import NotificationContext from "@/context/NotificationContext";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import { ClipLoader } from "react-spinners";
import Head from "next/head";
import axios from "axios";
import TableProduct from "@/components/TableProduct";
import { capitalize } from "@/utils/utils";
import Spinner from "@/components/Spinner";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default withSwal((props, ref) => {
  const { swal } = props;
  const { showNotification } = useContext(NotificationContext);
  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/products/full", fetcher);

  const [newProduct, setNewProduct] = useState([]);

  useEffect(() => {
    if (products) {
      setNewProduct(products);
    }
  }, [products]);

  const getProducts = async () => {
    try {
      const response = await axios.get("/api/products/full");
      setNewProduct(response.data);
      mutate(); // Actualizar manualmente la caché de SWR
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  if (error) return <div>Fallo al cargar los productos</div>;

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
          await axios.delete("/api/products/full?_id=" + _id);
          showNotification({
            open: true,
            msj: `Producto: "${capitalize(
              product?.title
            )}", eliminado con exito!`,
            status: "success",
          });
        }
        getProducts();
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
        {isLoading || !products ? (
          <Spinner />
        ) : (
          <TableProduct
            products={newProduct}
            deleteProduct={deleteProduct}
            formatPrice={formatPrice}
            fetchProducts={getProducts}
          />
        )}
      </Layout>
    </>
  );
});
