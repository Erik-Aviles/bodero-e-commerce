import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import TableProduct from "@/components/tables/TableProduct";
import Spinner from "@/components/snnipers/Spinner";
import useProducts from "@/hooks/useProducts";

export default function Products() {
  const {
    newProduct,
    error,
    isLoading,
    getProducts,
    formatPrice,
    deleteProduct,
  } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  if (error) return <div>Fallo al cargar los productos</div>;

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
        {isLoading || !newProduct ? (
          <Spinner />
        ) : (
          <section className="w-full md:px-4 ">
            <TableProduct
              products={newProduct}
              deleteProduct={deleteProduct}
              formatPrice={formatPrice}
            />
          </section>
        )}
      </Layout>
    </>
  );
}
