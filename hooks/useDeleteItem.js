import axios from "axios";
import { capitalize } from "@/utils/utils";
import { useContext } from "react";
import NotificationContext from "@/context/NotificationContext";

export default function useDeleteItem() {
  const { showNotification } = useContext(NotificationContext);

  const deleteItem = async ({
    swal,
    getItems,
    item,
    apiEndpoint,
    itemNameKey,
  }) => {
    const itemName = capitalize(item[itemNameKey]);
    swal
      .fire({
        title: "¿Estás seguro?",
        text: `¿Realmente desea eliminar "${
          itemName.length > 30 ? itemName.substring(0, 30) + "..." : itemName
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
            await getItems();
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

  return deleteItem;
}
