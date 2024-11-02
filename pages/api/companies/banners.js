import { moogoseConnect } from "@/lib/mongoose";
import { Company } from "@/models/Company";
import messages from "@/utils/messages";
// import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await moogoseConnect();

  // Obtener banners de la empresa
  if (method === "GET") {
    try {
      const { companyId } = req.query;

      // Verifica que el ID de la compañía esté presente
      if (!companyId) {
        return res
          .status(400)
          .json({ message: "Id de la compañia es requerido" });
      }
      const company = await Company.findById(companyId).select("banners");

      if (!company) {
        return res.status(404).json({ message: "Compañia no encontrada" });
      }

      return res.status(200).json({ banners: company.banners });
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }

  // Registrar nuevo banner
  if (method === "POST") {
    const { companyId, stateBanner } = req.body;

    try {
      const company = await Company.findById(companyId);

      // Verifica que el ID de la compañía esté presente
      if (!company) {
        return res.status(400).json({ message: "Compañia no encontrada" });
      }

      const newBanner = {
        ...stateBanner,
        bannerId:
          stateBanner.bannerId || new mongoose.Types.ObjectId().toString(),
      };

      company.banners.push(newBanner);
      await company.save();

      return res.status(200).json({
        banners: company.banners,
        message: messages.success.addedImage,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }

  // Editar banners
  if (method === "PUT") {
    const { companyId, stateBanner, bannerId } = req.body;

    try {
      const company = await Company.findById(companyId);

      if (!company) {
        return res.status(404).json({ message: "Compañía no encontrada." });
      }

      const bannerIndex = company.banners.findIndex(
        (banner) => banner.bannerId.toString() === bannerId
      );

      if (bannerIndex === -1) {
        return res.status(404).json({ message: "Banner no encontrado." });
      }

      if (!stateBanner.image) {
        return res.status(400).json({ message: "La imagen del banner es requerida." });
      }

      company.banners[bannerIndex] = {
        ...company.banners[bannerIndex],
        description: stateBanner.description || company.banners[bannerIndex].description,
        image: stateBanner.image,
        public_id: stateBanner.public_id || company.banners[bannerIndex].public_id,
      };

      await company.save();

      return res.status(200).json({
        banners: company.banners,
        message: messages.success.updateSuccessfully,
      });
    } catch (error) {
      return res.status(500).json({
        message: messages.error.errorUpdatedProduct,
        error: error.message,
      });
    }
  }

  // Eliminar banner
  if (method === "DELETE") {
    const { companyId, bannerId } = req.body;
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        return res.status(404).json({ message: "Compañía no encontrada." });
      }

      // Encontrar el índice del banner en el array de banners
      const bannerIndex = company.banners.findIndex(
        (banner) => banner.bannerId.toString() === bannerId
      );

      if (bannerIndex === -1) {
        return res.status(404).json({ message: "Banner no encontrado." });
      }

      company.banners.splice(bannerIndex, 1);

      // Guardar los cambios
      await company.save();

      return res.status(200).json({
        message: "Banner eliminado exitosamente.",
        banners: company.banners,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }
}
