import { moogoseConnect } from "@/lib/mongoose";
import { Debts } from "@/models/Debts";
import messages from "@/utils/messages";
// import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;

  //Obtener Lista de pedidos
  if (method === "GET") {
    if (req.query?.id) {
      await moogoseConnect();
      return res.json(await Debts.findOne({ _id: req.query.id }));
    } else {
      try {
        await moogoseConnect();
        const debts = await Debts.find({}, null, {
          sort: { _id: -1 },
        });
        return res.status(200).json(debts);
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
        vehicle,
        concept,
        document,
        amount,
        pay,
        debtBalance,
        fullPaymentDate,
        payments,
        status,
      } = req.body;

      //validar que esten todos los campos necesarios
      if (!amount || !concept || !customer || !customer.fullname || !customer.phone)
        return res.status(400).json({ message: messages.error.needProps });

      const newDebt = await Debts.create({
        customer,
        vehicle,
        concept,
        document,
        amount,
        debtBalance,
        pay,
        fullPaymentDate,
        payments,
        status,
      });

      return res
        .status(200)
        .json({ newDebt, message: messages.success.addedDebt });
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
        vehicle,
        concept,
        document,
        amount,
        debtBalance,
        pay,
        fullPaymentDate,
        payments,
        status,
        _id,
      } = req.body;

      if (!_id || _id.trim() === "") {
        return res.status(400).json({ message: messages.error.idNotValid });
      }

      const updateData = {
        customer,
        vehicle,
        concept,
        document,
        amount,
        debtBalance,
        pay,
        fullPaymentDate,
        payments,
        status,
        status,
      };

      // Encuentra y actualiza el pedido
      await Debts.updateOne({ _id }, updateData);
      return res.status(200).json({
        message: messages.success.debtUpdateSuccessfully,
      });
    } catch (err) {
      return res.status(500).json({
        message: messages.error.errorUpdatedDebt,
        err: err.message,
      });
    }
  }

  //Eliminar
  if (method === "DELETE") {
    try {
      await moogoseConnect();
      const { _id } = req.query;
      await Debts.deleteOne({ _id });
      return res.status(200).json("ok");
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }
}
