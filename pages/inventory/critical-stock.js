import React from "react";
import TableCriticalStock from "@/components/tables/TableCriticalStock";
import useStockCritical from "@/hooks/useStockCritical";
import Spinner from "@/components/snnipers/Spinner";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function StockCriticalPage() {
  const { stockCritical, isLoadingStockCritical, errorGetStockCritical } =
    useStockCritical();

  return (
    <>
      <Head>
        <title>Panel | Stock Critico</title>
      </Head>
      <Layout>
        <h3>Panel de Productos en Agotamiento</h3>

        {isLoadingStockCritical || !stockCritical ? (
          <Spinner />
        ) : (
          <section className="w-full md:px-4 lg:px-8">
            <TableCriticalStock products={stockCritical} />
          </section>
        )}
      </Layout>
    </>
  );
}
