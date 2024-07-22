import TableProduct from "@/components/tables/TableProduct";
import Spinner from "@/components/snnipers/Spinner";
import useDeleteItem from "@/hooks/useDeleteItem";
import useProducts from "@/hooks/useProducts";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import Head from "next/head";
import React from "react";

const ProductsPage = withSwal(({ swal }) => {
  const deleteItem = useDeleteItem();
  const { products, isErrorProducts, isLoadingProducts, mutateProducts } =
    useProducts();

  const handleDeleteProduct = (item) => {
    deleteItem({
      swal,
      getItems: mutateProducts,
      item,
      apiEndpoint: "products",
      itemNameKey: "title",
    });
  };

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
        {isLoadingProducts || !products ? (
          <Spinner />
        ) : (
          <section className="w-full md:px-4 ">
            <TableProduct
              products={products}
              deleteProduct={handleDeleteProduct}
            />
          </section>
        )}
      </Layout>
    </>
  );
});
export default ProductsPage;
