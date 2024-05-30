import { moogoseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import messages from "@/utils/messages";
// import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await moogoseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      try {
        await moogoseConnect();
        const products = await Product.find({}, null, { sort: { _id: -1 } });
        return res.status(200).json(products);
      } catch (err) {
        return res.status(500).json({ err: err.message });
      }
    }
  }

  //Registrar
  if (method === "POST") {
    try {
      const {
        title,
        code,
        codeEnterprise,
        codeWeb,
        price,
        tax,
        profitability,
        netPrice,
        salePrice,
        profit,
        offerPrice,
        brand,
        category,
        color,
        size,
        lastquantity,
        quantity, //este es el stock
        location,
        compatibility,
        description,
        descriptionAdditional,
        images,
      } = req.body;

      if (!title || !code || !price || !profitability || !brand || !description)
        return res.status(400).json({ message: messages.error.needProps });

      const newProduct = await Product.create({
        title: title.toLowerCase(),
        code,
        codeEnterprise,
        codeWeb,
        price,
        tax,
        profitability,
        netPrice,
        salePrice,
        profit,
        offerPrice,
        brand,
        category,
        color,
        size,
        quantity, //este es el stock
        lastquantity,
        lastquantityUpdated: Date.now(),
        location,
        compatibility,
        description,
        descriptionAdditional,
        images,
      });

      return res
        .status(200)
        .json({ newProduct, message: messages.success.addedProduct });
    } catch (err) {
      return res
        .status(500)
        .json({ message: messages.error.default, err: err.message });
    }
  }

  //Editar
  if (method === "PUT") {
    try {
      const {
        title,
        code,
        codeEnterprise,
        codeWeb,
        price,
        tax,
        profitability,
        netPrice,
        salePrice,
        profit,
        offerPrice,
        brand,
        category,
        color,
        size,
        quantity,
        quantityUpdated,
        location,
        compatibility,
        description,
        descriptionAdditional,
        images,

        _id,
      } = req.body;

      if (!_id || _id.trim() === "") {
        return res.status(400).json({ message: messages.error.idNotValid });
      }

      const updateData = {
        title,
        code,
        codeEnterprise,
        codeWeb,
        price,
        tax,
        profitability,
        netPrice,
        salePrice,
        profit,
        offerPrice,
        brand,
        category,
        color,
        size,
        quantity,
        quantityUpdated,
        location,
        compatibility,
        description,
        descriptionAdditional,
        images,
      };

      // Encuentra y actualiza el producto
      await Product.updateOne({ _id }, updateData);

      return res.status(200).json(true);
    } catch (err) {
      return res.status(500).json({
        message: messages.error.errorUpdatedProduct,
        err: err.message,
      });
    }
  }

  //Eliminar
  if (method === "DELETE") {
    const { _id } = req.query;
    await Product.deleteOne({ _id });
    return res.status(200).json(true);
  }
}
