import React from "react";
import TableCategory from "@/components/tables/TableCategory";
import useCategories from "@/hooks/useCategories";
import Spinner from "@/components/snnipers/Spinner";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function Categories() {
  const { newCategories, error, isLoading, deleteCaterory } = useCategories();

  if (error) return <div>Falló al cargar las categorias</div>;

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
        <h3>Panel de categoria</h3>
        {isLoading || !newCategories ? (
          <Spinner />
        ) : (
          <section className="max-w-4xl mx-auto">
            <TableCategory
              categories={newCategories}
              deleteCaterory={deleteCaterory}
            />
          </section>
        )}
      </Layout>
    </>
  );
}
