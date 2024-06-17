import multiparty from "multiparty";
import { v2 as cloudinary } from "cloudinary";

(async function () {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
})();

export default async function handler(req, res) {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  const links = [];

  for (const file of files.file) {
    const without = files.originalFilename;
    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(file.path, {
        public_id: without,
      })
      .catch((error) => {
        console.log(error);
      });

    const link = uploadResult.secure_url;
    links.push(link);
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
