import React, { useEffect } from "react";
import Spinner from "@/components/snnipers/Spinner";
import Layout from "@/components/Layout";
import Head from "next/head";
import TableCustomer from "@/components/tables/TableCustomer";
import useCustomers from "@/hooks/useCustomers";

export default function Customers() {
  const { newCustomers, error, isLoading, getCustomers, deleteCustomer } =
    useCustomers();

  useEffect(() => {
    getCustomers();
  }, []);

  if (error) return <p>Error al cargar clientes</p>;

  return (
    <>
      <Head>
        <title>Panel | Clientes</title>
      </Head>
      <Layout>
        <h3>Panel de clientes</h3>
        {isLoading || !newCustomers ? (
          <Spinner />
        ) : (
          <section className="max-w-5xl mx-auto ">
            <TableCustomer
              customers={newCustomers}
              deleteCustomer={deleteCustomer}
            />
          </section>
        )}
      </Layout>
    </>
  );
}
