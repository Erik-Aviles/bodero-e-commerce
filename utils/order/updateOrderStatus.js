import axios from "axios";

export const updateOrderStatus = async (orderId, statusOrder, paidOrder) => {
  try {
    const response = await axios.put("/api/orders/updateOrder", {
      orderId,
      statusOrder,
      paidOrder,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Error al comunicarse con la API de orden"
    ); // Lanzar el error
  }
};
