import { moogoseConnect } from "@/lib/mongoose";
import { Company } from "@/models/Company";
import messages from "@/utils/messages";
// import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await moogoseConnect();

  // Obtener la imagen de fondo en las marcas
  if (method === "GET") {
    try {
      const { companyId } = req.query;

      // Verifica que el ID de la compañía esté presente
      if (!companyId) {
        return res
          .status(400)
          .json({ message: "Id de la compañia es requerido" });
      }

      const company = await Company.findById(companyId).select(
        "backgroundImageBrands"
      );

      if (!company) {
        return res.status(404).json({ message: "Compañia no encontrada" });
      }
      return res.status(200).json({ company });
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }

  // Registrar nueva imagen
  if (method === "POST") {
    const { companyId, description, image, publicId } = req.body;

    try {
      const company = await Company.findById(companyId);

      // Verifica que el ID de la compañía esté presente
      if (!company) {
        return res.status(400).json({ message: "Compañia no encontrada" });
      }

      if (!image || !description) {
        return res.status(400).json({
          message:
            messages?.error?.needProps ||
            "La imagen y la descripción son requeridas.",
        });
      }

      const newBackgroundImage = {
        description,
        image,
        publicId,
      };

      const updatedCompany = await Company.findByIdAndUpdate(
        companyId,
        { $set: { backgroundImageBrands: newBackgroundImage } },
        { new: true }
      );

      return res.status(200).json({
        updatedCompany,
        message:
          messages?.success?.addedImage ||
          "Imagen de fondo agregada con éxito.",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }

  // Editar brands
  if (method === "PUT") {
    const { companyId, description, image, publicId } = req.body;

    try {
      const company = await Company.findById(companyId);

      if (!company) {
        return res.status(404).json({ message: "Compañía no encontrada." });
      }

      if (!image || !description) {
        return res
          .status(400)
          .json({ message: "Todos los campos son requeridos." });
      }

      const updatedCompany = await Company.findByIdAndUpdate(
        companyId,
        { backgroundImageBrands: { description, image, publicId } },
        { new: true }
      );

      return res.status(200).json({
        updatedCompany,
        message:
          messages?.success?.updateSuccessfully || "Actualización exitosa.",
      });
    } catch (error) {
      return res.status(500).json({
        message:
          messages?.error?.errorUpdatedImage ||
          "Error al actualizar la imagen.",
        error: error.message,
      });
    }
  }

  // Eliminar banner
  if (method === "DELETE") {
    const { companyId } = req.body;
    try {
      const company = await Company.findById(companyId);

      if (!company) {
        return res.status(404).json({ message: "Compañía no encontrada." });
      }

      // Elimina las propiedades `description` e `image` del campo `backgroundImageBrands`
      const updatedCompany = await Company.findByIdAndUpdate(
        companyId,
        {
          $unset: {
            "backgroundImageBrands.description": "",
            "backgroundImageBrands.image": "",
          },
        },
        { new: true }
      );

      return res.status(200).json({
        updatedCompany,
        message: "La imagen fue eliminada exitosamente.",
      });
    } catch (error) {
      return res.status(500).json({
        message: messages?.error?.default || "Error al procesar la solicitud.",
        error: error.message,
      });
    }
  }
}
