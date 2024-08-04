import Layout from "@/components/Layout";
import Head from "next/head";
import React from "react";

const BarCodePage = () => {
  return (
    <>
      <Head>
        <title>Panel | Categoria</title>
        <meta
          name="description"
          content="Variedad de productos, estan seccionados por categorias"
        />
      </Head>
      <Layout>
        <h3>Panel de código de barra</h3>
        <section className="max-w-4xl mx-auto">
          <h4>BarCodePage</h4>
        </section>
      </Layout>
    </>
  );
};

export default BarCodePage;
