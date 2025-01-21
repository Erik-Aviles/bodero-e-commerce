import React, { useContext } from "react";
import NotificationContext from "@/context/NotificationContext";
import TableOrder from "@/components/tables/TableOrder";
import Spinner from "@/components/snnipers/Spinner";
import useDeleteItem from "@/hooks/useDeleteItem";
import useProducts from "@/hooks/useProducts";
import { withSwal } from "react-sweetalert2";
import { fetcher } from "@/utils/fetcher";
import useOrder from "@/hooks/useOrder";
import axios from "axios";
import useSWR from "swr";
import useCustomers from "@/hooks/useCustomers";
import { updateOrderStatus } from "@/utils/order/updateOrderStatus";
import { updateCustomerOrderStatus } from "@/utils/order/updateCustomerOrderStatus";

const Orders = withSwal(({ swal }) => {
  const { orders, isErrorOrders, isLoadingOrders, mutateOrders } = useOrder();
  const { mutateCustomers } = useCustomers();
  const { showNotification } = useContext(NotificationContext);
  const { mutateProducts } = useProducts();
  const deleteItem = useDeleteItem();
  const {
    data: minimalProducts,
    error: errorGetMinimal,
    mutate: getMinimal,
  } = useSWR("/api/products/minimal", fetcher);

    const updateStateChanges = async (orderId, statusOrder, customerId, orderNumber, paidOrder) => {
      try {
        await updateOrderStatus(orderId, statusOrder, paidOrder);
    
        await updateCustomerOrderStatus(customerId, orderNumber, statusOrder);
    
        // Mostrar mensaje de éxito si ambas funciones se completan
        swal.fire({
          title: "Éxito",
          text: "Los estados de la orden y el cliente se actualizaron correctamente.",
          icon: "success",
        });
    
        mutateOrders();
        mutateCustomers();
      } catch (error) {
        swal.fire({
          title: "Error",
          text: error || "Ocurrió un problema al actualizar los estados.",
          icon: "error",
        });
      }
    };

  const reduceQuantityProducts = async (order) => {
    const orderId = order?._id;
    const orderNumber = order?.orderNumber;
    const statusOrder = "processing";
    const customerId = order?.customerId;
    const paidOrder = true;

    if (!minimalProducts || minimalProducts.length === 0) {
      return showNotification({
        open: true,
        msj: "Advertencia: Aun no se cargaron los datos necesarios.",
        status: "warning",
      });
    }

    const productUpdates = order.line_items
      .map((item) => {
        const product = minimalProducts.find(
          (prod) => prod._id === item.info_order.product_data.id
        );

        if (!product) {
          showNotification({
            open: true,
            msj: `Error: No se encontró el producto con ID ${item.info_order.product_data.id}.`,
            status: "error",
          });
          return null;
        }

        const newstock = product.quantity - item.quantity;
        return {
          quantity: newstock,
          quantityUpdated: Date.now(),
          _id: product._id,
          title: product.title,
        };
      })
      .filter(Boolean);

    // Identificar productos con stock negativo
    const negativeStockProducts = productUpdates.filter(
      (element) => element.quantity < 0
    );

    if (negativeStockProducts.length > 0) {
      const productNames = negativeStockProducts
        .map((product) => product._id)
        .join(", ");

      return showNotification({
        open: true,
        msj: `¡Revisar pedido! Hay productos sin stock! ${productNames}`,
        status: "error",
      });
    }

    try {
      swal.fire({
        title: "Procesando...",
        text: "Espere hasta que se termine de procesar",
        allowOutsideClick: false,
        didOpen: async () => {
          swal.showLoading();

          const response = await Promise.allSettled(
            productUpdates.map((update) =>
              axios.put("/api/products/full", update)
            )
          );

          const allSuccess = response.every(
            (res) => res.status === "fulfilled" && res.value.status === 200
          );

          if (allSuccess && orderId) {
            updateStateChanges(orderId, statusOrder, customerId, orderNumber, paidOrder);
            mutateProducts();
            getMinimal();
            swal.close();
          } else {
            throw new Error("Error al confirmar el pedido.");
          }
        },
      });
    } catch (error) {
      swal.close();
      showNotification({
        open: true,
        msj: error.message || "Error durante el proceso.",
        status: "error",
      });
    }
  };

  const handleDeleteOrder = (item) => {
    deleteItem({
      swal,
      getItems: mutateOrders,
      item,
      apiEndpoint: "orders",
      itemNameKey: "orderNumber",
      });
  };


  return (
    <>
      {isLoadingOrders || !orders ? (
        <Spinner className="pt-3 pb-3" />
      ) : (
        <TableOrder
          reduceQuantityProducts={reduceQuantityProducts}
          deleteOrder={handleDeleteOrder}
          orders={orders}
          updateStateChanges={updateStateChanges}
        />
      )}
    </>
  );
});
export default Orders;
