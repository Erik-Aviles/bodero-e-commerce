import { v2 as cloudinary } from "cloudinary";

export const config = {
  api: { bodyParser: true },
};

(async function () {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
})();

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ message: "Public ID is required" });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === "not found") {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }

    return res.status(200).json({ message: "Imagen eliminada exitosamente" });
  } catch (error) {
    console.error("Error eliminando imagen:", error);
    return res.status(500).json({ message: "Fallo al eliminar imagen", error });
  }
}
