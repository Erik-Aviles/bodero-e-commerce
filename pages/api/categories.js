import { moogoseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  await moogoseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Category.findOne({ _id: req.query.id }));
    } else {
      res.json(await Category.find().populate("parent"));
    }
  }

  if (method === "POST") {
    const { name, parentCategory, images, description } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory,
      images,
      description,
    });
    res.json(categoryDoc);
  }

  //Editar
  if (method === "PUT") {
    const { name, parentCategory, images, description, _id } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name,
        parent: parentCategory,
        images,
        description,
      }
    );
    res.json(categoryDoc);
  }

  //Eliminar
  /*   if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  } */
}
