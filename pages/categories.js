import TableCategory from "@/components/tables/TableCategory";
import Spinner from "@/components/snnipers/Spinner";
import useCategories from "@/hooks/useCategories";
import useDeleteItem from "@/hooks/useDeleteItem";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import Head from "next/head";
import React from "react";

const CategoriesPage = withSwal(({ swal }) => {
  const deleteItem = useDeleteItem();
  const {
    categories,
    isErrorSCategories,
    isLoadingCategories,
    mutateCategories,
  } = useCategories();

  const handleDeleteCategory = (item) => {
    deleteItem({
      swal,
      getItems: mutateCategories,
      item,
      apiEndpoint: "categories",
      itemNameKey: "name",
    });
  };

  if (isErrorSCategories) {
    console.error("Falló al cargar las categorias");
  }

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
        {isLoadingCategories || !categories ? (
          <Spinner />
        ) : (
          <section className="max-w-4xl mx-auto">
            <TableCategory
              categories={categories}
              deleteCaterory={handleDeleteCategory}
            />
          </section>
        )}
      </Layout>
    </>
  );
});
export default CategoriesPage;
