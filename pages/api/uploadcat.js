import multiparty from "multiparty";
import fs from "fs";
import path from "path";
import mime from "mime-types";

export default async function handle(req, res) {
  if (req.method === "POST") {
    const form = new multiparty.Form();

    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ files });
      });
    });

    const imagesPath = `${process.env.NEXT_PUBLIC_URL}/_next/`;
    const links = [];

    for (const file of files.file) {
      const ext = mime.extension(file.headers["content-type"]); // Obtener la extensión del archivo
      const newFileName = `${Date.now()}.${ext}`;
      const filePath = path.join(imagesPath, newFileName); // Ruta completa de destino

      console.log(filePath);
      try {
        // Mover el archivo al directorio de imágenes
        fs.renameSync(file.path, filePath);

        // Construir el enlace público
        const link = `images/categories/${newFileName}`; // Ruta pública del archivo
        links.push(link);
      } catch (error) {
        console.error("Error al mover el archivo:", error);
      }
    }
    return res.json({ links });
  }

  if (req.method === "DELETE") {
    const imageUrl = decodeURIComponent(req.query.url);

    try {
      // Obtener la ruta local de la imagen a eliminar
      const imagePath = path.join(process.cwd(), "public", imageUrl);

      // Verificar si el archivo existe antes de intentar eliminarlo
      if (fs.existsSync(imagePath)) {
        // Eliminar el archivo del sistema de archivos
        fs.unlinkSync(imagePath);
        return res.status(200).json({ message: "Imagen eliminada con exito!" });
      } else {
        return res.status(404).json({ message: "Imagen no encontrada" });
      }
    } catch (error) {
      console.error("Error eliminando la imagen:", error);
      return res.status(500).json({ message: "Fallo al encontrar imagen" });
    }
  } else {
    return res.status(405).json({ message: "Metodo no permitido" });
  }
}

export const config = {
  api: { bodyParser: false },
};
