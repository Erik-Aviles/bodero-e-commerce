import React, { createContext, useState, useEffect, useContext } from "react";
import NotificationContext from "./NotificationContext";
import { fetcher } from "@/utils/fetcher";
import { withSwal } from "react-sweetalert2";
import useSWR from "swr";
import axios from "axios";
import { capitalize } from "@/utils/utils";

const UserContext = createContext();

const UserProvider = withSwal(({ children, swal }) => {
  const { showNotification } = useContext(NotificationContext);
  const [newUsers, setNewUsers] = useState([]);

  const {
    data: users,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/users/full", fetcher);

  useEffect(() => {
    if (users) {
      setNewUsers(users);
    }
  }, [users]);

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/users/full");
      setNewUsers(response.data);
      mutate(); // Actualizar manualmente la caché de SWR
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  function deleteUser(value) {
    swal
      .fire({
        title: "Estas seguro?",
        text: `Quieres eliminar a "${capitalize(value?.fullname)}"?`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#fe0000",
        confirmButtonText: "Si, Eliminar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = value;
          await axios.delete("/api/users/full?_id=" + _id);
          showNotification({
            open: true,
            msj: `Usuario:
              ${capitalize(value?.fullname)}, eliminado con exito!`,
            status: "success",
          });
          getUsers();
        }
      });
  }

  return (
    <UserContext.Provider
      value={{ newUsers, error, isLoading, getUsers, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
});

export default UserContext;
export { UserProvider };
