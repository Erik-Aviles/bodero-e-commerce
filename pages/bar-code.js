import Layout from "@/components/Layout";
import BarCodeForm from "@/components/forms/BarCodeForm";
import Spinner from "@/components/snnipers/Spinner";
import TableBarCode from "@/components/tables/TableBarCode";
import useProducts from "@/hooks/useProducts";
import Head from "next/head";
import React from "react";

const BarCodePage = () => {
  const { products, isErrorProducts, isLoadingProducts, mutateProducts } =
    useProducts();
  return (
    <>
      <Head>
        <title>Panel | Codigo de barra</title>
        <meta
          name="description"
          content="Variedad de productos, estan seccionados por categorias"
        />
      </Head>
      <Layout>
        <h3>Panel de código de barra</h3>
        {isLoadingProducts || !products ? (
          <Spinner />
        ) : (
          <section className="w-full md:px-4 lg:px-8">
            {/* <BarCodeForm products={products} /> */}
            <TableBarCode products={products} />
          </section>
        )}
      </Layout>
    </>
  );
};

export default BarCodePage;
