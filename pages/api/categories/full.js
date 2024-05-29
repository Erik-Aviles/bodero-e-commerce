import { moogoseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import messages from "@/utils/messages";
// import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      await moogoseConnect();
      const categories = await Category.find({}, null, { sort: { _id: -1 } });
      return res.status(200).json(categories);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }

  //Enviar-Guardar
  if (method === "POST") {
    try {
      await moogoseConnect();
      const { name, description, image } = req.body;
      //validar que esten todos los campos

      if (!name) {
        return res.status(400).json({
          message: messages.error.needProps,
        });
      }
      const categoryFind = await Category.findOne({ name });
      // validar si existe el email en la base de datos
      if (categoryFind) {
        return res.status(400).json({
          message: messages.error.categoryAlreadyExist,
        });
      }
      const categoryDoc = await Category.create({
        name,
        description,
        image,
      });
      res.json({ categoryDoc, message: messages.success.addedCategory });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }

  //Editar
  if (method === "PUT") {
    try {
      await moogoseConnect();
      const { name, description, image, _id } = req.body;
      const categoryDoc = await Category.updateOne(
        { _id },
        {
          name,
          description,
          image,
        }
      );
      res.json({ categoryDoc, message: messages.success.exitEdith });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }

  //Eliminar
  if (method === "DELETE") {
    try {
      await moogoseConnect();
      const { _id } = req.query;
      await Category.deleteOne({ _id });
      res.json("ok");
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
}
