import React, { useContext } from "react";
import NotificationContext from "@/context/NotificationContext";
import TableDebts from "@/components/tables/TableDebts";
import Spinner from "@/components/snnipers/Spinner";
import useDeleteItem from "@/hooks/useDeleteItem";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import useDebts from "@/hooks/useDebts";
import Head from "next/head";
import axios from "axios";
import useCustomers from "@/hooks/useCustomers";

const DebtsPage = withSwal(({ swal }) => {
  const { debts, isErrorDebts, isLoadingDebts, mutateDebts } = useDebts();
  const { customers, isLoadingCustomers } = useCustomers();
  const deleteItem = useDeleteItem();

  const handleDeleteDebts = (item) => {
    deleteItem({
      swal,
      getItems: mutateDebts,
      item,
      apiEndpoint: "debts",
      itemNameKey: "customer",
    });
  };

  return (
    <>
      <Head>
        <title>Panel | Cobranza</title>
      </Head>
      <Layout>
        <h3>Panel de Cobranza</h3>

        {isLoadingDebts || !debts || isLoadingCustomers ? (
          <Spinner />
        ) : (
          <section className="w-full md:px-4 lg:px-8">
            <TableDebts
              customers={customers}
              debts={debts}
              deleteDebts={handleDeleteDebts}
            />
          </section>
        )}
      </Layout>
    </>
  );
});
export default DebtsPage;
