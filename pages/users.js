import React from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import TableUser from "@/components/tables/TableUsers";
import useUsers from "@/hooks/useUsers";
import Spinner from "@/components/snnipers/Spinner";

export default function Users() {
  const { newUsers, error, isLoading, deleteUser } = useUsers();

  if (error) return <div>Falló al cargar a los usuario</div>;

  return (
    <>
      <Head>
        <title>Panel | Usuarios</title>
      </Head>
      <Layout>
        <h3>Panel de usuarios</h3>
        {isLoading || !newUsers ? (
          <Spinner />
        ) : (
          <section className="max-w-4xl mx-auto">
            <TableUser users={newUsers} deleteUser={deleteUser} />
          </section>
        )}
      </Layout>
    </>
  );
}
