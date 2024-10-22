import { moogoseConnect } from "@/lib/mongoose";
import { OrdersList } from "@/models/OrdersList";
import messages from "@/utils/messages";
// import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;

  //Obtener Lista de pedidos
  if (method === "GET") {
    if (req.query?.id) {
      await moogoseConnect();
      return res.json(await OrdersList.findOne({ _id: req.query.id }));
    } else {
      try {
        await moogoseConnect();
        const orderlist = await OrdersList.find({}, null, {
          sort: { _id: -1 },
        });
        return res.status(200).json(orderlist);
      } catch (error) {
        return res
          .status(500)
          .json({ message: messages.error.default, error: error.message });
      }
    }
  }

  //Registrar
  if (method === "POST") {
    await moogoseConnect();
    try {
      const {
        customer,
        articulo,
        orderEntryDate,
        orderDeliveryDate,
        delivered,
      } = req.body;

      //validar que esten todos los campos
      if (!customer || !articulo || !orderEntryDate)
        return res.status(400).json({ message: messages.error.needProps });

      const newOrderList = await OrdersList.create({
        customer,
        articulo,
        orderEntryDate,
        orderDeliveryDate,
        delivered,
      });

      return res
        .status(200)
        .json({ newOrderList, message: messages.success.addedOrderlist });
    } catch (err) {
      return res
        .status(500)
        .json({ message: messages.error.default, err: err.message });
    }
  }

  //Editar
  if (method === "PUT") {
    await moogoseConnect();
    try {
      const {
        customer,
        articulo,
        orderEntryDate,
        orderDeliveryDate,
        delivered,
        _id,
      } = req.body;

      if (!_id || _id.trim() === "") {
        return res.status(400).json({ message: messages.error.idNotValid });
      }

      const updateData = {
        customer,
        articulo,
        orderEntryDate,
        orderDeliveryDate,
        delivered,
      };

      // Encuentra y actualiza el pedido
      await OrdersList.updateOne({ _id }, updateData);
      return res.status(200).json({
        message: messages.success.updateSuccessfully,
      });
    } catch (err) {
      return res.status(500).json({
        message: messages.error.errorUpdatedOrderList,
        err: err.message,
      });
    }
  }

  //Eliminar
  if (method === "DELETE") {
    try {
      await moogoseConnect();
      const { _id } = req.query;
      await OrdersList.deleteOne({ _id });
      return res.status(200).json("ok");
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }
}
