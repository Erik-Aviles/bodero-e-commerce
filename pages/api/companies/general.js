import { moogoseConnect } from "@/lib/mongoose";
import { Company } from "@/models/Company";
import messages from "@/utils/messages";
// import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await moogoseConnect();

  //Obtener la informacion dela empresa
  if (method === "GET") {
    try {
      if (req.query?.id) {
        const general = await Company.findOne({ _id: req.query.id }, "-banners");
        return res.json(general);
      } else {
        const general = await Company.find({}, "-banners", {
          sort: { _id: -1 },
        });
        return res.status(200).json(general);
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
        name,
        subtitle,
        motto,
        address,
        mainPhone,
        secondaryPhone,
        mainEmail,
        secondaryEmail,
        mainlogo,
        secondarylogo,
        website,
        socialMedia,
      } = req.body;

      const newProduct = await Company.create({
        name,
        subtitle,
        motto,
        address,
        mainPhone,
        secondaryPhone,
        mainEmail,
        secondaryEmail,
        mainlogo,
        secondarylogo,
        website,
        socialMedia,
      });
      return res
        .status(200)
        .json({ newProduct, message: messages.success.addedInfo });
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
        name,
        subtitle,
        motto,
        address,
        mainPhone,
        secondaryPhone,
        mainEmail,
        secondaryEmail,
        mainlogo,
        secondarylogo,
        website,
        socialMedia,
        _id,
      } = req.body;

      const updateData = {
        name,
        subtitle,
        motto,
        address,
        mainPhone,
        secondaryPhone,
        mainEmail,
        secondaryEmail,
        mainlogo,
        secondarylogo,
        website,
        socialMedia,
      };

      // Encuentra y actualiza el producto
      await Company.updateOne({ _id }, updateData);

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
      await Company.deleteOne({ _id });
      return res.status(200).json(true);
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }
}
