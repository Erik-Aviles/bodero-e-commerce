import { moogoseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import messages from "@/utils/messages";
// import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      await moogoseConnect();
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }

  //Enviar-Guardar
  if (method === "POST") {
    await moogoseConnect();
    const { name, parentCategory } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
    });
    res.json({ categoryDoc, message: messages.success.addedCategory });
  }

  //Editar
  if (method === "PUT") {
    await moogoseConnect();
    const { name, parentCategory, _id } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory || undefined,
      }
    );
    res.json(categoryDoc);
  }

  //Eliminar
  if (method === "DELETE") {
    await moogoseConnect();
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json("ok");
  }
}
