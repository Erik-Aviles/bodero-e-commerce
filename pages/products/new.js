import React from "react";
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import Head from "next/head";

export default function NewProducto() {
  return (
    <>
      <Head>
        <title>Panel | Registro de productos</title>
        <meta
          name="description"
          content="Registro de nuevos productos a la plataforma"
        />
      </Head>
      <Layout>
        <ProductForm titulo="REGISTRAR PRODUCTOS" />
      </Layout>
    </>
  );
}
