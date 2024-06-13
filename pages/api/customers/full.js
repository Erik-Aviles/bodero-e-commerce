import { moogoseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/Customer";
import messages from "@/utils/messages";
// import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;

  //Obtener clientes
  if (method === "GET") {
    if (req.query?.id) {
      await moogoseConnect();
      return res.json(await Customer.findOne({ _id: req.query.id }));
    } else {
      try {
        await moogoseConnect();
        const customers = await Customer.find({}, null, { sort: { _id: -1 } });
        return res.status(200).json(customers);
      } catch (err) {
        return res.status(500).json({ err: err.message });
      }
    }
  }

  //Registrar
  if (method === "POST") {
    try {
      await moogoseConnect();
      const {
        name,
        lastname,
        identifications,
        address,
        phone,
        email,
        myVehicles_list,
        myProductOrder_list,
        myShopping_list,
        observations,
      } = req.body;

      //validar que esten todos los campos
      if (!name || !lastname || !phone) {
        return res.status(400).json({ message: messages.error.needProps });
      }

      const customerFind = await Customer.findOne({ identifications });

      // validar si existe un cliente con la misma identificación en la base de datos
      if (customerFind) {
        res.status(400).json({
          message: messages.error.customersAlreadyExist,
        });
      }

      const newCustomer = await Customer.create({
        name: name.toLowerCase(),
        lastname: lastname.toLowerCase(),
        identifications,
        address,
        phone,
        email,
        myVehicles_list,
        myProductOrder_list,
        myShopping_list,
        observations,
      });
      return res
        .status(200)
        .json({ newCustomer, message: messages.success.addedCustomer });
    } catch (err) {
      return res
        .status(500)
        .json({ message: messages.error.default, err: err.message });
    }
  }

  //Editar
  if (method === "PUT") {
    try {
      await moogoseConnect();
      const {
        name,
        lastname,
        identifications,
        address,
        phone,
        email,
        myVehicles_list,
        myProductOrder_list,
        myShopping_list,
        observations,
        _id,
      } = req.body;

      if (!_id || _id.trim() === "") {
        return res.status(400).json({ message: messages.error.idNotValid });
      }

      const updateData = await Customer.updateOne(
        { _id },
        {
          name,
          lastname,
          identifications,
          address,
          phone,
          email,
          myVehicles_list,
          myProductOrder_list,
          myShopping_list,
          observations,
        }
      );
      return res.status(200).json({
        updateData,
        message: messages.success.clientEditedSuccessfully,
      });
    } catch (err) {
      return res.status(500).json({
        message: messages.error.errorUpdatedCustomer,
        err: err.message,
      });
    }
  }

  //Eliminar
  if (method === "DELETE") {
    try {
      await moogoseConnect();
      const { _id } = req.query;
      await Customer.deleteOne({ _id });
      return res.status(200).json("ok");
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
}
