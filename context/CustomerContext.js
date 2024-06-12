import React, { createContext, useState, useEffect, useContext } from "react";
import NotificationContext from "./NotificationContext";
import { fetcher } from "@/utils/fetcher";
import { withSwal } from "react-sweetalert2";
import useSWR from "swr";
import axios from "axios";
import { capitalize } from "@/utils/utils";

const CustomerContext = createContext();

const CustomerProvider = withSwal(({ children, swal }) => {
  const { showNotification } = useContext(NotificationContext);
  const [newCustomers, setNewCustomers] = useState([]);

  const {
    data: customers,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/customers/full", fetcher);

  useEffect(() => {
    if (customers) {
      setNewCustomers(customers);
    }
  }, [customers]);

  const getCustomers = async () => {
    try {
      const response = await axios.get("/api/customers/full");
      setNewCustomers(response.data);
      mutate(); // Actualizar manualmente la caché de SWR
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
    }
  };

  function deleteCustomer(value) {
    swal
      .fire({
        title: "Estas seguro?",
        text: `Quieres eliminar a "${capitalize(value?.name)}"?`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#fe0000",
        confirmButtonText: "Si, Eliminar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = value;
          await axios.delete("/api/customers/full?_id=" + _id);
          showNotification({
            open: true,
            msj: `Cliente:
              ${capitalize(value?.name)}, eliminada con exito!`,
            status: "success",
          });
          getCustomers();
        }
      });
  }

  return (
    <CustomerContext.Provider
      value={{ newCustomers, error, isLoading, getCustomers, deleteCustomer }}
    >
      {children}
    </CustomerContext.Provider>
  );
});

export default CustomerContext;
export { CustomerProvider };
