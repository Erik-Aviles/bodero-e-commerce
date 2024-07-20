import React from "react";
import TableCustomer from "@/components/tables/TableCustomer";
import Spinner from "@/components/snnipers/Spinner";
import useDeleteItem from "@/hooks/useDeleteItem";
import useCustomers from "@/hooks/useCustomers";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import Head from "next/head";

const CustomersPage = withSwal(({ swal }) => {
  const deleteItem = useDeleteItem();
  const { customers, isErrorCustomers, isLoadingCustomers, mutateCustomers } =
    useCustomers();

  const handleDeleteCustomer = (item) => {
    deleteItem({
      swal,
      getItems: mutateCustomers,
      item,
      apiEndpoint: "customers",
      itemNameKey: "name",
    });
  };
  if (isErrorCustomers) return <p>Falló al cargar clientes</p>;

  return (
    <>
      <Head>
        <title>Panel | Clientes</title>
      </Head>
      <Layout>
        <h3>Panel de clientes</h3>
        {isLoadingCustomers || !customers ? (
          <Spinner />
        ) : (
          <section className="max-w-5xl mx-auto ">
            <TableCustomer
              customers={customers}
              deleteCustomer={handleDeleteCustomer}
            />
          </section>
        )}
      </Layout>
    </>
  );
});
export default CustomersPage;
