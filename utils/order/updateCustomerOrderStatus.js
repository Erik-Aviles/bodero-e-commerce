import axios from "axios";

export const updateCustomerOrderStatus = async (
  customerId,
  orderNumber,
  statusOrder,
) => {
  try {
    const response = await axios.put("/api/customers/updateOrder", {
      customerId,
      orderNumber,
      statusOrder,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error al comunicarse con la API de customer."; // Lanzar el error
  }
};
