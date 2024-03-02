import { moogoseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import messages from "@/utils/messages";
// import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await moogoseConnect();
  // await isAdminRequest(req, res);

  class APIfeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
    filtering() {
      const queryObj = { ...this.queryString };

      const excludeFields = ["page", "sort", "limit"];
      excludeFields.forEach((el) => delete queryObj[el]);

      if (queryObj.category !== "all")
        this.query.find({ category: queryObj.category });

      if (queryObj.title !== "all" && typeof queryObj.title === "string") {
        this.query.find({ title: { $regex: queryObj.title } });
      }
      if (queryObj.code !== "all" && typeof queryObj.code === "string") {
        this.query.find({ code: { $regex: queryObj.code } });
      }
      this.query.find();
      return this;
    }

    sorting() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(",").join("");
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort("-createdAt");
      }

      return this;
    }
  }

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      try {
        const features = new APIfeatures(Product.find(), req.query)
          .filtering()
          .sorting();

        const products = await features.query;

        res.json({
          status: "success",
          result: products.length,
          products,
        });
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
        quantity,
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
        quantity,
        location,
        compatibility,
        description,
        descriptionAdditional,
        images,
      });

      res.json({ newProduct, message: messages.success.addedProduct });
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
        location,
        compatibility,
        description,
        descriptionAdditional,
        images,
        stock,
        _id,
      } = req.body;

      if (!_id || _id.trim() === "") {
        return res.status(400).json({ message: messages.error.idNotValid });
      }

      if (!title || !code || !price || !profitability || !brand || !description)
        return res.status(400).json({ message: messages.error.needProps });

      //Encuentra y actualiza el producto
      await Product.updateOne(
        { _id },
        {
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
          quantity,
          location,
          compatibility,
          description,
          descriptionAdditional,
          images,
          stock,
        }
      );

      res.json(true);
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
    res.json(true);
  }
}
