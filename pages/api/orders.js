import { moogoseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import messages from "@/utils/messages";

export default async function handle(req, res) {
  const { method } = req;
  await moogoseConnect();

  //Obtener pedidos por id y todos
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Order.findOne({ _id: req.query.id }));
    } else {
      try {
        await moogoseConnect();
        const order = await Order.find().sort({ createdAt: -1 });
        return res.status(200).json(order);
      } catch (err) {
        return res.status(500).json({
          err: err.message,
        });
      }
    }
  }

  //Editar
  if (method === "PUT") {
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

      //Encuentra y actualiza el producto
      await Order.updateOne(
        { _id },
        {
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
        }
      );

      return res.status(200).json(true);
    } catch (err) {
      return res.status(500).json({
        message: messages.error.errorUpdatedOrder,
        err: err.message,
      });
    }
  }

  //Eliminar
  if (method === "DELETE") {
    const { _id } = req.query;
    await Order.deleteOne({ _id });
    return res.status(200).json(true);
  }
}
