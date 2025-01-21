import { moogoseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import messages from "@/utils/messages";

export default async function handle(req, res) {
  const { method } = req;

  //Obtener pedidos
  if (method === "GET") {
    if (req.query?.id) {
      await moogoseConnect();
      return res.json(await Order.findOne({ _id: req.query.id }));
    } else {
      try {
        await moogoseConnect();
        const orders = await Order.aggregate([
          {
            $lookup: {
              from: "customers", // Nombre de la colección de clientes
              localField: "customerId", // Campo en la colección de órdenes que conecta con el cliente
              foreignField: "_id", // Campo en la colección de clientes (debe ser ObjectId)
              as: "customer", // Alias para el cliente relacionado
            },
          },
          {
            $unwind: {
              path: "$customer",
              preserveNullAndEmptyArrays: true, // Para incluir órdenes sin cliente relacionado
            },
          },
          {
            $sort: {
              createdAt: -1, // Orden descendente por fecha de creación
            },
          },
          {
            $project: {
              city: 1,
              country: 1,
              createdAt: 1,
              email: 1,
              idDocument: 1,
              lastname: 1,
              line_items: 1,
              name: 1,
              orderNumber: 1,
              paid: 1,
              phone: 1,
              postal: 1,
              province: 1,
              status: 1,
              streetAddress: 1,
              updatedAt: 1,
              customerId: 1,
              _id: 1,
              // Información del cliente relacionada
              customerName: "$customer.name",
              customerLastName: "$customer.lastname",
              customerIdDocument: "$customer.idDocument",
              customerDateOfBirth: "$customer.dateOfBirth",
              customerPhone: "$customer.phone",
              customerBillingAddress: "$customer.billingAddress",
            },
          },
        ]);

        res.status(200).json(orders);
      } catch (error) {
        res
          .status(500)
          .json({ error: "Error fetching orders with customers." });
      }
    }
  }

  //Editar
  if (method === "PUT") {
    await moogoseConnect();
    try {
      const {
        city,
        country,
        createdAt,
        email,
        line_items,
        name,
        paid,
        status,
        phone,
        streetAddress,
        updatedAt,
        _id,
      } = req.body;

      if (!_id || _id.trim() === "") {
        return res.status(400).json({ message: messages.error.idNotValid });
      }

      const updateData = {
        city,
        country,
        createdAt,
        email,
        line_items,
        name,
        paid,
        status,
        phone,
        streetAddress,
        updatedAt,
      };
      //Encuentra y actualiza la venta
      await Order.updateOne({ _id }, updateData);
      return res.status(200).json({
        message: messages.success.updateSuccessfully,
      });
    } catch (err) {
      return res.status(500).json({
        message: messages.error.errorUpdatedOrder,
        err: err.message,
      });
    }
  }

  //Eliminar
  if (method === "DELETE") {
    try {
      await moogoseConnect();
      const { _id } = req.query;
      await Order.deleteOne({ _id });
      return res.status(200).json("ok");
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }
}
