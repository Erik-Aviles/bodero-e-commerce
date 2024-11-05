import React from "react";
import Head from "next/head";
import axios from "axios";
import TableCategory from "@/components/tables/TableCategory";
import deleteImgCloudinary from "@/utils/deleteImgCloudinary";
import Spinner from "@/components/snnipers/Spinner";
import useCategories from "@/hooks/useCategories";
import { capitalize } from "@/utils/utils";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";

const CategoriesPage = withSwal(({ swal }) => {
  const {
    categories,
    isErrorSCategories,
    isLoadingCategories,
    mutateCategories,
  } = useCategories();

  async function handleDeleteCategory(item) {
    const name = item?.name;
    const _id = item?._id;
    const public_id = item?.image?.publicId;
    try {
      const result = await swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará la categoria de forma permanente.",
        text: `¿Realmente desea eliminar categoria: "${
          name > 30
            ? capitalize(name).substring(0, 30) + "..."
            : capitalize(name)
        }" de la base de datos? Esta acción no se puede deshacer.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fe0000",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/categories/full?_id=${_id}`);

        await deleteImgCloudinary(public_id);

        swal.fire({
          title: "Eliminado!",
          text: "Categoria eliminada exitosamente",
          icon: "success",
        });
        await mutateCategories();
      }
    } catch (error) {
      console.error(
        `Error eliminando la Categoria: ${name}. `,
        error
      );
      swal.fire({
        title: "Error",
        text: `No se pudo eliminar la Categoria: ${
          name > 30
            ? capitalize(name).substring(0, 30) + "..."
            : capitalize(name)
        }.`,
        icon: "error",
      });
    }
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
          <section className="w-full md:px-4 lg:px-8">
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
