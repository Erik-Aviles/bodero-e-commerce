import React, { useContext } from "react";
import TableDebts from "@/components/tables/TableDebts";
import Spinner from "@/components/snnipers/Spinner";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import useDebts from "@/hooks/useDebts";
import NotificationContext from "@/context/NotificationContext";
import Head from "next/head";
import axios from "axios";
import useCustomers from "@/hooks/useCustomers";
import { capitalize } from "@/utils/utils";

const DebtsPage = withSwal(({ swal }) => {
  const { showNotification } = useContext(NotificationContext);
  const { debts, isErrorDebts, isLoadingDebts, mutateDebts } = useDebts();
  const { customers, isLoadingCustomers } = useCustomers();

  const handleDeleteDebts = (item) => {
    const apiEndpoint = "debts";
    const itemName = capitalize(item.customer.fullname);

    swal
      .fire({
        title: "¿Estás seguro?",
        text: `¿Realmente desea eliminar la deuda de "${
          itemName?.length > 30 ? itemName.substring(0, 30) + "..." : itemName
        }" de la base de datos? Esta acción no se puede deshacer.`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#fe0000",
        confirmButtonText: "Sí, eliminar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`/api/${apiEndpoint}/full?_id=${item._id}`);
            await mutateDebts();
            showNotification({
              open: true,
              msj: `${
                itemName.length > 30
                  ? itemName.substring(0, 30) + "..."
                  : itemName
              }, eliminado con éxito!`,
              status: "success",
            });
          } catch (error) {
            console.error(`Error al eliminar el elemento:`, error);
          }
        }
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
