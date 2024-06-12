import React from "react";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function Users() {
  return (
    <>
      <Head>
        <title>Panel | Usuarios</title>
        <meta
          name="description"
          content="Variedad de productos, estan seccionados por categorias"
        />
      </Head>
      <Layout>
        <div className="h-full flex flex-col gap-1">
          <div className="sm:flex sm:items-center sm:justify-between sm:gap-4">
            <h3>Panel de usuarios</h3>
          </div>
        </div>
      </Layout>
    </>
  );
}
