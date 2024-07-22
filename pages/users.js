import TableUser from "@/components/tables/TableUsers";
import Spinner from "@/components/snnipers/Spinner";
import useDeleteItem from "@/hooks/useDeleteItem";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import useUsers from "@/hooks/useUsers";
import Head from "next/head";
import React from "react";

const UsersPage = withSwal(({ swal }) => {
  const deleteItem = useDeleteItem();
  const { users, isErrorUsers, isLoadingUsers, mutateUsers } = useUsers();

  const handleDeleteUser = (item) => {
    deleteItem({
      swal,
      getItems: mutateUsers,
      item,
      apiEndpoint: "users",
      itemNameKey: "fullname",
    });
  };

  if (isErrorUsers) {
    console.error("Falló al cargar a los usuario");
  }

  return (
    <>
      <Head>
        <title>Panel | Usuarios</title>
      </Head>
      <Layout>
        <h3>Panel de usuarios</h3>
        {isLoadingUsers || !users ? (
          <Spinner />
        ) : (
          <section className="max-w-4xl mx-auto">
            <TableUser users={users} deleteUser={handleDeleteUser} />
          </section>
        )}
      </Layout>
    </>
  );
});
export default UsersPage;
