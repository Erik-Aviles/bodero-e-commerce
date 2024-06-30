import { moogoseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import messages from "@/utils/messages";
// import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;

  //Obtener categorias
  if (method === "GET") {
    if (req.query?.id) {
      await moogoseConnect();
      return res.json(await Category.findOne({ _id: req.query.id }));
    } else {
      try {
        await moogoseConnect();
        const categories = await Category.find({}, null, { sort: { _id: -1 } });
        return res.status(200).json(categories);
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

      const newCategory = await Category.create({
        name: name.toLowerCase(),
        description,
        image,
      });

      return res
        .status(200)
        .json({ newCategory, message: messages.success.addedCategory });
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
      const { name, description, image, _id } = req.body;

      if (!_id || _id.trim() === "") {
        return res.status(400).json({ message: messages.error.idNotValid });
      }

      const updateData = {
        name,
        description,
        image,
      };

      // Encuentra y actualiza la categoria
      await Category.updateOne({ _id }, updateData);
      return res.status(200).json({
        message: messages.success.updateSuccessfully,
      });
    } catch (err) {
      return res.status(500).json({
        message: messages.error.errorUpdatedCategory,
        err: err.message,
      });
    }
  }

  //Eliminar
  if (method === "DELETE") {
    try {
      await moogoseConnect();
      const { _id } = req.query;
      await Category.deleteOne({ _id });
      return res.status(200).json("ok");
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }
}
