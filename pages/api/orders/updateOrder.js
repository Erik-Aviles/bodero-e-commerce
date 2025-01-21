import { moogoseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/Customer";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  // Asegúrate de que el método sea PUT para actualizar
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    await moogoseConnect();

    const { orderId, statusOrder, paidOrder } = req.body;

    if (!orderId || !statusOrder) {
      return res
        .status(400)
        .json({ message: "Faltan parámetros obligatorios: orderId o status" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }

    order.status = statusOrder;

  // Actualizar "paid" solo si se envía y el valor actual es false
  if (typeof paidOrder !== "undefined" && !order.paid && paidOrder === true) {
    order.paid = true;
  }

    // Guarda los cambios en la base de datos
    await order.save();

    // Devuelve una respuesta exitosa
    return res.status(200).json({
      message: "Estado de la orden actualizado correctamente",
      order,
    });
  } catch (error) {
    console.error("Error al actualizar la orden:", error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
}
