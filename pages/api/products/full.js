import { moogoseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import messages from "@/utils/messages";
// import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await moogoseConnect();

  //Obtener productos de sin imagen
  /* if (method === "GET") {
    try {
      if (req.query?.id) {
        const product = await Product.findOne({ _id: req.query.id }).select(
          "-images"
        );
        return res.json(product);
      } else {
        const products = await Product.find({}, "-images", {
          sort: { _id: -1 },
        });

        return res.status(200).json(products);
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  } */

  //Obtener productos para produccion
  if (method === "GET") {
    try {
      if (req.query?.id) {
        const product = await Product.findOne({ _id: req.query.id });
        return res.json(product);
      } else {
        const products = await Product.find({}, null, {
          sort: { _id: -1 },
        });
        return res.status(200).json(products);
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
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
        offerPrice,
        tax,
        minPrice,
        profitability,
        netPrice,
        salePrice,
        profit,
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

      //validar que esten todos los campos
      if (!title || !code || !price || !profitability || !brand || !description)
        return res.status(400).json({ message: messages.error.needProps });

      //validar que no exista valores en negativo
      if ((quantity || price || salePrice || minPrice || offerPrice) < 0) {
        return res
          .status(400)
          .json({ message: messages.error.unsupportedValue });
      }

      const newProduct = await Product.create({
        title: title.toLowerCase(),
        code,
        codeEnterprise,
        codeWeb,
        price,
        tax,
        minPrice,
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
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
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
        minPrice,
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

      //validar que no exista valores en negativo
      if ((quantity || price || salePrice || minPrice || offerPrice) < 0) {
        return res
          .status(400)
          .json({ message: messages.error.unsupportedValue });
      }

      const updateData = {
        title,
        code,
        codeEnterprise,
        codeWeb,
        price,
        tax,
        minPrice,
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

      return res.status(200).json({
        message: messages.success.updateSuccessfully,
      });
    } catch (error) {
      return res.status(500).json({
        message: messages.error.errorUpdatedProduct,
        error: error.message,
      });
    }
  }

  //Eliminar
  if (method === "DELETE") {
    try {
      const { _id } = req.query;
      await Product.deleteOne({ _id });
      return res.status(200).json(true);
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }
}
