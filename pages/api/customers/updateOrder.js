import { moogoseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/Customer";

export default async function handler(req, res) {
  // Asegúrate de que el método sea PUT para actualizar
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { customerId, orderNumber, statusOrder } = req.body;

  if (!customerId || !orderNumber) {
    return res.status(400).json({ error: "Falta el ID del cliente o el número de pedido" });
  }

  try {
    await moogoseConnect();

    // Encuentra el customer por su _id
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: "Error al encontrar el cliente" });
    }

    // Encuentra la orden dentro del campo orders por orderNumber
    const orderIndex = customer.orders.findIndex(
      (order) => order.orderNumber === orderNumber
    );

    if (orderIndex === -1) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }

    // Modifica el valor del status de la orden
    customer.orders[orderIndex].status = statusOrder;

    // Guarda los cambios en la base de datos
    await customer.save();

    // Devuelve una respuesta exitosa
    return res.status(200).json({
      message: "Estado de la orden actualizado correctamente",
      order: customer.orders[orderIndex],
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error mientras se realizaba la actualizacion del estado de la orden" });
  }
}
