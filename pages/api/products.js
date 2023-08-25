import { moogoseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;
  await moogoseConnect();

  //Obtener
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  //Registrar
  if (method === "POST") {
    const {
      name,
      code,
      price,
      category,
      quantity,
      images,
      description,
      properties,
    } = req.body;
    const productDoc = await Product.create({
      name,
      code,
      price,
      category,
      quantity,
      images,
      description,
      properties,
    });
    res.json(productDoc);
  }

  //Editar
  if (method === "PUT") {
    const {
      name,
      code,
      price,
      category,
      quantity,
      images,
      description,
      properties,
      _id,
    } = req.body;
    await Product.updateOne(
      { _id },
      {
        name,
        code,
        price,
        category,
        quantity,
        images,
        description,
        properties,
      }
    );
    res.json(true);
  }

  //Eliminar
  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
