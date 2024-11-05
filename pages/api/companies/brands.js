import { moogoseConnect } from "@/lib/mongoose";
import { Company } from "@/models/Company";
import messages from "@/utils/messages";
// import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await moogoseConnect();

  // Obtener brands de la empresa
  if (method === "GET") {
    try {
      const { companyId } = req.query;

      // Verifica que el ID de la compañía esté presente
      if (!companyId) {
        return res
          .status(400)
          .json({ message: "Id de la compañia es requerido" });
      }
      const company = await Company.findById(companyId).select("brands");

      if (!company) {
        return res.status(404).json({ message: "Compañia no encontrada" });
      }

      return res.status(200).json({ brands: company.brands });
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }

  // Registrar nuevo banner
  if (method === "POST") {
    const { companyId, stateBrand } = req.body;

    try {
      const company = await Company.findById(companyId);

      // Verifica que el ID de la compañía esté presente
      if (!company) {
        return res.status(400).json({ message: "Compañia no encontrada" });
      }

      const newBrand = {
        ...stateBrand,
        brandId:
        stateBrand.brandId || new mongoose.Types.ObjectId().toString(),
      };

      company.brands.push(newBrand);
      await company.save();

      return res.status(200).json({
        brands: company.brands,
        message: messages.success.addedImage,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }

  // Editar brands
  if (method === "PUT") {
    const { companyId, stateBrand, brandId } = req.body;

    try {
      const company = await Company.findById(companyId);

      if (!company) {
        return res.status(404).json({ message: "Compañía no encontrada." });
      }

      const brandIndex = company.brands.findIndex(
        (brand) => brand.brandId.toString() === brandId
      );

      if (brandIndex === -1) {
        return res.status(404).json({ message: "Banner no encontrado." });
      }

      if (!stateBrand.image) {
        return res.status(400).json({ message: "La imagen de la marca es requerida." });
      }

      company.brands[brandIndex] = {
        ...company.brands[brandIndex],
        name: stateBrand.name || company.brands[brandIndex].name,
        image: stateBrand.image,
        public_id: stateBrand.public_id || company.brands[brandIndex].public_id,
      };

      await company.save();

      return res.status(200).json({
        brands: company.brands,
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
    const { companyId, brandId } = req.body;
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        return res.status(404).json({ message: "Compañía no encontrada." });
      }

      // Encontrar el índice de la marca en el array de brands
      const brandIndex = company.brands.findIndex(
        (brand) => brand.brandId.toString() === brandId
      );

      if (brandIndex === -1) {
        return res.status(404).json({ message: "Marca no encontrada." });
      }

      company.brands.splice(brandIndex, 1);

      // Guardar los cambios
      await company.save();

      return res.status(200).json({
        message: "Marca eliminada exitosamente.",
        brands: company.brands,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: messages.error.default, error: error.message });
    }
  }
}
