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
      } catch (error) {
        return res
          .status(500)
          .json({ message: messages.error.default, error: error.message });
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

      //validar que este el campo requerido
      if (!name ) {
        return res.status(400).json({ message: "El campo 'Nombre', es requerido.", });
      }

      // Validar que `identifications` tenga exactamente 10 dígitos, si está presente
      if (identifications && identifications.trim() !== "") {
        if (identifications.length !== 10) {
          return res.status(400).json({
            message: "El campo 'Cédula', debe tener exactamente 10 dígitos.",
          });
        }

        // Verificar duplicado solo si `identifications` tiene 10 dígitos
        const existingCustomer = await Customer.findOne({ identifications });
        if (existingCustomer) {
          return res.status(400).json({
            message: messages.error.customersAlreadyExist,
          });
        }
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

      const updateData = {
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
      };

      // Encuentra y actualiza al cliente
      await Customer.updateOne({ _id }, updateData);
      return res.status(200).json({
        message: messages.success.updateSuccessfully,
      });
    } catch (error) {
      return res.status(500).json({
        message: messages.error.errorUpdatedCustomer,
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
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }
}
