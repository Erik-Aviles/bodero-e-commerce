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
        const order = await Order.find({}, null, {
          sort: { _id: -1 },
        });
        return res.status(200).json(order);
      } catch (error) {
        return res
          .status(500)
          .json({ message: messages.error.default, error: error.message });
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
